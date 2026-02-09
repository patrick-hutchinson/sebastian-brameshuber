import {defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  type: 'document',
  fields: [
    {name: 'title', type: 'string'},
    {name: 'slug', type: 'slug'},
  ],
})
