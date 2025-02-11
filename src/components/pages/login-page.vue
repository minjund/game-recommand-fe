<template>
  <div class="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
    <!-- 애니메이션 배경 그라데이션 -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-900 to-black opacity-50" />

    <!-- 플로팅 도형 -->
    <div class="absolute inset-0">
      <div class="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div class="absolute bottom-20 right-20 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
    </div>

    <!-- 메인 콘텐츠 -->
    <div class="relative z-10 text-center px-6">
      <div class="flex items-center justify-center mb-6">
        <Gamepad class="w-12 h-12 text-white mr-3" />
        <h1 class="text-5xl font-bold text-white">DotPickPlay</h1>
      </div>

      <div class="max-w-xl mx-auto space-y-4 mb-8">
        <p class="text-2xl text-white font-medium">
          당신의 게임 취향을 분석해 드립니다.
        </p>
        <p class="text-lg text-gray-300">
          Steam 라이브러리를 분석하여 게임 태그별 선호도를 계산하고,<br>
          당신이 좋아할 만한 새로운 게임을 찾아 드립니다.
        </p>
      </div>

      <button
          @click="handleSteamLogin"
          class="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 mx-auto"
      >
        <span class="font-medium">Steam으로 시작하기</span>
      </button>
    </div>
  </div>
</template>

<script setup>
// import는 더 이상 필요하지 않습니다. main.js에서 전역으로 등록되어 있기 때문입니다.
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/store/auth'

const router = useRouter()
const authStore = useAuthStore()

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
</script>

<style>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.35;
  }
}
</style>