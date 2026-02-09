import {defineType} from 'sanity'

export const interviewText = defineType({
  name: 'interviewText',
  title: 'Interview',
  type: 'array',
  of: [
    {
      type: 'object',
      name: 'speech',
      title: 'Speech',
      fields: [
        {
          name: 'speaker',
          title: 'Speaker',
          type: 'string', // or a reference to a person object if needed
          options: {
            list: [
              {title: 'Interviewer', value: 'interviewer'},
              {title: 'Interviewee', value: 'interviewee'},
            ],
            layout: 'radio',
          },
        },
        {
          name: 'initials',
          title: 'Initials',
          type: 'string',
          description: 'Optional: Displayed before the text, smaller font',
        },
        {
          name: 'text',
          title: 'Text',
          type: 'portableText',
          //   rows: 3,
        },
      ],
      preview: {
        select: {
          speaker: 'speaker',
          text: 'text',
        },
        prepare({speaker, text}) {
          // convert portableText blocks into plain string
          const plainText =
            text
              ?.map((block) => block.children?.map((child) => child.text).join('') || '')
              .join(' ') || ''

          return {
            title: speaker,
            subtitle: plainText.length > 50 ? plainText.slice(0, 50) + '…' : plainText,
          }
        },
      },
    },
    {type: 'block', styles: [{title: 'Heading', value: 'h2'}]}, // optional headings
  ],
})
