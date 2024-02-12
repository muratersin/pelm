import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import {
  addBook as bookServiceAddBook,
  updateBook as bookServiceUpdateBook,
  getBooks
} from '@/services/book.service'
import logger from '@/helpers/logger'

export const useBookStore = defineStore('book', () => {
  const books = ref<Book[]>([])
  const loading = ref<boolean>(false)
  const initialized = ref<boolean>(false)
  const searchText = ref<string>('')
  const sort = reactive<{
    by: string
    type: 'asc' | 'desc'
  }>({
    by: 'createdAt',
    type: 'desc'
  })

  const filteredBooks = computed(() =>
    books.value?.filter((book) => {
      if (!searchText.value || searchText.value.length < 3) return true

      const reg = new RegExp(searchText.value, 'gi')

      return reg.test(book.title || '') || reg.test(book.authors || '')
    })
  )

  const deleteBook = (id: number) => {
    const i = books.value.findIndex((b) => b.id === id)
    if (i !== -1) {
      books.value.splice(i, 1)
    }
  }

  const addBook = async (book: Book): Promise<boolean> => {
    try {
      await bookServiceAddBook(book)
      books.value.push(book)

      return true
    } catch (err) {
      logger.error(err)

      return false
    }
  }

  const updateBook = async (book: Book): Promise<boolean> => {
    try {
      await bookServiceUpdateBook(book)

      const i = books.value.findIndex((b) => b.id === book.id)
      if (i !== -1) {
        books.value[i] = book
      }

      return true
    } catch (err) {
      logger.error(err)

      return false
    }
  }

  const fetchBooks = async (): Promise<boolean> => {
    if (initialized.value) {
      logger.info('Book store is already initialized.')

      return true
    }

    try {
      loading.value = true
      books.value = await getBooks()
      initialized.value = true

      return true
    } catch (err) {
      logger.error(err)

      return false
    } finally {
      loading.value = false
    }
  }

  return { books, searchText, filteredBooks, loading, addBook, updateBook, deleteBook, fetchBooks }
})
