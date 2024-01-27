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
  publish_date: string
  publisher: string
  pages: number
  isbn: string
  summary: string
  cover: string
}

type NavItem = {
  icon: Component
  to: string
  title?: string
  isCurrent?: boolean
}
