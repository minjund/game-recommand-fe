<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const isLoggedIn = ref(false)
const steamId = ref(null)
const isHovered = ref(null)

const handleSteamLogin = () => {
  const steamLoginUrl = 'https://steamcommunity.com/openid/login'
  const returnUrl = `${window.location.origin}/auth/steam/return`

  const params = new URLSearchParams({
    'openid.ns': 'http://specs.openid.net/auth/2.0',
    'openid.mode': 'checkid_setup',
    'openid.return_to': returnUrl,
    'openid.realm': window.location.origin,
    'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
    'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select'
  })

  window.location.href = `${steamLoginUrl}?${params.toString()}`
}

const fetchUserGames = async () => {
  try {
    const response = await axios.get(`/api/steam/games/${steamId.value}`)
    games.value = response.data
    displayedGames.value = games.value.slice(0, 8)
  } catch (error) {
    console.error('Failed to fetch games:', error)
  }
}

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const steamIdParam = urlParams.get('steamid')

  if (steamIdParam) {
    steamId.value = steamIdParam
    isLoggedIn.value = true
    await fetchUserGames()
  }
})

const selectedGame = ref(null)

// 임시 게임 데이터
const games = ref([
  {
    appid: 1,
    name: "The Witcher 3: Wild Hunt",
    header_image: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
    short_description: "당신은 전문적인 괴물 사냥꾼인 리비아의 게롤트입니다. 당신의 임무는 예언의 아이를 찾는 것입니다.",
    release_date: { date: "2015-05-18" },
    metacritic: { score: 93 },
    detailed_description: "The Witcher 3: Wild Hunt는 선택의 결과가 중요한 스토리 중심의 오픈 월드 RPG입니다. 아름답고 황폐한 판타지 세계에서, 여러분은 전설적인 괴물 사냥꾼으로서 예언의 아이를 추적해야 합니다.",
    genres: [
      { id: 1, description: "RPG" },
      { id: 2, description: "오픈 월드" }
    ],
    developers: ["CD PROJEKT RED"]
  },
  {
    appid: 2,
    name: "Red Dead Redemption 2",
    header_image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
    short_description: "미국, 1899년. 아서 모건과 반 더 린드 갱단이 도망자가 되어 미국 전역을 횡단하며 모험을 떠납니다.",
    release_date: { date: "2019-12-05" },
    metacritic: { score: 93 },
    detailed_description: "수상 경력에 빛나는 게임 스튜디오 Rockstar Games의 Red Dead Redemption 2는 현대 시대가 시작되려는 1899년 미국을 배경으로 한 서부극 액션 어드벤처입니다.",
    genres: [
      { id: 3, description: "액션" },
      { id: 4, description: "어드벤처" }
    ],
    developers: ["Rockstar Games"]
  },
  {
    appid: 3,
    name: "Cyberpunk 2077",
    header_image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
    short_description: "사이버펑크 2077은 힘, 글래머, 개조를 추구하는 위험한 메갈로폴리스인 나이트 시티를 배경으로 하는 오픈월드 액션 어드벤처 RPG입니다.",
    release_date: { date: "2020-12-10" },
    metacritic: { score: 86 },
    detailed_description: "사이버펑크 2077은 메가코퍼레이션이 지배하는 거대 도시 나이트 시티를 배경으로 합니다. 당신은 불멸의 열쇠를 쥐고 있는 독특한 사이버웨어를 찾아 떠나는 용병 V를 플레이합니다.",
    genres: [
      { id: 1, description: "RPG" },
      { id: 5, description: "사이버펑크" }
    ],
    developers: ["CD PROJEKT RED"]
  },
  {
    appid: 4,
    name: "Elden Ring",
    header_image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
    short_description: "황금률이 부서지고 여왕 마리카의 자녀들이 반신의 파편을 차지하기 위해 전쟁을 벌이면서 중간 땅은 혼돈에 빠졌습니다.",
    release_date: { date: "2022-02-25" },
    metacritic: { score: 94 },
    detailed_description: "새로운 판타지 액션 RPG. 끝없는 모험이 펼쳐지는 광활한 세계에서 일어서세요, 더럽혀진 자여.",
    genres: [
      { id: 1, description: "RPG" },
      { id: 6, description: "소울라이크" }
    ],
    developers: ["FromSoftware"]
  },
  {
    appid: 5,
    name: "God of War",
    header_image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg",
    short_description: "그리스의 신들로부터 복수를 이룬 크레토스는 이제 북유럽 신화의 땅에서 아들과 함께 새로운 삶을 시작합니다.",
    release_date: { date: "2022-01-14" },
    metacritic: { score: 93 },
    detailed_description: "아들 아트레우스와 함께하는 크레토스의 여정. 북유럽의 신화가 살아 숨쉬는 위험한 세계에서 살아남고 아들을 가르치며 새로운 시작을 맞이하세요.",
    genres: [
      { id: 3, description: "액션" },
      { id: 4, description: "어드벤처" }
    ],
    developers: ["Santa Monica Studio"]
  },
  {
    appid: 6,
    name: "Baldur's Gate 3",
    header_image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg",
    short_description: "마음 앗아가는 자들이 당신의 뇌 속에 기생충을 심었습니다. 이 힘을 거부하고 절대적인 악과 맞서 싸우거나, 부패를 받아들이고 악마가 되어보세요.",
    release_date: { date: "2023-08-03" },
    metacritic: { score: 96 },
    detailed_description: "Dungeons & Dragons를 기반으로 한 차세대 RPG. 선택의 자유, 방대한 스토리, 그리고 당신만의 독특한 파티를 만나보세요.",
    genres: [
      { id: 1, description: "RPG" },
      { id: 7, description: "턴제 전략" }
    ],
    developers: ["Larian Studios"]
  },
  {
    appid: 7,
    name: "Hades",
    header_image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg",
    short_description: "죽음을 이기고 지옥에서 탈출하세요. 매번 새롭게 도전할 수 있는 로그라이크 던전 크롤러입니다.",
    release_date: { date: "2020-09-17" },
    metacritic: { score: 93 },
    detailed_description: "하데스의 아들이 되어 지옥에서 탈출을 시도하세요. 매 도전마다 새로운 조합의 능력을 얻고, 깊이 있는 스토리와 캐릭터들을 만나보세요.",
    genres: [
      { id: 3, description: "액션" },
      { id: 8, description: "로그라이크" }
    ],
    developers: ["Supergiant Games"]
  },
  {
    appid: 8,
    name: "Hollow Knight",
    header_image: "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg",
    short_description: "할로우 네스트의 광활하고 위험한 세계를 탐험하세요. 새로운 능력을 얻고, 강력한 적들과 맞서 싸우세요.",
    release_date: { date: "2017-02-24" },
    metacritic: { score: 90 },
    detailed_description: "전통적인 2D 액션 게임의 정수를 담아낸 할로우 나이트. 벌레들의 왕국을 탐험하고, 새로운 능력을 획득하며, 비밀을 밝혀내세요.",
    genres: [
      { id: 3, description: "액션" },
      { id: 9, description: "메트로배니아" }
    ],
    developers: ["Team Cherry"]
  }
])

