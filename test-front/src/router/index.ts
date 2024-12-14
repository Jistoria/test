import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Login from '../pages/Auth/Login.vue';
import NotFound from '../pages/Default/NotFound.vue';
import { useAuthStore } from '../store/authStore';
import PropertyDetails from '../components/PropertyDetails.vue';
import Dashboard from '../pages/Auth/Dashboard.vue';

const routes = [
  { path: '/login', name: 'Login', component: Login, meta: { requiresGuest: true } },
  { path: '/', name: 'Home', component: Home },
  {
    path: '/property/:id',
    name: 'PropertyDetails',
    component: PropertyDetails,
    props: true, 
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }, // Proteger la ruta para usuarios autenticados
  },
  // Ruta catch-all para 404
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ path: '/login' }); 
  } else {
    if (to.meta.requiresGuest && authStore.isAuthenticated) {
      next({path: '/'});
    } else {
      next(); 
    }
  }
});



export default router;
