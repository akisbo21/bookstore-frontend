import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig> {
    // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
    routes: (_routes) => [
        {
            name: 'index',
            path: '/index.html',
            component: () => import('~/pages/index.vue').then(r => r.default || r)
        }
    ],
}