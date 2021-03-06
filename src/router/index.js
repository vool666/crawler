import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Crawler from '../views/Crawler.vue'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path:'/crawler',
    name: 'Crawler',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Crawler.vue')
    }

  }
]

const router = new VueRouter({
  routes
})

export default router
