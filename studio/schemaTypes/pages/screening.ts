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
              description:
                'Hier kannst du einen Link für einen Showtime eintrag angeben. Wenn du einen Link bei dem Screening angegeben hast, wird dieser hier wird die Kachel ihn überschrieben.',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      description:
        "Dieser Link liegt über dem gesamten Screening Block. Wenn du einen separaten Link pro Untereintrag ('Showtime') brauchst, kannst du diesen direkt bei dem jeweiligen Showtime eintrag eingeben. Dann wird dieser Showtime Eintrag mit dem neuen Link überschrieben.",
    }),
  ],

  preview: {
    select: {
      filmTitle: 'film.title',
      showtimes: 'showtimes',
    },
    prepare({filmTitle, showtimes}) {
      const firstShowtime = showtimes?.[0]
      const location = firstShowtime?.cinema
      const startDate = firstShowtime?.screeningDate?.startDate
      const startTime = firstShowtime?.screeningDate?.startTime

      const screeningDate = startDate ? new Date(`${startDate}T${startTime || '00:00'}`) : null
      const formattedDate =
        screeningDate &&
        (startTime
          ? screeningDate.toLocaleString('de-DE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          : screeningDate.toLocaleDateString('de-DE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }))

      return {
        title: filmTitle || 'Untitled film',
        subtitle: [formattedDate, location].filter(Boolean).join(' · '),
      }
    },
  },
})
