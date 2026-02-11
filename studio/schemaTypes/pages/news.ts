import {defineField, defineType} from 'sanity'

export const news = defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    defineField({name: 'date', title: 'Date', type: 'date', options: {dateFormat: 'DD.MM.YYYY'}}),
    defineField({name: 'text', title: 'Text', type: 'portableText'}),
    defineField({name: 'author', title: 'Author', type: 'string'}),
    defineField({name: 'publication', title: 'Publication', type: 'string'}),
    defineField({
      name: 'newsCategory',
      title: 'Category',
      type: 'reference',
      to: {type: 'newsCategory'},
    }),
    defineField({
      name: 'film',
      title: 'Film',
      type: 'reference',
      to: [{type: 'film'}],
    }),
    defineField({name: 'link', title: 'Link', type: 'link'}),
    defineField({name: 'previewMedia', title: 'Preview Image/Video', type: 'mediaAsset'}),
  ],
  preview: {
    select: {
      text: 'text',
      date: 'date',
      author: 'author',
      publication: 'publication',
      media: 'previewMedia',
    },
    prepare(selection) {
      const {text, date, author, publication, media} = selection

      // get first ~50 chars of the text
      let title = ''
      if (text && Array.isArray(text)) {
        // Portable Text → take the first block, then first 50 chars
        const firstBlock = text.find((block: any) => block._type === 'block')
        if (firstBlock?.children?.length) {
          title = firstBlock.children
            .map((c: any) => c.text)
            .join('')
            .slice(0, 50)
          if (firstBlock.children.map((c: any) => c.text).join('').length > 50) {
            title += '…'
          }
        }
      }

      const subtitleParts = []
      if (date) subtitleParts.push(date)
      if (author) subtitleParts.push(author)
      if (publication) subtitleParts.push(publication)

      return {
        title: title || 'No text',
        subtitle: subtitleParts.join(' – '),
        media,
      }
    },
  },
})
