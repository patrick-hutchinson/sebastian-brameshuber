import {defineField, defineType} from 'sanity'

export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({name: 'author', title: 'Author', type: 'string'}),
    defineField({name: 'publication', title: 'Publication', type: 'string'}),
    defineField({name: 'text', title: 'Text', type: 'portableText'}),
  ],
})
