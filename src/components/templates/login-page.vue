<template>
  <div class="min-h-screen relative overflow-hidden">
    <background />

    <div class="relative z-10">
      <div class="fixed inset-0 flex items-center justify-center z-50">
        <div class="text-center px-4">
          <title-text class="text-5xl mb-8">
            Game Library
          </title-text>
          <description-text class="text-lg max-w-lg mb-8 mx-auto">
            Connect with Steam to discover and explore your game collection in a whole new way
          </description-text>
          <steam-login-button @click="handleSteamLogin" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'
import Background from '@/components/organisms/background.vue'
import TitleText from '@/components/atoms/text/title-text.vue'
import DescriptionText from '@/components/atoms/text/description-text.vue'
import SteamLoginButton from '@/components/atoms/button/login-button.vue'

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
