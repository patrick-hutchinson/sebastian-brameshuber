import {defineField, defineType} from 'sanity'

export const news = defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    defineField({name: 'text', title: 'Text', type: 'portableText'}),
    defineField({name: 'date', title: 'Date', type: 'date', options: {dateFormat: 'DD.MM.YYYY'}}),
    defineField({name: 'author', title: 'Author', type: 'string'}),
    defineField({name: 'publication', title: 'Publication', type: 'string'}),
    defineField({
      name: 'newsCategory',
      title: 'Category',
      type: 'reference',
      to: {type: 'newsCategory'},
    }),
    defineField({
      name: 'film',
      title: 'Film',
      type: 'reference',
      to: [{type: 'film'}],
    }),
    defineField({name: 'link', title: 'Link', type: 'link'}),
    defineField({name: 'previewMedia', title: 'Preview Image/Video', type: 'mediaAsset'}),
  ],
})
