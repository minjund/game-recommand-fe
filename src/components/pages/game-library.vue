<template>
  <game-library-template
      :current-phrase="currentPhrase"
      :is-refresh-cooldown="isRefreshCooldown"
      :remaining-time="remainingTime"
      :is-loading="isLoading"
      :displayed-games="displayedGames"
      :flipped-cards="flippedCards"
      :selected-game="selectedGame"
      :videos="selectedGame ? getVideosForGame(selectedGame) : []"
      @refresh="handleRefresh"
      @hover="isHovered = $event"
      @select-game="openGameDetail"
      @close-detail="closeGameDetail"
  />

  <game-detail
      v-if="selectedGame"
      :game="selectedGame"
      :videos="videos"
      :is-loading="isDetailLoading"
      :error="detailError"
      @close="closeGameDetail"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'
import GameLibraryTemplate from '@/components/templates/game-library-templates.vue'
import { API_BASE_URL } from '@/constants'
import GameDetail from "@/components/templates/game-detail-templates.vue";

const router = useRouter()
const authStore = useAuthStore()

const getRandomPhrase = () => {
  const phrases = [
    "오늘은 이 게임 어때요?",
    "당신을 위한 게임 목록"
  ]
  return phrases[Math.floor(Math.random() * phrases.length)]
}

// State 정의
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

const gameDetail = ref(null)
const videos = ref([])
const isDetailLoading = ref(false)
const detailError = ref(null)

// 게임 상세 api 조회
const fetchGameDetail = async (gameId) => {
  isDetailLoading.value = true
  detailError.value = null

  try {
    const response = await fetch(`${API_BASE_URL}/games/${gameId}/detail`)
    const data = await response.json()

    // 상세 정보 업데이트
    gameDetail.value = data

    // 비디오 정보 업데이트
    videos.value = data.videos || []
  } catch (error) {
    console.error('Failed to fetch game detail:', error)
    detailError.value = '게임 상세 정보를 불러오는데 실패했습니다.'
  } finally {
    isDetailLoading.value = false
  }
}

const openGameDetail = async (game) => {
  selectedGame.value = game
  await fetchGameDetail(game.steam_appid)
}

const closeGameDetail = () => {
  selectedGame.value = null
  gameDetail.value = null
  videos.value = []
  detailError.value = null
}

// 초기 데이터 로드
onMounted(async () => {
  if (!authStore.isLoggedIn) {
    router.push('/login')
    return
  }

  try {
    const response = await fetch(`${API_BASE_URL}/recommend?userId=${authStore.steamId}`)
    const data = await response.json()

    const BASE_IMAGE_URL = 'https://shared.fastly.steamstatic.com/store_item_assets/'

    games.value = data.recommendGame.store_items.map(item => {
      const assetUrlFormat = item.assets?.asset_url_format || ''
      const headerImage = assetUrlFormat
          ? `${BASE_IMAGE_URL}${assetUrlFormat.replace('${FILENAME}', item.assets.header)}`
          : `/api/placeholder/460/215`

      return {
        steam_appid: item.appid,
        name: item.name,
        header_image: headerImage,
        release_date: { date: 'TBD' },
        is_free: item.best_purchase_option?.final_price_in_cents === 0,
        price_overview: {
          final: item.best_purchase_option?.final_price_in_cents
              ? `₩${(item.best_purchase_option.final_price_in_cents / 100).toLocaleString()}`
              : 'N/A'
        },
        metacritic: item.best_purchase_option?.metacritic,
        short_description: item.basic_info?.short_description || '',
      }
    })

    displayedGames.value = games.value.slice(0, 8)

    displayedGames.value.forEach((game, index) => {
      setTimeout(() => {
        flippedCards.value.add(game.steam_appid)
      }, index * 300)
    })
  } catch (error) {
    console.error('Failed to fetch games:', error)
  } finally {
    isLoading.value = false
  }
})
</script>