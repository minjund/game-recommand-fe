<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <game-card
        v-for="game in games"
        :key="game.appid"
        :game="game"
        :is-flipped="flippedCards.has(game.appid)"
        @mouseenter="$emit('hover', game.appid)"
        @mouseleave="$emit('hover', null)"
        @select="$emit('select-game', game)"
    />
  </div>
</template>

<script setup>
import GameCard from '@/components/molecules/game-card.vue'

defineProps({
  games: {
    type: Array,
    required: true
  },
  flippedCards: {
    type: Set,
    required: true
  }
})

defineEmits(['hover', 'select-game'])
</script>