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
      validation: (Rule) => Rule.unique().error('You cannot select the same award multiple times.'),
    }),
    defineField({
      name: 'teaching',
      title: 'Teaching',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'portableText',
            }),
          ],
          preview: {
            select: {
              text: 'text',
            },
            prepare({text}) {
              const plainText =
                text
                  ?.filter((block) => block._type === 'block')
                  .map((block) =>
                    block.children
                      ?.filter((child) => child._type === 'span')
                      .map((child) => child.text)
                      .join(''),
                  )
                  .join(' ') || ''

              return {
                title: plainText.slice(0, 80) || 'Untitled teaching entry',
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Films'}),
  },
})
