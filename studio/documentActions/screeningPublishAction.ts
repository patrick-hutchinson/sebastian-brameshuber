import type {DocumentActionComponent, DocumentActionProps, SanityDocumentLike} from 'sanity'

function getFirstShowtimeIso(doc: SanityDocumentLike | null | undefined): string | null {
  const showtimes = (doc as any)?.showtimes
  if (!Array.isArray(showtimes) || showtimes.length === 0) return null

  const first = showtimes[0]
  const startDate = first?.screeningDate?.startDate as string | undefined
  const startTime = first?.screeningDate?.startTime as string | undefined

  if (!startDate) return null

  const normalizedTime =
    typeof startTime === 'string' && /^([01]\d|2[0-3]):([0-5]\d)$/.test(startTime)
      ? startTime
      : '00:00'

  const parsed = new Date(`${startDate}T${normalizedTime}:00`)
  if (Number.isNaN(parsed.getTime())) return null

  return parsed.toISOString()
}

async function syncFirstShowtimeStart(props: DocumentActionProps) {
  const document = props.draft ?? props.published
  if (!document?._id) return

  const derivedIso = getFirstShowtimeIso(document)
  const client = props.getClient({apiVersion: '2025-06-27'})

  const patch = client.patch(document._id)
  if (derivedIso) {
    patch.set({firstShowtimeStart: derivedIso})
  } else {
    patch.unset(['firstShowtimeStart'])
  }

  await patch.commit()
}

export function createScreeningPublishAction(
  originalAction: DocumentActionComponent,
): DocumentActionComponent {
  const wrappedAction: DocumentActionComponent = (props) => {
    const originalResult = originalAction(props)
    if (!originalResult) return null

    return {
      ...originalResult,
      onHandle: async () => {
        await syncFirstShowtimeStart(props)
        originalResult.onHandle?.()
      },
    }
  }

  return wrappedAction
}
