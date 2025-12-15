import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import Cart from '../views/Cart.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Checkout from '../views/Checkout.vue'
import Profile from '../views/Profile.vue'






import dashboard from '../views/adminDashboard.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/products', component: Products },
  { path: '/Cart', component: Cart },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/checkout', component: Checkout },
  { path: '/profile', component: Profile },







  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (!token && to.path !== '/login' && to.path !== '/register' && to.path !== '/' && to.path !== '/dashboard' && to.path !== '/products' && to.path !== '/Cart' && to.path !== '/about' && to.path !== '/contact') {


    return next('/login')
  }

  if (token && (to.path === '/login' || to.path === '/register')) {
    return next('/')
  }

  next()
})

export default router
