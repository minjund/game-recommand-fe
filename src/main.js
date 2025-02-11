import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import App from './App.vue'
import * as LucideIcons from 'lucide-vue-next'

const app = createApp(App)
const pinia = createPinia()

// persistedstate 플러그인 추가
pinia.use(piniaPluginPersistedstate)

// Pinia와 Router를 앱에 연결
app.use(pinia)
app.use(router)
// Lucide 아이콘들을 전역 컴포넌트로 등록
for (const [key, component] of Object.entries(LucideIcons)) {
    app.component(key, component)
}
app.mount('#app')