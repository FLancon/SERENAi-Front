import Aura from '@primevue/themes/aura';
export default defineNuxtConfig({
    compatibilityDate: '2024-12-17',
    modules: ['@primevue/nuxt-module', '@nuxtjs/tailwindcss', '@nuxtjs/supabase'],

    runtimeConfig: {
        public: {
            appName: 'Reels'
        }
    },
    supabase: {
        redirect: false,
        redirectOptions: {
            login: '/login',
            callback: '/confirm'
        }
    },
    css: ['@/assets/styles.scss', 'primeicons/primeicons.css', '@/assets/tailwind.css'],
    primevue: {
        options: {
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.app-dark'
                }
            }
        }
    }
});