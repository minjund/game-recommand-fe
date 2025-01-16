<template>
  <button
      @click="handleClick"
      @mouseenter="$emit('mouseenter')"
      @mouseleave="$emit('mouseleave')"
      class="p-2 bg-white/10 rounded-full transition-all duration-300"
      :class="buttonClasses"
  >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-gray-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
      <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click', 'mouseenter', 'mouseleave'])

const buttonClasses = computed(() => ({
  'opacity-50 cursor-not-allowed': props.disabled,
  'hover:bg-white/20 hover:rotate-180': !props.disabled
}))

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>