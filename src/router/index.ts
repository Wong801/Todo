import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: false,
      title: 'Home'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      auth: false,
      title: 'About'
    }
  },
  {
    path: '/todo',
    name: 'Todo',
    component: () => import('../views/Todo.vue'),
    meta: {
      auth: false,
      title: 'Simple Todo App'
    }
  },
  {
    path: '/hope',
    name: 'Hope',
    component: () => import('../views/Hope.vue'),
    meta: {
      auth: true,
      title: 'Wall Of Hopes'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
