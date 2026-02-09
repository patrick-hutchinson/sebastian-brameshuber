import {defineField, defineType} from 'sanity'

export const screening = defineType({
  name: 'screening',
  title: 'Screening',
  type: 'document',
  fields: [
    defineField({
      name: 'film',
      title: 'Film',
      type: 'reference',
      to: [{type: 'film'}],
    }),
    defineField({
      name: 'festival',
      title: 'Festival',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        defineField({name: 'city', title: 'City', type: 'string'}),
        defineField({name: 'country', title: 'Country', type: 'string'}),
      ],
    }),
    defineField({
      name: 'annotation',
      title: 'Anmerkung',
      type: 'string',
      description: 'Wie z.B hosted by...',
    }),

    // Array of showtimes
    defineField({
      name: 'showtimes',
      title: 'Showtimes',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          fields: [
            defineField({
              name: 'cinema',
              title: 'Cinema',
              type: 'string',
            }),
            defineField({
              name: 'screeningDate',
              title: 'Screening date & time',
              type: 'object',
              options: {columns: 2},
              fields: [
                defineField({
                  name: 'startDate',
                  title: 'Start Date',
                  type: 'date',
                  options: {dateFormat: 'DD.MM.YYYY'},
                }),
                defineField({
                  name: 'startTime',
                  title: 'Start Time (optional)',
                  type: 'string',
                  placeholder: 'HH:mm',
                  validation: (Rule) =>
                    Rule.optional().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
                      name: 'time',
                      message: 'Use 24-hour format, e.g., 14:30',
                    }),
                }),
                defineField({
                  name: 'endDate',
                  title: 'End Date (optional)',
                  type: 'date',
                  options: {dateFormat: 'DD.MM.YYYY'},
                }),
                defineField({
                  name: 'endTime',
                  title: 'End Time (optional)',
                  type: 'string',
                  placeholder: 'HH:mm',
                  validation: (Rule) =>
                    Rule.optional().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
                      name: 'time',
                      message: 'Use 24-hour format, e.g., 14:30',
                    }),
                }),
              ],
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
            }),
          ],
        }),
      ],
    }),
  ],

  preview: {
    select: {
      filmTitle: 'film.title',
      showtimes: 'showtimes',
    },
    prepare({filmTitle, showtimes}) {
      const firstShowtime = showtimes?.[0]
      const location = firstShowtime?.location?.cinema
      const screeningDate = firstShowtime?.screeningDate?.startDate
        ? new Date(
            `${firstShowtime.screeningDate.startDate}T${firstShowtime.screeningDate.startTime || '00:00'}`,
          )
        : null

      return {
        title: filmTitle || 'Untitled film',
        subtitle: [
          screeningDate &&
            screeningDate.toLocaleString('de-DE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
          location,
        ]
          .filter(Boolean)
          .join(' · '),
      }
    },
  },
})
