import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home.vue'
import { userAuthentication } from "../tools/store";


const authorizationGuard = (to:any, from:any, next:any) => {
  
  //! Ojo con sacar esta sentencia de la función, da error debido a que Pinia se instancia despues de router
  const authStore = userAuthentication(); 
    const userAuthenticated = () => authStore.getAuthentication();
    // con el beforeach no funcionaba bien, daba error ya que pinia se inicializaba despues del beforeeach
    if (to.meta.requiresAuth && !userAuthenticated) {
      // Redirigir a la página de inicio de sesión si no está autenticado
      next('/login');
    } else {
      next();
    }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/mainPage',
      name: 'mainPage',
      component: () => import('../views/mainPage.vue'),
      meta: { requiresAuth: true },
      beforeEnter: authorizationGuard
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/userProfile.vue'),
      meta: { requiresAuth: true },
      beforeEnter: authorizationGuard
    },
    {
      path: '/record/dataTable',
      name: 'recordDataTable',
      component: () => import('../views/recordDataTable.vue'),
      meta: { requiresAuth: true },
      beforeEnter: authorizationGuard
    },
    {
      path: '/manual',
      name: 'manual',
      component: () => import('../views/manual.vue'),
      meta: { requiresAuth: true },
      beforeEnter: authorizationGuard
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/calendar.vue'),
      meta: { requiresAuth: true },
      beforeEnter: authorizationGuard
    },
  ]
})

export default router
