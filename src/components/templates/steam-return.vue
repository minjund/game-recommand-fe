<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-white">처리중...</div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { API_BASE_URL } from '@/constants';

const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  try {
    console.log(JSON.stringify(Object.fromEntries(new URLSearchParams(window.location.search))))

    // Steam에서 반환된 openid 파라미터들을 서버로 전송하여 검증
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(new URLSearchParams(window.location.search)))
    })

    if (response.ok) {
      const data = await response.json()
      console.log('Steam auth data:', data)
      authStore.setSteamId(data.steamId)

      await router.push('/')
    } else {
      await router.push('/login')
    }
  } catch (error) {
    console.error('Steam auth error:', error)
    router.push('/login')
  }
})
</script>