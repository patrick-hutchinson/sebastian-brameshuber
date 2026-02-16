import {defineField, defineType} from 'sanity'

import {portableTextToPreview} from '../utils/portableTextToPreview'

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
  preview: {
    select: {
      text: 'text',
      author: 'author',
    },
    prepare({text, author}) {
      return {
        title: portableTextToPreview(text, 75) || 'Untitled comment',
        subtitle: author ? `by ${portableTextToPreview(author, 75)}` : '',
      }
    },
  },
})
