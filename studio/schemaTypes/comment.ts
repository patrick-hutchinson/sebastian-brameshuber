import {defineField, defineType} from 'sanity'

export const comment = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'portableText'}),
    defineField({name: 'text', title: 'Text', type: 'portableText'}),
    defineField({name: 'source', title: 'Source', type: 'portableText'}),
    defineField({name: 'author', title: 'Author', type: 'portableText'}),
    defineField({name: 'link', title: 'Link', type: 'link'}),
  ],
})
