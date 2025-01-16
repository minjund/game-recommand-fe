# header-section.vue
<template>
  <div class="flex items-center justify-between mb-8 relative">
    <div class="flex-grow flex justify-center">
      <h1 class="netflix-sans text-3xl font-bold text-gray-100 tracking-wide">
        {{ phrase }}
      </h1>
    </div>

    <div class="relative">
      <button
          @click="handleRefresh"
          @mouseenter="showTooltip = isDisabled"
          @mouseleave="showTooltip = false"
          class="p-2 bg-white/10 rounded-full transition-all duration-300
                 transform hover:scale-105"
          :class="{
            'opacity-50 cursor-not-allowed': isDisabled,
            'hover:bg-white/20 hover:rotate-180': !isDisabled
          }"
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

      <!-- Tooltip -->
      <div
          v-if="showTooltip && isDisabled"
          class="absolute right-0 mt-2 p-2 bg-black/90 text-white text-sm rounded-lg
                 shadow-lg whitespace-nowrap z-50"
      >
        <div class="relative">
          <!-- Tooltip arrow -->
          <div class="absolute -top-2 right-4 w-4 h-4 bg-black/90 transform rotate-45"></div>
          <!-- Tooltip content -->
          <div class="relative z-10">
            {{ remainingTime }} 후 다시 시도해주세요
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  phrase: {
    type: String,
    required: true
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  remainingTime: {
    type: String,
    default: ''
  }
})

const showTooltip = ref(false)

const emit = defineEmits(['refresh'])

const handleRefresh = () => {
  if (!props.isDisabled) {
    emit('refresh')
  }
}
</script>