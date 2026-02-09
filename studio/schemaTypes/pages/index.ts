import {defineType, defineField} from 'sanity'

export const index = defineType({
  name: 'index',
  title: 'Index',
  type: 'document',
  fields: [
    defineField({name: 'page', title: 'Page', type: 'reference', to: [{type: 'page'}]}),
    defineField({name: 'films', title: 'Filme', type: 'reference', to: [{type: 'film'}]}),
  ],
  preview: {
    prepare: () => ({title: 'Films'}),
  },
})
