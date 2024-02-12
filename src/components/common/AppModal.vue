<template>
  <Teleport to="body">
    <div
      class="w-full h-full bg-black bg-opacity-55 fixed flex justify-center items-center z-10 top-0 left-0"
    >
      <div class="bg-white shadow rounded px-4 py-2 w-2/3">
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>
