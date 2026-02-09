import {defineField, defineType} from 'sanity'

export const location = defineType({
  name: 'location',
  title: 'Cinema',
  type: 'document',
  fields: [
    defineField({name: 'cinema', title: 'Cinema', type: 'string'}),
    defineField({name: 'country', title: 'Country', type: 'string'}),
    defineField({name: 'city', title: 'City', type: 'string'}),
  ],
  preview: {
    select: {
      title: 'cinema',
      city: 'city',
      country: 'country.title',
    },
    prepare({title, city, country}) {
      return {
        title: title || 'Unnamed cinema',
        subtitle: [city, country].filter(Boolean).join(', '),
      }
    },
  },
})
