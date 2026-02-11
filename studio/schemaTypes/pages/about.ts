import {defineType, defineField, defineArrayMember} from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About Text',
  type: 'document',
  fields: [
    defineField({name: 'aboutText', title: 'About', type: 'portableText'}),

    defineField({
      name: 'featuredScreenings',
      title: 'Featured Screenings',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'film',
              title: 'Film',
              type: 'reference',
              to: [{type: 'film'}],
            }),
            defineField({
              name: 'festivals',
              title: 'Festivals',
              type: 'portableText',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'awards',
      title: 'Awards',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'award'}]}],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Films'}),
  },
})
