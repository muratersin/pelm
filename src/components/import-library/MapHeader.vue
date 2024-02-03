<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

import AppSelect from '@/components/common/AppSelect.vue'
import AppButton from '@/components/common/AppButton.vue'
import AppAlert from '@/components/common/AppAlert.vue'
import { BOOK_DATA_HEADERS } from '@/constants/database'
import logger from '@/helpers/logger'

type Props = {
  headers: string[]
}

const props = defineProps<Props>()

const errorMap = ref()
const mappedHeaders = reactive<any>({})
const options = computed(() =>
  props.headers.map((h) => ({
    name: h,
    value: h,
    disabled: Object.values(mappedHeaders).includes(h)
  }))
)

const handleChange = (fieldName: string, v: string | number) => {
  logger.info(fieldName + ': ' + v, mappedHeaders.value)
  mappedHeaders[fieldName] = v
}

const emit = defineEmits(['goBack', 'save'])

const validate = (): boolean => {
  const requireds = BOOK_DATA_HEADERS.filter((d) => d.required).map((d) => d.name)
  const mappedFields = Object.keys(mappedHeaders)
  let errors: any = {}
  let hasError = false

  requireds.forEach((requiredField: string): void => {
    if (!mappedFields.includes(requiredField)) {
      errors[requiredField] = 'This field cannot be empty'
      hasError = true
    }
  })

  errorMap.value = errors

  setTimeout(() => {
    errorMap.value = undefined
  }, 4000)

  return hasError
}

const save = () => {
  if (validate()) {
    emit('save', mappedHeaders)
  }
}
</script>

<template>
  <div class="flex justify-between mb-4 mt-4 sticky">
    <AppButton class="w-1/3" @click="emit('goBack')">Go Back</AppButton>
    <AppButton class="w-1/3" type="primary" @click="save">Save</AppButton>
  </div>
  <div>Map your headers</div>
  <div v-for="header of BOOK_DATA_HEADERS" :key="header.name" class="border-b py-4">
    <div class="flex justify-between">
      <div class="w-1/2">{{ header.displayedName }}</div>
      <div class="w-1/2">
        <AppSelect
          @change="(v) => handleChange(header.name, v)"
          :options="options"
          :value="mappedHeaders[header.name]"
        />
      </div>
    </div>
    <AppAlert v-if="errorMap && errorMap[header.name]" type="error" class="mt-4">{{
      errorMap[header.name]
    }}</AppAlert>
  </div>
</template>
