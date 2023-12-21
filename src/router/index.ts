import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1',
  },
  {
    path: '/auth/microsoft/callback',
    name: 'microsoft-auth-callback',
    component: () => import('@/components/MicrosoftAuthHandler.vue'),
  },
  {
    name:'login',
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/tabs/',
    component: TabsPage,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      },
    ]
  }
]



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // Vérifiez si la route nécessite une authentification
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // Si aucun token d'accès n'est trouvé, redirigez l'utilisateur vers la page de connexion
      next({ name: 'login' });
    } else {
      // Si l'utilisateur est connecté, continuez vers la route demandée
      next();
    }
  } else {
    // Si la route ne nécessite pas d'authentification, laissez simplement l'utilisateur passer
    next();
  }
});

export default router
