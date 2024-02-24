<script setup lang="ts">
import AppButton from '@/components/common/AppButton.vue'

type Props = {
  headers: string[]
  data: string[][]
}

defineProps<Props>()

const emit = defineEmits(['goBack', 'goNext'])
</script>

<template>
  <div class="flex justify-between mb-4 mt-4 sticky">
    <AppButton class="w-1/3" @click="emit('goBack')">Go Back</AppButton>
    <AppButton class="w-1/3" type="primary" @click="emit('goNext')">Map Your Headers</AppButton>
  </div>
  <div class="text-center mb-4">
    <p class="text-gray-600">Check your data which is imported from file</p>
  </div>
  <div class="overflow-y-auto">
    <table class="border-collapse border border-slate-400">
      <caption></caption>
      <thead>
        <tr>
          <th class="border border-slate-300 p-1" id="num"></th>
          <th
            v-for="header in headers"
            :key="header"
            class="border border-slate-300 p-1"
            :id="header"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in data" :key="i">
          <th scope="row" class="border">{{ i + 1 }}</th>
          <td
            v-for="d in item"
            :key="d + i"
            class="border border-slate-300 p-1 max-w-40 truncate ..."
          >
            {{ d }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
