# steam-detail-description-text.vue
<template>
  <div class="steam-description" v-html="sanitizedContent"></div>
</template>

<script setup>
import { computed } from 'vue'
import DOMPurify from 'dompurify'

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

// HTML 살균 처리
const sanitizedContent = computed(() => {
  return DOMPurify.sanitize(props.content, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
  })
})
</script>

<style scoped>
.steam-description {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.6;
  color: #acb2b8;
}

/* Steam BB 코드 스타일 */
.steam-description :deep(.bb_img) {
  max-width: 100%;
  height: auto;
  margin: 1rem 0;
  display: block;
}

.steam-description :deep(.bb_ul) {
  padding-left: 1.5rem;
  margin: 1rem 0;
  list-style-type: disc;
}

.steam-description :deep(.bb_ul li) {
  margin-bottom: 0.5rem;
}

.steam-description :deep(h2.bb_tag) {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem;
  color: #fff;
}

.steam-description :deep(strong) {
  color: #fff;
  font-weight: 600;
}

.steam-description :deep(a) {
  color: #66c0f4;
  text-decoration: none;
}

.steam-description :deep(a:hover) {
  text-decoration: underline;
}

.steam-description :deep(br) {
  content: "";
  display: block;
  margin: 0.5rem 0;
}
</style>