export const portableTextToPreview = (blocks = [], maxLength = 75) => {
  const text = blocks
    .map((block) => block.children?.map((child) => child.text).join(''))
    .join(' ')
    .trim()

  if (text.length <= maxLength) return text

  return text.slice(0, maxLength).trimEnd() + '…'
}
