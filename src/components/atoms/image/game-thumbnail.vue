<template>
  <img
      :src="src"
      :alt="alt"
      class="w-full aspect-video object-cover"
  >
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  }
})
</script>