import {defineField, defineType} from 'sanity'

export const award = defineType({
  name: 'award',
  title: 'Award',
  type: 'document',
  fields: [
    defineField({name: 'award', title: 'Auszeichnung', type: 'string'}),
    defineField({name: 'year', title: 'Jahr', type: 'string'}),
    defineField({name: 'film', title: 'Film', type: 'reference', to: {type: 'film'}}),
    defineField({name: 'link', title: 'Link', type: 'link'}),
  ],
})