const displayedGames = ref(games.value.slice(0, 8))

const openGameDetail = (game) => {
  selectedGame.value = game
}

const closeGameDetail = () => {
  selectedGame.value = null
}

// 카드 애니메이션을 위한 상태 추가
const flippedCards = ref(new Set())

// 컴포넌트 마운트 시 카드 순차 뒤집기 애니메이션 시작
onMounted(() => {
  displayedGames.value.forEach((game, index) => {
    setTimeout(() => {
      flippedCards.value.add(game.appid)
    }, index * 300) // 각 카드는 200ms 간격으로 뒤집힘
  })
})

// 전체 게임 목록에서 랜덤하게 8개를 선택하는 함수
const refreshGames = () => {
  flippedCards.value.clear() // 카드 상태 초기화

  // 게임 목록을 섞고 8개 선택
  const shuffled = [...games.value]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8)

  displayedGames.value = shuffled
  currentPhrase.value = recommendationPhrases[Math.floor(Math.random() * recommendationPhrases.length)]

  // 새로운 카드 애니메이션 시작
  shuffled.forEach((game, index) => {
    setTimeout(() => {
      flippedCards.value.add(game.appid)
    }, index * 300)
  })
}

const recommendationPhrases = [
  "오늘은 이 게임 어때요?",
  "당신을 위한 게임 컬렉션",
  "놓치지 말아야 할 게임",
  "인기 급상승 게임",
  "지금 주목받는 게임"
]

// 현재 표시할 문구
const currentPhrase = ref(recommendationPhrases[Math.floor(Math.random() * recommendationPhrases.length)])


//새로고침 못하게
const isRefreshCooldown = ref(false)
const cooldownEndTime = ref(null)
const remainingTime = ref('')
const showTooltip = ref(false)

const formatTime = (milliseconds) => {
  const minutes = Math.floor(milliseconds / 60000)
  const seconds = Math.floor((milliseconds % 60000) / 1000)
  return `${minutes}분 ${seconds}초`
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
  if (isRefreshCooldown.value) {
    showTooltip.value = true
    setTimeout(() => {
      showTooltip.value = false
    }, 3000)
    return
  }

  refreshGames()
  isRefreshCooldown.value = true
  cooldownEndTime.value = Date.now() + 600000 // 10분
  updateRemainingTime()
}

