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

          preview: {
            select: {
              title: 'film.title',
              festivals: 'festivals',
            },
            prepare({title, festivals}) {
              const firstFestival = festivals?.[0]?.children?.[0]?.text

              return {
                title: title || 'Untitled film',
                subtitle: firstFestival ? `Festival: ${firstFestival}` : 'No festivals listed',
              }
            },
          },
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
