type BookListItem = {
  id: string
  name: string
  author: string
  cover: string
  createdAt: string
}

type Book = {
  title: string
  authors: string[]
  categories: string[]
  publishDate: string
  createdAt: string
  publisher: string
  pages: number
  isbn: string
  summary: string
  coverUrl: string
}

type NavItem = {
  icon: Component
  to: string
  title?: string
  isCurrent?: boolean
}

type ParsedArray = Array<string[]>

type ParsedFileHeaders = [
  'Title',
  'Authors',
  'Seri',
  'Categories',
  'Publish date ',
  'Publisher',
  'Pages',
  'ISBN',
  'Read',
  'Reading periods',
  'Yorumlar',
  'Summary'
]

type BookDataHeader = {
  displayedName: string
  name: string
}
