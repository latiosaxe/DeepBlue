import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/sections/Home'


Vue.use(Router)
//Vue.component('Subscribe', require('@/components/parts/Subscribe'));


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
