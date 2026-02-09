import {defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  options: {
    columns: 2, // display children in two columns
  },
  fields: [
    {
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'Internal', value: 'internal', icon: LinkIcon},
          {title: 'External', value: 'external', icon: LinkIcon},
        ],
      },
    },
    {
      name: 'internal',
      type: 'reference',
      to: [{type: 'page'}],
      hidden: ({parent}) => parent?.type !== 'internal',
    },
    {
      name: 'url',
      type: 'url',
      hidden: ({parent}) => parent?.type !== 'external',
    },
  ],
})
