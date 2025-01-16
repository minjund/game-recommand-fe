import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

// persistedstate 플러그인 추가
pinia.use(piniaPluginPersistedstate)

// Pinia와 Router를 앱에 연결
app.use(pinia)
app.use(router)

app.mount('#app')