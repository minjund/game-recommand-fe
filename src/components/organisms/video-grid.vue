<template>
  <div class="border-t border-white/20 pt-8">
    <h3 class="text-2xl font-semibold text-white mb-6">관련 동영상</h3>
    <div class="grid grid-cols-2 gap-6">
      <video-card
          v-for="(video, index) in videos"
          :key="index"
          :video="video"
      />
    </div>
  </div>
</template>

<script setup>
import VideoCard from '@/components/molecules/video-card.vue'

defineProps({
  videos: {
    type: Array,
    required: true
  }
})
</script>