import {defineField, defineType} from 'sanity'

export const newsCategory = defineType({
  name: 'newsCategory',
  title: 'Category',
  type: 'document',
  fields: [defineField({name: 'name', title: 'Name', type: 'string'})],
})
