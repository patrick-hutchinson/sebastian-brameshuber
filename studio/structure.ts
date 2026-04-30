import type {StructureResolver} from 'sanity/structure'
import {MasterDetailIcon} from '@sanity/icons'
import {DashboardIcon} from '@sanity/icons'
import {CalendarIcon} from '@sanity/icons'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

// Define singleton document IDs here
const singletons = ['site', 'about']

// Add other types you want to hide from Desk here
const hiddenTypes = [
  ...singletons,
  'mux.videoAsset',
  'award',
  'comment',
  // 'interview',
  'newsCategory',
  'review',
  'page',
  'film',
  'screening',
]

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      // Top-level singleton
      S.listItem()
        .title('Site')
        .icon(DashboardIcon)
        .child(S.document().schemaType('site').documentId('site')),

      // Pages folder
      S.listItem()
        .title('Pages')
        .icon(MasterDetailIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('About Page')
                .child(S.document().schemaType('about').documentId('about')),
            ]),
        ),
      orderableDocumentListDeskItem({
        type: 'film',
        title: 'Films',
        S,
        context,
      }),
      S.listItem()
        .title('Screenings')
        .icon(CalendarIcon)
        .child(
          S.documentTypeList('screening')
            .title('Screenings')
            .defaultOrdering([{field: 'firstShowtimeStart', direction: 'asc'}]),
        ),

      // Everything else (exclude hidden types and the ones we added above)
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !hiddenTypes.includes(listItem.getId()!) &&
          !['eventType', 'colorPair', 'venue', 'speaker', 'event'].includes(listItem.getId()!),
      ),
    ])
