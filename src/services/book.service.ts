import { SORT_BY, SORT_TYPES } from '@/constants/book'
import { fillDefaultFields } from '@/helpers/book'
import { isSecureUrl } from '@/helpers/url'
import { DBService } from '@/services/db.service'

const BOOK_SERVICE = 'https://qf4kaw3xm2oaoisjkdm7iimg2a0bmxvl.lambda-url.eu-west-1.on.aws'

interface Query {
  title?: string
  isbn?: string
  author?: string
}

export const fetchBookInfo = async (query: Query): Promise<Book[]> => {
  const { isbn, title, author } = query

  if (!isbn && !title && !author) {
    throw new Error('Please provide ISBN or title')
  }
  const url = new URL(BOOK_SERVICE)

  if (isbn) {
    url.searchParams.append('isbn', isbn)
  }
  if (title) {
    url.searchParams.append('title', title)
  }
  if (author) {
    url.searchParams.append('author', author)
  }

  const response = await fetch(url.toString())
  const result = await response.json()
  return result?.data || []
}

export const fetchNFillMissingFields = async (book: Book, query: Query) => {
  const [result] = await fetchBookInfo({ isbn: query.title, title: query.title })

  if (!result) {
    return book
  }

  return fillMissingFields(book, result)
}

export const fillMissingFields = (book: Book, newBook: Book, override?: boolean) => {
  if (newBook.title && (!book.title || override)) {
    book.title = newBook.title
  }

  if (newBook.isbn) {
    book.isbn = newBook.isbn || book.isbn
  }

  if (isSecureUrl(newBook.coverUrl) && !isSecureUrl(book.coverUrl)) {
    book.coverUrl = newBook.coverUrl
  }

  if (newBook.categories && (!book.categories || override)) {
    book.categories = newBook.categories
  }

  if (newBook.authors && (!book.authors || override)) {
    book.authors = newBook.authors
  }

  if (newBook.pageSize && (!book.pageSize || override)) {
    book.pageSize = newBook.pageSize
  }

  if (newBook.publishDate && (!book.publishDate || override)) {
    book.publishDate = newBook.publishDate
  }

  if (newBook.publisher && (!book.publisher || override)) {
    book.publisher = newBook.publisher
  }

  if (newBook.summary && (!book.summary || override)) {
    book.summary = newBook.summary
  }

  return book
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

export const updateBook = (book: Book) => {
  return new Promise((resolve, reject) => {
    if (!DBService.instance?.db) {
      return reject('ObjectStore is not found!')
    }

    const transaction = DBService.instance.db.transaction('books', 'readwrite')
    const objectStore = transaction.objectStore('books')

    const req = objectStore?.put(fillDefaultFields(book))

    req.onsuccess = () => {
      resolve(req.result)
    }

    req.onerror = () => {
      reject(req.error)
    }
  })
}

export const deleteBookById = (id: number) => {
  return new Promise((resolve, reject) => {
    if (!DBService.instance?.db) {
      return reject('ObjectStore is not found!')
    }

    const transaction = DBService.instance.db.transaction('books', 'readwrite')
    const objectStore = transaction.objectStore('books')

    const req = objectStore?.delete(id)

    req.onsuccess = () => {
      resolve(req.result)
    }

    req.onerror = () => {
      reject(req.error)
    }
  })
}

export const getBooks = (
  index: SortBy = SORT_BY.CreatedAt,
  direction: SortType = SORT_TYPES.Next,
  offset: number = 0
): Promise<Book[]> => {
  return new Promise((resolve, reject) => {
    if (!DBService.instance?.db) {
      return reject(new Error('ObjectStore is not found!'))
    }
    const results: Book[] = []
    const transaction = DBService.instance.db.transaction('books', 'readwrite')

    transaction.oncomplete = () => resolve(results)
    transaction.onerror = () => reject(new Error('IndexDB, transection error!'))

    const objectStore = transaction.objectStore('books')
    const cursorRequest = objectStore.index(index).openCursor(null, direction)

    let isOffsetSetted = offset === 0

    cursorRequest.onsuccess = (e: Event) => {
      // @ts-ignore
      const cursor = e?.target?.result

      if (!cursor) {
        return
      }

      if (!isOffsetSetted) {
        isOffsetSetted = true
        cursor.advance(offset)
      }

      results.push(cursor.value)

      cursor.continue()
    }

    cursorRequest.onerror = () => {
      reject(new Error('IndexDB, cursor error!'))
    }
  })
}

export const getBookById = (id: number): Promise<Book> => {
  return new Promise((resolve, reject) => {
    const req = DBService?.instance?.db?.transaction('books').objectStore('books').get(Number(id))

    if (!req) return reject(new Error('IndexDB, get error!'))

    req.onsuccess = (event) => {
      // @ts-ignore
      resolve(event?.target?.result as Book)
    }

    req.onerror = () => {
      reject(new Error('IndexDB, get error!'))
    }
  })
}
