import { DEFAULT_COVER_URI } from '@/constants/book'

export const fillDefaultFields = (book: Book): Book => {
  if (!book.coverUrl) {
    book.coverUrl = DEFAULT_COVER_URI
  }

  return book
}
