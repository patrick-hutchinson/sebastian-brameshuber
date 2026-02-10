import {defineField, defineType} from 'sanity'

export const site = defineType({
  name: 'site',
  title: 'Site',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Website Name',
      description: 'As seen on Google Search Results and Tab Bar',
      type: 'string',
    }),
    defineField({
      name: 'owner',
      title: 'Website Owner',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Website Description',
      description: 'As seen on Google Search Results',
      type: 'array',
      of: [{type: 'block'}],
    }),

    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      options: {
        columns: 3,
      },
      fields: [
        {
          name: 'street',
          title: 'Street',
          type: 'string',
          options: {columns: 3}, // full width
        },
        {
          name: 'postcode',
          title: 'Post code',
          type: 'string',
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
    }),
    defineField({
      name: 'socials',
      title: 'Socials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'platform', title: 'Platform', type: 'string'},
            {name: 'link', title: 'url', type: 'string'},
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site'}),
  },
})
