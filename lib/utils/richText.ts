export function htmlToPlainText(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

export function hasRichTextContent(html: string): boolean {
  return htmlToPlainText(html).length > 0
}
