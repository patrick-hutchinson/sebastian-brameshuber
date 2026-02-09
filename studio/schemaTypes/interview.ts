import {defineField, defineType} from 'sanity'

export const interview = defineType({
  name: 'interview',
  title: 'Interview',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'string'}),
    defineField({name: 'interviewer', title: 'Interviewer', type: 'string'}),
    defineField({name: 'interviewee', title: 'Der Geinterviewte', type: 'string'}),
    defineField({name: 'interviewText', title: 'Interview Text', type: 'interviewText'}),
  ],
})
