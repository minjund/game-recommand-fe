<template>
  <div class="relative overflow-hidden rounded-lg group cursor-pointer">
    <div class="aspect-video relative">
      <img
          :src="video.thumbnail"
          :alt="video.title"
          class="w-full h-full object-cover"
      >
      <div class="absolute inset-0 flex items-center justify-center
            bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg"
             class="h-12 w-12 text-white"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
    <div class="p-3">
      <h4 class="text-white font-medium line-clamp-2 text-sm">{{ video.title }}</h4>
      <p class="text-gray-400 text-xs mt-1">{{ video.channel }}</p>
    </div>
  </div>
</template>
<script setup>
defineProps({
  video: {
    type: Object,
    required: true
  }
})
</script>