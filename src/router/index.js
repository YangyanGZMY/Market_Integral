import Vue from 'vue'
import Router from 'vue-router'
import framework from '@/views/framework/framework'
import home from '@/views/home/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/ui',
      name: 'framework',
      component: framework,
      children: [
        {
          path: '/ui/home',
          name: 'Home',
          component: home
        }
      ]
    }
    // ,
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
