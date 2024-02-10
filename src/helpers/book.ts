import { DEFAULT_COVER_URI } from '@/constants/book'

export const fillDefaultFields = (book: Book): Book => {
  if (!book.coverUrl) {
    book.coverUrl = DEFAULT_COVER_URI
  }

  if (!book.createdAt) {
    book.createdAt = Date.now()
  }

  return book
}

export const convertToBookListItem = (books: Book[]): BookListItem[] =>
  books.map((book) => ({
    id: book.id,
    title: book.title,
    authors: book.authors,
    coverUrl: book.coverUrl,
    createdAt: book.createdAt
  })) as unknown as BookListItem[]
