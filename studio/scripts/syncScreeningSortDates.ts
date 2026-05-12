import {getCliClient} from 'sanity/cli'
import {getFirstShowtimeStartIso} from '../utils/screeningDate'

type ScreeningDocument = {
  _id: string
  _type: 'screening'
  firstShowtimeStart?: string
  showtimes?: {
    screeningDate?: {
      startDate?: string
      startTime?: string
    }
  }[]
}

const dryRun = process.argv.includes('--dry-run')
const client = getCliClient({apiVersion: '2025-06-27'})

async function main() {
  const screenings = await client.fetch<ScreeningDocument[]>(
    `*[_type == "screening" && !(_id in path("versions.**"))]{
      _id,
      _type,
      firstShowtimeStart,
      showtimes[]{screeningDate}
    }`,
  )

  const patches = screenings
    .map((screening) => {
      const firstShowtimeStart = getFirstShowtimeStartIso(screening)

      return {
        _id: screening._id,
        current: screening.firstShowtimeStart ?? null,
        next: firstShowtimeStart,
      }
    })
    .filter(({current, next}) => current !== next)

  if (patches.length === 0) {
    console.log('All screening sort dates are already in sync.')
    return
  }

  console.log(`${dryRun ? 'Would sync' : 'Syncing'} ${patches.length} screening sort dates.`)

  for (const patch of patches) {
    console.log(`${patch._id}: ${patch.current ?? 'null'} -> ${patch.next ?? 'null'}`)
  }

  if (dryRun) {
    return
  }

  let transaction = client.transaction()

  for (const patch of patches) {
    const documentPatch = client.patch(patch._id)

    if (patch.next) {
      documentPatch.set({firstShowtimeStart: patch.next})
    } else {
      documentPatch.unset(['firstShowtimeStart'])
    }

    transaction = transaction.patch(documentPatch)
  }

  await transaction.commit()
  console.log('Screening sort dates synced.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