//유튜브
const youtubeVideos = ref([
  {
    title: `${selectedGame.value?.name} 게임플레이 영상`,
    thumbnail: `/api/placeholder/400/225`, // 실제로는 유튜브 썸네일 URL
    channel: "Game Channel 1"
  },
  {
    title: `${selectedGame.value?.name} 리뷰`,
    thumbnail: `/api/placeholder/400/225`,
    channel: "Game Review"
  },
  {
    title: `${selectedGame.value?.name} 공략`,
    thumbnail: `/api/placeholder/400/225`,
    channel: "Game Tips"
  },
  {
    title: `${selectedGame.value?.name} 하이라이트`,
    thumbnail: `/api/placeholder/400/225`,
    channel: "Game Highlights"
  },
  {
    title: `${selectedGame.value?.name} 신규 업데이트`,
    thumbnail: `/api/placeholder/400/225`,
    channel: "Game News"
  },
  {
    title: `${selectedGame.value?.name} 멀티플레이`,
    thumbnail: `/api/placeholder/400/225`,
    channel: "Multiplayer Gaming"
  },
  {
    title: `${selectedGame.value?.name} 속도런`,
    thumbnail: `/api/placeholder/400/225`,
    channel: "Speedrun Community"
  },
  {
    title: `${selectedGame.value?.name} 비하인드`,
    thumbnail: `/api/placeholder/400/225`,
    channel: "Game Stories"
  }
])
</script>

