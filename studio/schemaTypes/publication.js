import {defineField, defineType} from 'sanity'

export const publication = defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'text', title: 'Text', type: 'portableText'}),
    defineField({name: 'media', title: 'Image/Video', type: 'mediaAsset'}),
  ],
})
