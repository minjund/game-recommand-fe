// templates/GameLibraryTemplate.vue
<template>
  <div class="min-h-screen relative overflow-hidden">
    <background />

    <div class="relative z-10">
      <div class="fixed inset-0 flex flex-col items-center py-8 px-4 overflow-auto">
        <div class="w-full max-w-[1400px] mx-auto">
          <header-section
              :phrase="currentPhrase"
              :is-disabled="isRefreshCooldown"
              :remaining-time="remainingTime"
              @refresh="$emit('refresh')"
          />

          <!-- 로딩 상태 -->
          <div v-if="isLoading" class="flex flex-col items-center justify-center mt-12 gap-4">
            <div class="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
            <p class="text-gray-300 text-lg">당신에게 어울리는 게임 찾는 중...</p>
          </div>

          <game-grid
              :games="displayedGames"
              :flipped-cards="flippedCards"
              @hover="$emit('hover', $event)"
              @select-game="$emit('select-game', $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Background from '@/components/pages/background.vue'
import HeaderSection from '@/components/organisms/header-section.vue'
import GameGrid from '@/components/organisms/game-grid.vue'

defineProps({
  currentPhrase: {
    type: String,
    required: true
  },
  isRefreshCooldown: {
    type: Boolean,
    required: true
  },
  remainingTime: {
    type: String,
    required: true
  },
  isLoading: {
    type: Boolean,
    required: true
  },
  displayedGames: {
    type: Array,
    required: true
  },
  flippedCards: {
    type: Set,
    required: true
  },
  selectedGame: {
    type: Object,
    default: null
  },
  videos: {
    type: Array,
    required: true
  }
})

defineEmits(['refresh', 'hover', 'select-game', 'close-detail'])
</script>