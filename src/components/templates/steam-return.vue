<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-white">처리중...</div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const authStore = useAuthStore()

// onMounted(async () => {
//   try {
//     // Steam에서 반환된 openid 파라미터들을 서버로 전송하여 검증
//     // const response = await fetch('/api/auth/steam/verify', {
//     //   method: 'POST',
//     //   headers: {
//     //     'Content-Type': 'application/json'
//     //   },
//     //   body: JSON.stringify(Object.fromEntries(new URLSearchParams(window.location.search)))
//     // })
//
//     if (true) {
//       console.log('Steam auth success')
//       // const data = await response.json()
//       // authStore.setSteamId(data.steamId)
//       await router.push('/')
//     } else {
//       await router.push('/login')
//     }
//   } catch (error) {
//     console.error('Steam auth error:', error)
//     router.push('/login')
//   }
// })

onMounted(async () => {
  try {
    // 임시로 Steam 인증이 성공했다고 가정
    // 실제로는 서버에서 검증 후 steamId를 받아야 함
    const dummySteamId = '12345678901234567'

    // 인증 상태 설정
    authStore.setSteamId(dummySteamId)

    // 홈으로 리다이렉트
    await router.push('/')
  } catch (error) {
    console.error('Steam auth error:', error)
    await router.push('/login')
  }
})
</script>