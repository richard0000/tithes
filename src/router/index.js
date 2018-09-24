import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Tithes from '@/components/Tithes'
import Tithe from '@/components/Tithe'
import NewTithe from '@/components/NewTithe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/tithes',
      name: 'Tithes',
      component: Tithes
    },
    {
      path: '/tithes/:id',
      name: 'Tithe',
      component: Tithe
    },
    {
      path: '/new',
      name: 'NewTithe',
      component: NewTithe
    }
  ]
})
