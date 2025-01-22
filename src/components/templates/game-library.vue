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
              @refresh="handleRefresh"
          />

          <!-- 로딩 상태 -->
          <div v-if="isLoading" class="flex flex-col items-center justify-center mt-12 gap-4">
            <div class="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
            <p class="text-gray-300 text-lg">당신에게 어울리는 게임 찾는 중...</p>
          </div>

          <game-grid
              :games="displayedGames"
              :flipped-cards="flippedCards"
              @hover="isHovered = $event"
              @select-game="openGameDetail"
          />
        </div>

        <game-detail
            v-if="selectedGame"
            :game="selectedGame"
            :videos="getVideosForGame(selectedGame)"
            @close="closeGameDetail"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'
import Background from '@/components/organisms/background.vue'
import HeaderSection from '@/components/organisms/header-section.vue'
import GameGrid from '@/components/organisms/game-grid.vue'
import GameDetail from '@/components/organisms/game-detail.vue'
import { API_BASE_URL } from '@/constants';

const router = useRouter()
const authStore = useAuthStore()

const getRandomPhrase = () => {
  const phrases = [
    "오늘은 이 게임 어때요?",
    "당신을 위한 게임 목록"
  ]
  return phrases[Math.floor(Math.random() * phrases.length)]
}

// 그 다음 state 정의
const isHovered = ref(null)
const selectedGame = ref(null)
const displayedGames = ref([])
const flippedCards = ref(new Set())
const currentPhrase = ref(getRandomPhrase())
const games = ref([])
const isLoading = ref(true)

// Refresh cooldown state
const isRefreshCooldown = ref(false)
const cooldownEndTime = ref(null)
const remainingTime = ref('')

const formatTime = (milliseconds) => {
  const minutes = Math.floor(milliseconds / 60000)
  const seconds = Math.floor((milliseconds % 60000) / 1000)
  return `${minutes}분 ${seconds}초`
}

const getVideosForGame = (game) => {
  if (!game) return []

  return [
    {
      title: `${game.name} 게임플레이 영상`,
      thumbnail: `/api/placeholder/400/225`,
      channel: "Game Channel 1"
    },
    {
      title: `${game.name} 리뷰`,
      thumbnail: `/api/placeholder/400/225`,
      channel: "Game Review"
    },
    {
      title: `${game.name} 공략`,
      thumbnail: `/api/placeholder/400/225`,
      channel: "Game Tips"
    },
    {
      title: `${game.name} 하이라이트`,
      thumbnail: `/api/placeholder/400/225`,
      channel: "Game Highlights"
    },
    {
      title: `${game.name} 신규 업데이트`,
      thumbnail: `/api/placeholder/400/225`,
      channel: "Game News"
    },
    {
      title: `${game.name} 멀티플레이`,
      thumbnail: `/api/placeholder/400/225`,
      channel: "Multiplayer Gaming"
    },
    {
      title: `${game.name} 속도런`,
      thumbnail: `/api/placeholder/400/225`,
      channel: "Speedrun Community"
    },
    {
      title: `${game.name} 비하인드`,
      thumbnail: `/api/placeholder/400/225`,
      channel: "Game Stories"
    }
  ]
}

const updateRemainingTime = () => {
  if (!cooldownEndTime.value) return

  const now = Date.now()
  const remaining = cooldownEndTime.value - now

  if (remaining <= 0) {
    isRefreshCooldown.value = false
    cooldownEndTime.value = null
    remainingTime.value = ''
    return
  }

  remainingTime.value = formatTime(remaining)
  setTimeout(updateRemainingTime, 1000)
}

const handleRefresh = () => {
  if (isRefreshCooldown.value) return

  flippedCards.value.clear()
  const shuffled = [...games.value]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8)

  displayedGames.value = shuffled
  currentPhrase.value = getRandomPhrase()

  shuffled.forEach((game, index) => {
    setTimeout(() => {
      flippedCards.value.add(game.steam_appid)
    }, index * 300)
  })

  isRefreshCooldown.value = true
  cooldownEndTime.value = Date.now() + 600000 // 10분
  updateRemainingTime()
}

const openGameDetail = (game) => {
  selectedGame.value = game
}

const closeGameDetail = () => {
  selectedGame.value = null
}

// 초기 데이터 로드
onMounted(async () => {
  if (!authStore.isLoggedIn) {
    router.push('/login')
    return
  }
  // API에서 게임 데이터 가져오기
  try {
    const response = await fetch(`${API_BASE_URL}/steam/recommend/recently-game?userId=${authStore.steamId}`)
    const data = await response.json()

    games.value = data.map(item => {
      if (item.gameDetail) {
        const { gameDetail, ...rest } = item
        return { ...rest, ...gameDetail }
      }
      return item
    })
    displayedGames.value = games.value.slice(0, 8)

    // 카드 플립 애니메이션
    displayedGames.value.forEach((game, index) => {
      setTimeout(() => {
        flippedCards.value.add(game.steam_appid)
      }, index * 300)
    })
  } catch (error) {
    console.error('Failed to fetch games:', error)
  } finally {
    isLoading.value = false // 로딩 완료
  }
})
</script>