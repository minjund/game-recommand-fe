import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/components/templates/game-library.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/components/templates/login-page.vue')
    },
    {
        path: '/auth/steam/return',
        name: 'steam-return',
        component: () => import('@/components/templates/steam-return.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    // Steam 인증 리턴 페이지는 항상 허용
    if (to.name === 'steam-return') {
        next()
        return
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!authStore.isLoggedIn) {
            next({ name: 'login' })
        } else {
            next()
        }
    } else {
        if (to.name === 'login' && authStore.isLoggedIn) {
            next({ name: 'home' })
        } else {
            next()
        }
    }
})

export default router