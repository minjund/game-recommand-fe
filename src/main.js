// main.js에 전역 메타 태그 설정 추가하기

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import {createHead} from '@unhead/vue'
import router from './router'
import App from './App.vue'
import * as LucideIcons from 'lucide-vue-next'

const app = createApp(App)
const pinia = createPinia()
const head = createHead()

// persistedstate 플러그인 추가
pinia.use(piniaPluginPersistedstate)

// 전역 메타 설정
head.addHeadObjs({
    title: 'dotpickplay - 스팀 게임 추천 서비스',
    titleTemplate: '%s | dotpickplay',
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '스팀 게임 추천 알고리즘을 통해 개인 맞춤형 게임을 찾아주는 dotpickplay입니다.' },
        { name: 'keywords', content: '스팀 게임 추천, 게임 찾기, 게임 알고리즘, 맞춤형 게임 추천, dotpickplay' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'dotpickplay' },
        { property: 'og:title', content: 'dotpickplay - 스팀 게임 추천 서비스' },
        { property: 'og:description', content: '스팀 게임 추천 알고리즘을 통해 개인 맞춤형 게임을 찾아주는 서비스입니다.' },
        { property: 'og:image', content: 'https://dotpickplay.com/images/logo.png' },
        { property: 'og:url', content: 'https://dotpickplay.com' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'dotpickplay - 스팀 게임 추천 서비스' },
        { name: 'twitter:description', content: '스팀 게임 추천 알고리즘을 통해 개인 맞춤형 게임을 찾아주는 서비스입니다.' },
        { name: 'twitter:image', content: 'https://dotpickplay.com/images/logo.png' },
        { name: 'robots', content: 'index, follow' },
        { hid: 'canonical', rel: 'canonical', href: 'https://dotpickplay.com' }
    ],
})

// Pinia, Router, Head를 앱에 연결
app.use(pinia)
app.use(router)
app.use(head)

// Lucide 아이콘들을 전역 컴포넌트로 등록
for (const [key, component] of Object.entries(LucideIcons)) {
    app.component(key, component)
}

app.mount('#app')