<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Dynamic Background -->
    <div class="fixed inset-0 w-full h-full">
      <!-- Background Image -->
      <div
          class="absolute inset-0 bg-cover bg-center"
          style="background-image: url('/src/assets/steam-background.svg');"
      ></div>
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/90 to-transparent"></div>
      <!-- Animated Particles -->
      <div class="absolute inset-0">
        <div v-for="n in 50" :key="n"
             class="particle absolute rounded-full bg-white/20"
             :style="{
               left: Math.random() * 100 + '%',
               top: Math.random() * 100 + '%',
               transform: `scale(${Math.random()})`,
               animationDelay: Math.random() * 5 + 's',
               width: Math.random() * 3 + 'px',
               height: Math.random() * 3 + 'px'
             }">
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="relative z-10">
      <!-- Login Section -->
      <div v-if="isLoggedIn" class="fixed inset-0 flex items-center justify-center z-50">
        <div class="text-center px-4">
          <h1 class="text-5xl font-bold text-white tracking-wider mb-8">
            Game Library
          </h1>
          <p class="text-lg text-gray-300 mx-auto max-w-lg mb-8">
            Connect with Steam to discover and explore your game collection in a whole new way
          </p>
          <button
              @click="handleSteamLogin"
              class="px-8 py-4 bg-[#E50914] hover:bg-[#F40612] transition-all duration-300
       rounded text-lg font-medium shadow-lg hover:shadow-red-600/20
       transform hover:scale-105"
          >
            Steam으로 로그인
          </button>
        </div>
      </div>

      <!-- Games Grid -->
      <div v-else class="fixed inset-0 flex flex-col items-center py-8 px-4 overflow-auto">
        <div class="w-full max-w-[1400px] mx-auto">
          <div class="flex items-center justify-between mb-8 relative">
            <div class="flex-grow flex justify-center">
              <h1 class="netflix-sans text-3xl font-bold text-gray-100 tracking-wide">
                {{ currentPhrase }}
              </h1>
            </div>

            <div class="relative">
              <button
                  @click="handleRefresh"
                  @mouseenter="showTooltip = isRefreshCooldown"
                  @mouseleave="showTooltip = false"
                  class="p-2 bg-white/10 rounded-full transition-all duration-300
                  transform hover:scale-105"
                  :class="{'opacity-50 cursor-not-allowed': isRefreshCooldown,
                    'hover:bg-white/20 hover:rotate-180': !isRefreshCooldown}"
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>

              <!-- Tooltip -->
              <div
                  v-if="showTooltip && isRefreshCooldown"
                  class="absolute right-0 mt-2 p-2 bg-black/90 text-white text-sm rounded-lg
                  shadow-lg whitespace-nowrap z-50"
              >
                <div class="relative">
                  <!-- Tooltip arrow -->
                  <div class="absolute -top-2 right-4 w-4 h-4 bg-black/90 transform rotate-45"></div>
                  <!-- Tooltip content -->
                  <div class="relative z-10">
                    {{ remainingTime }} 후 다시 시도해주세요
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div
                v-for="game in displayedGames"
                :key="game.appid"
                class="relative group cursor-pointer"
                @mouseenter="isHovered = game.appid"
                @mouseleave="isHovered = null"
                @click="openGameDetail(game)"
            >
              <!-- Card -->
              <div class="relative preserve-3d transition-transform duration-700"
                   :class="flippedCards.has(game.appid) ? 'rotate-y-0' : 'rotate-y-180'">
                <!-- Front side -->
                <div class="backface-hidden relative overflow-hidden rounded-lg transform transition-all duration-500
                      group-hover:scale-110 group-hover:z-10">
                  <img
                      :src="game.header_image"
                      :alt="game.name"
                      class="w-full aspect-[16/9] object-cover"
                  >

                  <!-- Hover Overlay -->
                  <div
                      class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div class="absolute bottom-0 left-0 right-0 p-4">
                      <h3 class="text-xl font-bold mb-2 text-gray-100">{{ game.name }}</h3>
                      <p class="text-sm text-gray-300 mb-2 line-clamp-2">
                        {{ game.short_description }}
                      </p>
                      <div class="flex justify-between items-center">
                        <div class="flex gap-2">
                          <button class="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                            </svg>
                          </button>
                          <button class="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Back side -->
                <div class="backface-hidden absolute inset-0 rotate-y-180">
                  <div class="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                    <svg class="w-16 h-16 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Game Detail Modal -->
          <div v-if="selectedGame"
               class="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
               @click="closeGameDetail">
          <!-- Modal (이벤트 전파 중지) -->
          <div class="relative w-full max-w-4xl bg-[#181818] rounded-lg shadow-xl max-h-[90vh] overflow-y-auto"
               @click.stop>
            <!-- Close Button -->
            <button
                @click="closeGameDetail"
                class="absolute top-4 right-4 text-gray-400 hover:text-white z-10 p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Game Header -->
            <div class="relative h-96">
              <img
                  :src="selectedGame.header_image"
                  :alt="selectedGame.name"
                  class="w-full h-full object-cover"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent" />
            </div>

            <!-- Game Content -->
            <div class="px-8 pb-8 -mt-20 relative">
              <h2 class="text-4xl font-bold text-white mb-4">{{ selectedGame.name }}</h2>

              <div class="flex gap-4 mb-6">
                <div class="px-4 py-2 bg-white/10 rounded-md">
                  <span class="text-sm text-gray-300">릴리즈: {{ selectedGame.release_date?.date || 'N/A' }}</span>
                </div>
                <div v-if="selectedGame.metacritic" class="px-4 py-2 bg-white/10 rounded-md">
                  <span class="text-sm text-gray-300">메타크리틱: {{ selectedGame.metacritic.score }}</span>
                </div>
              </div>

              <p class="text-gray-300 text-lg mb-6">{{ selectedGame.detailed_description }}</p>

              <div class="grid grid-cols-2 gap-6 mb-12">
                <div>
                  <h3 class="text-lg font-semibold text-white mb-2">장르</h3>
                  <div class="flex flex-wrap gap-2">
              <span
                  v-for="genre in selectedGame.genres"
                  :key="genre.id"
                  class="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300"
              >
                {{ genre.description }}
              </span>
                  </div>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white mb-2">개발사</h3>
                  <p class="text-gray-300">{{ selectedGame.developers?.join(', ') || 'N/A' }}</p>
                </div>
              </div>

              <!-- YouTube Videos Section -->
              <div class="border-t border-white/20 pt-8">
                <h3 class="text-2xl font-semibold text-white mb-6">관련 동영상</h3>
                <div class="grid grid-cols-2 gap-6">
                  <div v-for="(video, index) in youtubeVideos" :key="index"
                       class="relative overflow-hidden rounded-lg group cursor-pointer">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  50% {
    transform: translateY(-100px) scale(1.5);
    opacity: 0.5;
  }
}

.particle {
  animation: float 10s infinite ease-in-out;
}

.preserve-3d {
  transform-style: preserve-3d;
  perspective: 1000px;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Netflix 폰트 적용 */
@font-face {
  font-family: 'Netflix Sans';
  src: url('https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Rg.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Netflix Sans';
  src: url('https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Md.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Netflix Sans';
  src: url('https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Bd.woff2') format('woff2');
  font-weight: bold;
  font-style: normal;
}

.netflix-sans {
  font-family: 'Netflix Sans', Helvetica, Arial, sans-serif;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background: linear-gradient(to bottom, #FFFFFF 0%, #888888 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.aspect-video {
  aspect-ratio: 16 / 9;
}

@tailwind base;
@tailwind components;
@tailwind utilities;
</style>