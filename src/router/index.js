import Vue from 'vue'
import VueRouter from 'vue-router'
import {auth, firebase} from '../utils/firebase'
import {useAuth} from '@vueuse/firebase'
Vue.use(VueRouter)

const routes = [
  
  {
    path: '/productoTerminado',
    name: 'productoTerminado',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() { return import( '../views/ProductoTerminado.vue')},
    meta: { requiresAuth: true } 
  },
  {
    path: '/',
    name: 'paginaprincipal',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PaginaPrincipal.vue'),
    meta: { requiresAuth: true }    
  },
  {
    path: '/paginaprincipal2',
    name: 'paginaprincipal2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PaginaPrincipal2.vue'),    
  },
  {
    path: '/insumo',
    name: 'insumo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Insumo.vue'),
    meta: { requiresAuth: true } 
  },
  {
  path: '/materiaPrima',
  name: 'materiaPrima',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/MateriaPrima.vue'),    
  meta: { requiresAuth: true } 
  },
  {
  path: '/login',
  name: 'login',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue'),  
  meta: { requiresAuth: false }  
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !(await firebase.getCurrentUser())) {
    next("/Login");
  } else {
    next();
  }
});

export default router
