import {defineField, defineType} from 'sanity'

export const publication = defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({
      name: 'releaseDate',
      title: 'Erscheinungsdatum',
      type: 'date',
      options: {dateFormat: 'DD.MM.YYYY'},
    }),
    defineField({name: 'text', title: 'Text', type: 'portableText'}),
    defineField({name: 'media', title: 'Image/Video', type: 'mediaAsset'}),
    defineField({name: 'link', title: 'Link', type: 'link'}),
    defineField({
      name: 'excerpts',
      title: 'Auszug/Interview/Freitext',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string'},
            {name: 'text', type: 'interviewText'},
          ],
        },
      ],
    }),
  ],
})
