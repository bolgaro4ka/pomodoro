import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import StartView from '@/views/StartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: StartView,
    },
    {
      path: '/bolgaro4ka',
      name: 'main',
      component: MainView,
    },
  ],
})

export default router
