<template>
  <button
      @click="$emit('click')"
      class="px-8 py-4 bg-[#E50914] hover:bg-[#F40612] transition-all duration-300
     rounded text-lg font-medium shadow-lg hover:shadow-red-600/20
     transform hover:scale-105"
  >
    <slot >Steam으로 로그인</slot>
  </button>
</template>

<script setup>
defineEmits(['click'])
</script>