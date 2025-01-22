<template>
  <div class="h-[calc(90vh-20rem)] relative group">
    <swiper
        :slides-per-view="2"
        :slides-per-group="2"
        :grid="{
          rows: 2,
          fill: 'row'
        }"
        :space-between="20"
        :modules="[Grid, Navigation]"
        :navigation="{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
          lockClass: 'swiper-button-lock',
          disabledClass: 'swiper-button-disabled'
        }"
        class="review-swiper"
    >
      <swiper-slide v-for="review in reviews" :key="review.recommendationid">
        <!-- 리뷰 카드 컨테이너 -->
        <div class="flex group cursor-pointer h-full" @click="openReviewModal(review)">
          <div class="flex-1">
            <!-- 리뷰 카드 -->
            <div class="relative bg-[#2a2f3a] rounded-2xl p-4 transition-colors duration-200 hover:bg-[#32384a] h-full">
              <!-- 상단 메타 정보 -->
              <div class="flex justify-between items-center mb-2">
                <!-- 추천/비추천 뱃지 -->
                <div class="text-xs px-2 py-1 rounded-full"
                     :class="review.voted_up ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'">
                  {{ review.voted_up ? '추천' : '비추천' }}
                </div>
                <!-- 작성 시간 -->
                <span class="text-xs text-gray-400">
                  {{ formatDate(review.timestamp_created) }}
                </span>
              </div>

              <!-- 리뷰 내용 -->
              <div class="text-gray-300 text-sm leading-relaxed">
                <template v-if="isExpanded || review?.review?.length <= 90">
                  <p>{{ formatReview(review?.review) }}</p>
                </template>
                <template v-else>
                  <p>
                    {{ formatReview(review?.review?.slice(0, 90)) }}
                    <button
                        @click.stop="isExpanded = true"
                        class="inline-block text-blue-400 text-xs hover:underline ml-1"
                    >
                      더보기
                    </button>
                  </p>
                </template>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <!-- Custom Navigation Buttons -->
    <button class="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:outline-none">
      <svg width="32" height="32" viewBox="0 0 24 24" class="text-white hover:text-blue-400 transition-colors">
        <path d="M12.707 17.293L8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z" fill="currentColor"/>
      </svg>
    </button>
    <button class="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:outline-none">
      <svg width="32" height="32" viewBox="0 0 24 24" class="text-white hover:text-blue-400 transition-colors">
        <path d="M11.293 17.293l1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z" fill="currentColor"/>
      </svg>
    </button>
  </div>

  <!-- Review Modal -->
  <div v-if="selectedReview"
       class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
       @click="closeReviewModal">
    <div class="relative w-full max-w-2xl bg-[#181818] rounded-lg shadow-xl max-h-[90vh] flex flex-col"
         @click.stop>
      <!-- 모달 헤더 -->
      <div class="flex justify-between items-center p-4 border-b border-gray-700">
        <h3 class="text-lg font-medium text-gray-200">리뷰 상세</h3>
        <button
            class="text-gray-400 hover:text-white focus:outline-none"
            @click="closeReviewModal">
          <XIcon class="w-6 h-6" />
        </button>
      </div>

      <!-- 모달 컨텐츠 -->
      <div class="p-6 overflow-y-auto">
        <div class="flex-1">
          <div class="relative bg-[#2a2f3a] rounded-2xl p-6">
            <!-- 상단 메타 정보 -->
            <div class="flex justify-between items-center mb-4">
              <div class="text-sm px-3 py-1 rounded-full"
                   :class="selectedReview.voted_up ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'">
                {{ selectedReview.voted_up ? '추천' : '비추천' }}
              </div>
              <span class="text-sm text-gray-400">
                {{ formatDate(selectedReview.timestamp_created) }}
              </span>
            </div>

            <p class="text-gray-200 text-base leading-relaxed whitespace-pre-line">
              {{ formatReview(selectedReview?.review) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Grid, Navigation } from 'swiper/modules';
import { X as XIcon } from 'lucide-vue-next';
import { API_BASE_URL } from '@/constants';

import 'swiper/css';
import 'swiper/css/grid';

const props = defineProps({
  appId: {
    type: [String, Number],
    required: true
  }
});

const reviews = ref([]);
const selectedReview = ref(null);

const formatReview = (review) => {
  if (!review || typeof review !== 'string') return '';
  return review.replace(/\\n/g, '\n\n').replace(/\\r/g, '');
};

const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
};

const openReviewModal = (review) => {
  selectedReview.value = review;
};

const closeReviewModal = () => {
  selectedReview.value = null;
};

const fetchReviews = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/review?appId=${props.appId}`);
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

.review-swiper {
  width: 100%;
  height: 100%;
  padding: 1rem;
}

.review-swiper .swiper-slide {
  height: auto;
}

/* 기본 네비게이션 버튼 숨김 */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  display: none;
}

/* 커스텀 네비게이션 비활성화 상태 */
.swiper-button-disabled,
.swiper-button-lock {
  display: none !important;
}
</style>