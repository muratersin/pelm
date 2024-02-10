const BOOK_SERVICE = 'http://localhost:3000'
import { fillDefaultFields } from '@/helpers/book'
import { DBService } from '@/services/db.service'

export const fetchBookCover = async (query: {
  title?: string
  isbn?: string
}): Promise<BookCoverRequestResponse> => {
  const { isbn, title } = query

  if (!isbn && !title) {
    throw new Error('Please provide ISBN or title')
  }

  const apiUrl = `${BOOK_SERVICE}/cover?${isbn ? `isbn=${isbn}` : `title=${title}`}`

  const response = await fetch(apiUrl)
  const result = await response.json()

  return result
}

export const addBook = (book: Book) => {
  return new Promise((resolve, reject) => {
    if (!DBService.instance?.db) {
      return reject('ObjectStore is not found!')
    }

    const transaction = DBService.instance.db.transaction('books', 'readwrite')
    const objectStore = transaction.objectStore('books')

    const req = objectStore?.add(fillDefaultFields(book))

    req.onsuccess = () => {
      resolve(req.result)
    }

    req.onerror = () => {
      reject(req.error)
    }
  })
}

export const deleteBook = (id: number) => {}

export const updateBook = (book: Book) => {}

export const getBooks = (): Promise<Book[]> => {
  return new Promise((resolve, reject) => {
    if (!DBService.instance?.db) {
      return reject('ObjectStore is not found!')
    }

    const transaction = DBService.instance.db.transaction('books', 'readwrite')
    const objectStore = transaction.objectStore('books')

    const req = objectStore?.getAll()

    req.onsuccess = () => {
      resolve(req.result)
    }

    req.onerror = () => {
      reject(req.error)
    }
  })
}

export const getBookById = (id: number): Promise<Book> => {
  return new Promise((resolve, reject) => {
    const req = DBService?.instance?.db?.transaction('books').objectStore('books').get(Number(id))

    if (!req) return reject()

    req.onsuccess = (event) => {
      resolve(event?.target?.result as Book)
    }

    req.onerror = () => {
      reject(req.error)
    }
  })
}
