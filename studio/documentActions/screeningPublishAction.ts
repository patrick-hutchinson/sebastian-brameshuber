import type {DocumentActionComponent, DocumentActionProps, SanityDocumentLike} from 'sanity'
import {getFirstShowtimeStartIso} from '../utils/screeningDate'

async function syncFirstShowtimeStart(props: DocumentActionProps) {
  const document = props.draft ?? props.published
  if (!document?._id) return

  const derivedIso = getFirstShowtimeStartIso(document as SanityDocumentLike)
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
        await originalResult.onHandle?.()
      },
    }
  }

  return wrappedAction
}
