import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import {
  addBook as bookServiceAddBook,
  updateBook as bookServiceUpdateBook,
  getBooks
} from '@/services/book.service'
import logger from '@/helpers/logger'
import * as storage from '@/services/storage.service'

export const useBookStore = defineStore('book', () => {
  const books = ref<Book[]>([])
  const loading = ref<boolean>(false)
  const initialized = ref<boolean>(false)
  const searchText = ref<string>('')
  const sortBy = ref<SortBy>(storage.getItem('sortBy'))
  const sortType = ref<SortType>(storage.getItem('sortType'))

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
    try {
      loading.value = true
      books.value = await getBooks(sortBy.value, sortType.value)
      initialized.value = true

      return true
    } catch (err) {
      logger.error(err)

      return false
    } finally {
      loading.value = false
    }
  }

  const setSortType = (value: SortType) => {
    sortType.value = value
    storage.setItem('sortType', value)
  }

  const setSortBy = (value: SortBy) => {
    sortBy.value = value
    storage.setItem('sortBy', value)
  }

  watch(sortBy, fetchBooks)
  watch(sortType, fetchBooks)

  return {
    books,
    searchText,
    sortBy,
    sortType,
    loading,
    filteredBooks,
    setSortBy,
    setSortType,
    addBook,
    updateBook,
    deleteBook,
    fetchBooks
  }
})
