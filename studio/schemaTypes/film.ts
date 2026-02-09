import {defineField, defineType} from 'sanity'

export const film = defineType({
  name: 'film',
  title: 'Film',

  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'fullTitle',
      title: 'Full Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'portableText',
    }),
    defineField({
      name: 'coverMedia',
      title: 'Cover Media',
      type: 'mediaAsset', // ⚠️ needs to be defined!
    }),
    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'role', title: 'Role', type: 'string'}),
            defineField({
              name: 'people',
              title: 'People',
              type: 'array',
              of: [{type: 'string'}],
              options: {
                layout: 'tags',
              },
              description:
                '⚠️ Namen hinzufügen und dann ENTER dücken, sodass die Eingabe als Tag auftaucht.',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'comment'}]}],
    }),
    defineField({
      name: 'supportingMedia',
      title: 'Supporting Media',
      type: 'gallery',
      description:
        'Diese Bilder/Videos kleben in der Desktop Version neben den Comments. Hier wären zum Beispiel Trailer vorgesehen.',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallerie',
      type: 'gallery',
      description: 'Diese Bilder werden in voller Bildschirmhöhe unterhalb der Comments angezeigt,',
    }),
    defineField({
      name: 'interview',
      title: 'Interview',
      type: 'reference',
      to: {type: 'interview'},
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'review'}]}],
    }),
    defineField({
      name: 'slug',
      title: 'url',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title,
      }
    },
  },
})
