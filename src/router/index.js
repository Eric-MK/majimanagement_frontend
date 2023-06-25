import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: () => import('../views/LoginView.vue')    
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: () => import('../views/HomeView.vue')    
    },
    {
      path: '/adminpage',
      name: 'adminpage',
      component: () => import('../views/AdminView.vue')    
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')    
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('../views/ContactView.vue')    
    },
    {
      path: '/tips',
      name: 'tips',
      component: () => import('../views/TipsView.vue')    
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LogoutView.vue')    
    },


  ]
})

export default router
