<script setup lang="ts">
import { computed, reactive, ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppTopBar from '@/components/common/AppTopBar.vue'
import AppInput from '@/components/common/AppInput.vue'
import AppButton from '@/components/common/AppButton.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import BookListModal from '@/components/book/BookListModal.vue'
import { getBookById, fillMissingFields, fetchBookInfo } from '@/services/book.service'
import logger from '@/helpers/logger'
import { useBookStore } from '@/stores/book'
import AppLoader from '@/components/common/AppLoader.vue'

const route = useRoute()
const router = useRouter()
const bookStore = useBookStore()
const id = computed(() => route.params?.id)
const title = computed(() => (id.value ? 'Update Book' : 'Add Book'))
const book = reactive<Book>({})
const loading = ref<boolean>(false)
const searchResult = ref<Book[]>([])

onBeforeMount(() => {
  getBook()
})

const onBookSelected = (selectedBook: Book) => {
  fillMissingFields(book, selectedBook)
  searchResult.value = []
}

const getBook = async () => {
  if (!id.value) return

  try {
    const bookData = await getBookById(id.value as unknown as number)
    book.id = bookData.id
    book.title = bookData.title
    book.authors = bookData.authors
    book.categories = bookData.categories
    book.publishDate = bookData.publishDate
    book.publisher = bookData.publisher
    book.pageSize = bookData.pageSize
    book.isbn = bookData.isbn
    book.coverUrl = bookData.coverUrl
    book.summary = bookData.summary
    book.note = bookData.note
  } catch (err) {
    logger.error(err)
  }
}

const submit = async (e: Event) => {
  e.preventDefault()

  if (!book.title || !book.authors) {
    alert('Titlea or Authors cant be empty')
    return
  }

  loading.value = true

  const bookCopy = Object.assign({}, book)
  const isSuccess = book.id
    ? await bookStore.updateBook(bookCopy)
    : await bookStore.addBook(bookCopy)

  if (isSuccess) {
    router.replace('/')
  }

  loading.value = false
}

const searchBook = async () => {
  if (!book.isbn && !book.title && !book.authors) {
    alert('Please enter isbn, title or author')
    return
  }

  try {
    loading.value = true
    const query = { isbn: book.isbn, title: book.title, author: book.authors }
    searchResult.value = await fetchBookInfo(query)
  } catch (err) {
    logger.error('err')
  } finally {
    loading.value = false
  }
}

const closeBookListModal = () => {
  searchResult.value = []
}
</script>

<template>
  <div class="px-8">
    <AppTopBar :title="title">
      <template v-slot:right>
        <AppLoader v-if="loading" />
        <IconSearch v-else class="w-5 cursor-pointer" @click="searchBook" />
      </template>
    </AppTopBar>

    <div class="mb-5">
      <AppInput placeholder="Title" v-model="book.title"></AppInput>
    </div>
    <div class="mb-5">
      <AppInput placeholder="Authors" v-model="book.authors"></AppInput>
    </div>
    <div class="mb-5">
      <AppInput placeholder="Categories" v-model="book.categories"></AppInput>
    </div>
    <div class="mb-5">
      <AppInput placeholder="Publish Date" v-model="book.publishDate"></AppInput>
    </div>
    <div class="mb-5">
      <AppInput placeholder="Publisher" v-model="book.publisher"></AppInput>
    </div>
    <div class="mb-5">
      <AppInput placeholder="Page Size" v-model="book.pageSize"></AppInput>
    </div>
    <div class="mb-5 flex items-center justify-center">
      <AppInput placeholder="ISBN" class="w-full" v-model="book.isbn"></AppInput>
    </div>
    <div class="mb-5">
      <AppInput placeholder="Cover Image URL" v-model="book.coverUrl"></AppInput>
    </div>
    <div class="mb-5">
      <AppInput placeholder="Summary" v-model="book.summary"></AppInput>
    </div>
    <div class="mb-5">
      <AppInput placeholder="Note" v-model="book.note"></AppInput>
    </div>
    <AppButton :loading="loading" type="primary" class="w-full my-5" @click="submit">{{
      id ? 'Update' : 'Add'
    }}</AppButton>
    <BookListModal
      :books="searchResult"
      v-if="searchResult.length > 0"
      @selected="onBookSelected"
      @close="closeBookListModal"
    />
  </div>
</template>
