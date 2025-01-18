<template>
  <div class="grid grid-cols-3 gap-6 max-h-96 overflow-y-auto pr-2">
    <div v-for="(review, index) in reviews"
         :key="index"
         class="group p-6 bg-white/5 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/10 hover:scale-[1.02] hover:shadow-lg"
         @click="openReviewModal(review)">
      <div class="relative min-h-[5rem]">
        <p class="text-gray-300 text-sm leading-loose line-clamp-3">
          {{ formatReview(review) }}
          <span v-if="review.length > 100"
                class="inline-block text-gray-400 text-xs group-hover:underline">
            ...더보기
          </span>
        </p>
      </div>
    </div>
  </div>

  <!-- Review Modal -->
  <div v-if="selectedReview"
       class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
       @click="closeReviewModal">
    <div class="relative w-full max-w-lg bg-[#181818] rounded-lg shadow-xl p-8"
         @click.stop>
      <button
          class="absolute top-6 right-6 text-gray-400 hover:text-white"
          @click="closeReviewModal">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div class="mt-2">
        <p class="text-gray-300 text-base leading-loose tracking-wide whitespace-pre-line">
          {{ formatReview(selectedReview) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  appId: {
    type: [String, Number],
    required: true
  }
});

const reviews = ref([]);
const selectedReview = ref(null);

const formatReview = (review) => {
  if (!review) return '';
  // \n을 \n\n으로 변경하여 줄바꿈을 두 번씩 적용
  return review.replace(/\\n/g, '\n\n');
};

const openReviewModal = (review) => {
  selectedReview.value = review;
};

const closeReviewModal = () => {
  selectedReview.value = null;
};

const fetchReviews = async () => {
  try {
    const response = await fetch(`http://localhost:8084/api/v1/review?appId=${props.appId}`);
    const data = await response.json();
    reviews.value = data.arrayResponse;
  } catch (error) {
    console.error('리뷰를 불러오는데 실패했습니다:', error);
  }
};

onMounted(() => {
  fetchReviews();
});
</script>

<style>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>