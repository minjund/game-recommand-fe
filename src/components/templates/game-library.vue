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

const router = useRouter()
const authStore = useAuthStore()

const getRandomPhrase = () => {
  const phrases = [
    "오늘은 이 게임 어때요?",
    "당신을 위한 게임 컬렉션",
    "놓치지 말아야 할 게임",
    "인기 급상승 게임",
    "지금 주목받는 게임"
  ]
  return phrases[Math.floor(Math.random() * phrases.length)]
}

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
// 그 다음 state 정의
const isHovered = ref(null)
const selectedGame = ref(null)
const displayedGames = ref([])
const flippedCards = ref(new Set())
const currentPhrase = ref(getRandomPhrase())

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
      flippedCards.value.add(game.appid)
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
    // const response = await fetch(`/api/steam/games/${authStore.steamId}`)
    // games.value = await response.json()
    displayedGames.value = games.value.slice(0, 8)
    // // 카드 플립 애니메이션
    displayedGames.value.forEach((game, index) => {
      setTimeout(() => {
        flippedCards.value.add(game.appid)
      }, index * 300)
    })
  } catch (error) {
    console.error('Failed to fetch games:', error)
  }
})
</script>