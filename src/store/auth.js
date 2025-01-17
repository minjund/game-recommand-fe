// src/store/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
        steamId: null,
        user: null
    }),

    actions: {
        setSteamId(id) {
            this.steamId = id
            this.isLoggedIn = true

        },

        setUser(userData) {
            this.user = userData
        }
    },

    persist: true
})