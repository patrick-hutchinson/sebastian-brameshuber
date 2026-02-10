import {defineType, defineField, defineArrayMember} from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About Text',
  type: 'document',
  fields: [
    defineField({name: 'page', title: 'Page', type: 'reference', to: [{type: 'page'}]}),
    defineField({name: 'aboutText', title: 'About', type: 'portableText'}),
    // defineField({
    //   name: 'featuredScreenings',
    //   title: 'Featured Screenings',
    //   type: 'array',
    //   of: [{type: 'reference', to: [{type: 'screening'}]}],
    //   description:
    //     'Hier kannst du Screenings auswählen, die du auf der About Seite hervorheben möchtest.',
    //   validation: (Rule) => Rule.unique().error('Each screening can only be selected once.'),
    // }),

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
