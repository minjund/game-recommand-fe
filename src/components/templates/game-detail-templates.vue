<template>
  <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      @click="$emit('close')"
  >
    <div
        class="relative w-full max-w-4xl bg-[#181818] rounded-lg shadow-xl max-h-[90vh] overflow-y-auto"
        @click.stop
    >
      <close-button
          class="absolute top-4 right-4"
          @click="$emit('close')"
      />
      <!-- Game Header -->
      <div class="relative h-96">
        <game-thumbnail
            :src="game.header_image"
            :alt="game.name"
            class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent" />
      </div>

      <!-- Game Content -->
      <div class="px-8 pb-8 -mt-20 relative">
        <title-text class="text-4xl mb-4">
          <a
              v-bind:href="'https://store.steampowered.com/app/'+game.steam_appid"
              target="_blank"
              class="hover:text-white underline transition-colors duration-200 inline-flex items-center gap-2"
          >
            {{ game.name }}
            <external-link-icon />
          </a>
        </title-text>

        <div class="flex flex-wrap gap-4 mb-6">
          <div class="px-4 py-2 bg-white/10 rounded-md">
            <span class="text-sm text-gray-300">
              릴리즈: {{ game.release_date?.date || 'N/A' }}
            </span>
          </div>
          <div class="px-4 py-2 bg-white/10 rounded-md">
            <span class="text-sm text-gray-300">
              가격: {{ game.is_free ? '무료' : game.price_overview.final }}
            </span>
          </div>
          <div v-if="game.metacritic" class="px-4 py-2 bg-white/10 rounded-md">
            <a
                v-bind:href="game.metacritic.url"
                target="_blank"
                class="text-sm text-gray-300 hover:text-white underline transition-colors duration-200 inline-flex items-center gap-2"
            >
              리뷰 점수: {{ game.metacritic.score }}
              <external-link-icon />
            </a>
          </div>
        </div>
        <!-- 장르 컨테이너 -->
        <div class="flex flex-wrap gap-2 mb-6">
          <div v-for="genre in game.genres"
               :key="genre.id"
               class="inline-flex px-4 py-2 bg-white/10 rounded-md">
                <span class="text-sm text-gray-300">
                    {{ genre.description }}
                </span>
          </div>
        </div>

        <!-- 리뷰 섹션 추가 -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold text-white mb-4">유저 리뷰</h3>
          <game-reivew-card :app-id="game.steam_appid" />
        </div>
        <!-- YouTube Videos Section -->
        <!--          <video-grid :videos="videos" />-->
      </div>
    </div>
  </div>
</template>

<script setup>
import CloseButton from '@/components/atoms/button/close-button.vue'
import GameThumbnail from '@/components/atoms/image/game-thumbnail.vue'
import TitleText from '@/components/atoms/text/title-text.vue'
import ExternalLinkIcon from "@/components/atoms/icon/external-link-icon.vue";
import GameReivewCard from "@/components/molecules/game-reivew-card.vue";


defineProps({
  game: {
    type: Object,
    required: true
  },
  videos: {
    type: Array,
    required: true
  }
})

defineEmits(['close'])
</script>