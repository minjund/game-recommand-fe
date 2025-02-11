import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/components/pages/game-library.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/components/pages/login-page.vue')
    },
    {
        path: '/auth/steam/return',
        name: 'steam-return',
        component: () => import('@/components/pages/steam-return.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

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