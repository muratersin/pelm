<script setup lang="ts">
import { computed, reactive, ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppTopBar from '@/components/common/AppTopBar.vue'
import AppInput from '@/components/common/AppInput.vue'
import AppTextArea from '@/components/common/AppTextArea.vue'
import AppButton from '@/components/common/AppButton.vue'
import { getBookById } from '@/services/book.service'
import logger from '@/helpers/logger'
import { useBookStore } from '@/stores/book'

const route = useRoute()
const router = useRouter()
const bookStore = useBookStore()
const id = computed(() => route.params?.id)
const title = computed(() => (id.value ? 'Update Book' : 'Add Book'))
const book = reactive<Book>({})
const loading = ref<boolean>(false)

onBeforeMount(() => {
  getBook()
})

const getBook = async () => {
  if (!id.value) return

  try {
    const bookData = await getBookById(id.value)
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
</script>

<template>
  <div class="px-8">
    <AppTopBar :title="title" />
    <div class="mb-5">
      <AppInput label="Title" v-model="book.title"></AppInput>
    </div>
    <div class="mb-5">
      <AppInput label="Authors" v-model="book.authors"></AppInput>
    </div>
    <div class="mb-5">
      <AppInput label="Categories" v-model="book.categories"></AppInput>
    </div>
    <div class="mb-5">
      <AppInput label="Publish Date" v-model="book.publishDate"></AppInput>
    </div>
    <div class="mb-5">
      <AppInput label="Publisher" v-model="book.publisher"></AppInput>
    </div>
    <div class="mb-5">
      <AppInput label="Page Size" v-model="book.pageSize"></AppInput>
    </div>
    <div class="mb-5">
      <AppInput label="ISBN" v-model="book.isbn"></AppInput>
    </div>
    <div class="mb-5">
      <AppInput label="Cover Image URL" v-model="book.coverUrl"></AppInput>
    </div>
    <div class="mb-5">
      <AppTextArea label="Summary" v-model="book.summary"></AppTextArea>
    </div>
    <AppButton :loading="loading" type="primary" class="w-full my-5" @click="submit">{{
      id ? 'Update' : 'Add'
    }}</AppButton>
  </div>
</template>
