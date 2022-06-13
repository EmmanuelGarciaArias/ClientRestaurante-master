import Vue from 'vue'
import VueRouter from 'vue-router'

import {auth} from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/inicio',
    name: 'Inicio',
    component: () => import('../views/Inicio.vue'),
    meta: { requiresAuth: true}
  },
  {
    path: '/Mesero',
    name: 'Mesero',
    component: () => import('../views/Mesero.vue'),
    meta: { requiresAuth: true}
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('../views/Menu.vue'),
    meta: { requiresAuth: true}
  },
  {
    path: '/ordenes',
    name: 'Ordenes',
    component: () => import('../views/Ordenes.vue'),
    meta: { requiresAuth: true}
  },
    {
    path: '/Consulta',
    name: 'Consulta',
    component: () => import('../views/Consulta.vue'),
    meta: { requiresAuth: true}
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('../views/Registro.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){

    const usuario = auth.currentUser

    console.log('usuario desde router', usuario)

    if(!usuario){
      next({path: '/login'})
    }else {
      next()
    }
    
  }else{
    next()
  }
})

export default router
