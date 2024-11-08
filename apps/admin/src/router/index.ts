import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../app/views/HomeView.vue';
import AboutView from '../app/views/AboutView.vue';
import LoginPage from '../app/pages/LoginPage.vue';
import { AuthService } from '@open-assistant/services';
import 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  strict: true,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../app/pages/DashboardPage.vue'),
      meta: { protected: true },
      children: [],
    },
    {
      path: '/app-config',
      name: 'app-config',
      component: () => import('../app/pages/AppConfigPage.vue'),
      meta: { protected: true },
      children: [],
    },
  ],
});

export {};

declare module 'vue-router' {
  interface RouteMeta {
    // is optional
    isAdmin?: boolean;
    // must be declared by every route
    // protected: boolean
  }
}

const auth = new AuthService();

router.beforeEach(async (to) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.protected && !auth.isLoggedIn()) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: '/login',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  }

  return true;
});

export default router;
