<script setup lang="ts">
import { ref } from 'vue'
import AppInput from '@/components/common/AppInput.vue'
import AppButton from '@/components/common/AppButton.vue'

const s = ref('')
</script>

<template>
  <AppButton>{{ s }}</AppButton>
  <div class="w-full bg-white shadow p-2 sticky top-0">
    <AppInput v-model="s" placeholder="Search by title, author, publisher" clearabled />
  </div>
</template>
