import {defineType, defineField} from 'sanity'

export const imageAsset = defineType({
  name: 'imageAsset',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      name: 'file',
      title: 'File',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      title: 'Alt Text',
      name: 'altText',
      type: 'string',
      description: 'Wichtig für SEO and Barrierefreiheit',
    }),
    defineField({
      title: 'Copyright',
      description: 'Copyright text hier einfügen',
      name: 'copyright',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      file: 'file',
      subtitle: 'copyright',
    },
    prepare({file, subtitle}) {
      return {
        media: file,
        subtitle: subtitle,
      }
    },
  },
})
