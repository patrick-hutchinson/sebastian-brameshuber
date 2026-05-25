import type {DocumentActionComponent, DocumentActionProps, SanityDocumentLike} from 'sanity'
import {getFirstShowtimeStartIso} from '../utils/screeningDate'

const PRE_PUBLISH_SYNC_TIMEOUT = 1200
const POST_PUBLISH_SYNC_DELAY = 2000

function getPublishedId(documentId: string) {
  return documentId.replace(/^drafts\./, '')
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function withTimeout<T>(promise: Promise<T>, ms: number) {
  return Promise.race([promise, delay(ms)])
}

async function syncFirstShowtimeStart(props: DocumentActionProps, documentId: string, derivedIso: string | null) {
  const client = props.getClient({apiVersion: '2025-06-27'})

  const patch = client.patch(documentId)
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
        const document = props.draft ?? props.published
        const draftOrPublishedId = document?._id ?? null
        const publishedId = draftOrPublishedId ? getPublishedId(draftOrPublishedId) : props.id
        const derivedIso = getFirstShowtimeStartIso(document as SanityDocumentLike)

        if (draftOrPublishedId) {
          await withTimeout(
            syncFirstShowtimeStart(props, draftOrPublishedId, derivedIso).catch((error) => {
              console.error('Failed to sync screening sort date before publish', error)
            }),
            PRE_PUBLISH_SYNC_TIMEOUT,
          )
        }

        const publishResult = originalResult.onHandle?.()

        Promise.resolve(publishResult)
          .then(() => delay(POST_PUBLISH_SYNC_DELAY))
          .then(() => {
            if (!publishedId) return

            syncFirstShowtimeStart(props, publishedId, derivedIso).catch((error) => {
              console.error('Failed to sync screening sort date after publish', error)
            })
          })

        return publishResult
      },
    }
  }

  return wrappedAction
}
