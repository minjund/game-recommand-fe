<template>
  <div
      class="relative group cursor-pointer"
      @mouseenter="$emit('mouseenter', game.appid)"
      @mouseleave="$emit('mouseleave')"
      @click="$emit('select', game)"
  >
    <div
        class="relative preserve-3d transition-transform duration-700"
        :class="isFlipped ? 'rotate-y-0' : 'rotate-y-180'"
    >
      <!-- Front side -->
      <div class="backface-hidden relative overflow-hidden rounded-lg transform
                  transition-all duration-500 group-hover:scale-110 group-hover:z-10">
        <game-thumbnail
            :src="game.header_image"
            :alt="game.name"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div class="absolute bottom-0 left-0 right-0 p-4">
            <title-text>{{ game.name }}</title-text>
            <description-text>{{ game.short_description }}</description-text>
            <div class="flex gap-2 mt-2">
<!--              <play-button />-->
<!--              <add-button />-->
            </div>
          </div>
        </div>
      </div>

      <!-- Back side -->
      <div class="backface-hidden absolute inset-0 rotate-y-180">
        <div class="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
          <loading-icon />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GameThumbnail from '@/components/atoms/image/game-thumbnail.vue'
import TitleText from '@/components/atoms/text/title-text.vue'
import DescriptionText from '@/components/atoms/text/description-text.vue'
import PlayButton from '@/components/atoms/button/play-button.vue'
import AddButton from '@/components/atoms/button/add-button.vue'
import LoadingIcon from '@/components/atoms/icon/loading-icon.vue'

const props = defineProps({
  game: {
    type: Object,
    required: true
  },
  isFlipped: {
    type: Boolean,
    default: false
  }
})

defineEmits(['mouseenter', 'mouseleave', 'select'])
</script>