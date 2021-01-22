import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/vue-sub',
    name: 'Home',
    component: Home
  },
  {
    path: '/vue-sub/about',
    name: 'About',
    // component: () => import('../views/About.vue')
    component: About
  }
]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

export default routes
