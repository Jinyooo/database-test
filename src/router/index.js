import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: function () {
      return import(/* webpackChunkName: "signup" */ '../components/SignupPage.vue')
    }
  },
  {
    path: '/main',
    name: 'main',
    component: function () {
      return import(/* webpackChunkName: "main" */ '../components/MainPage.vue')
    }
  },
  {
    path: '/login',
    name: 'login',
    component: function () {
      return import(/* webpackChunkName: "login" */ '../components/LoginPage.vue')
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
