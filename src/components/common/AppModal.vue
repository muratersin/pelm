<script setup lang="ts">
interface Props {
  full?: boolean
}

defineProps<Props>()
</script>

<template>
  <Teleport to="body">
    <div
      class="w-full h-full bg-black bg-opacity-55 fixed flex justify-center items-center z-10 top-0 left-0"
    >
      <div
        class="bg-white shadow rounded px-4 py-2"
        :class="{ 'w-2/3': !full, 'mx-2 w-full': full }"
      >
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>
