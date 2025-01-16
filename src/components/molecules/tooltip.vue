<template>
  <div
      v-if="show"
      class="absolute right-0 mt-2 p-2 bg-black/90 text-white text-sm rounded-lg
    shadow-lg whitespace-nowrap z-50"
  >
    <div class="relative">
      <div class="absolute -top-2 right-4 w-4 h-4 bg-black/90 transform rotate-45"></div>
      <div class="relative z-10">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
</script>