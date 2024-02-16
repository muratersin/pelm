import { SORT_BY, SORT_TYPES } from '@/constants/book'
import { fillDefaultFields } from '@/helpers/book'
import { isSecureUrl } from '@/helpers/url'
import { DBService } from '@/services/db.service'

const BOOK_SERVICE = 'http://localhost:3000'

export const fetchBookInfo = async (query: { title?: string; isbn?: string }): Promise<Book> => {
  const { isbn, title } = query

  if (!isbn && !title) {
    throw new Error('Please provide ISBN or title')
  }

  const apiUrl = `${BOOK_SERVICE}/book?${isbn ? `isbn=${isbn}` : `title=${title}`}`

  const response = await fetch(apiUrl)
  const result = await response.json()

  return result
}

export const fillMissingFields = async (book: Book, query: { title?: string; isbn?: string }) => {
  const res = await fetchBookInfo(query)

  if (res.title && !book.title) {
    book.title = res.title
  }

  if (res.isbn) {
    book.isbn = res.isbn || book.isbn
  }

  if (isSecureUrl(res.coverUrl) && !isSecureUrl(book.coverUrl)) {
    book.coverUrl = res.coverUrl
  }

  if (res.categories && !book.categories) {
    book.categories = res.categories
  }

  if (res.authors && !book.authors) {
    book.authors = res.authors
  }

  if (res.pageSize && !book.pageSize) {
    book.pageSize = res.pageSize
  }

  if (res.publishDate && !book.publishDate) {
    book.publishDate = res.publishDate
  }

  if (res.publisher && !book.publisher) {
    book.publisher = res.publisher
  }

  if (res.summary && !book.summary) {
    book.summary = res.summary
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
      return reject('ObjectStore is not found!')
    }
    const results: Book[] = []
    const transaction = DBService.instance.db.transaction('books', 'readwrite')

    transaction.oncomplete = () => resolve(results)
    transaction.onerror = (event) => reject(event.target)

    const objectStore = transaction.objectStore('books')
    const cursorRequest = objectStore.index(index).openCursor(null, direction)

    let counter = 0
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

      counter++
      results.push(cursor.value)

      // if (counter >= 10) {
      //   return
      // }

      cursor.continue()
    }

    cursorRequest.onerror = () => {
      reject(cursorRequest.error)
    }
  })
}

export const getBookById = (id: number): Promise<Book> => {
  return new Promise((resolve, reject) => {
    const req = DBService?.instance?.db?.transaction('books').objectStore('books').get(Number(id))

    if (!req) return reject()

    req.onsuccess = (event) => {
      // @ts-ignore
      resolve(event?.target?.result as Book)
    }

    req.onerror = () => {
      reject(req.error)
    }
  })
}
