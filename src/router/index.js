import { createRouter, createWebHistory } from 'vue-router'
import LeaderboardView from '../views/home/LeaderboardView.vue'
import MarketView from '../views/home/MarketView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'leaderboard',
      component: LeaderboardView,
    },
    {
      path: '/market',
      name: 'market',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: MarketView,
    },
  ],
})

export default router
