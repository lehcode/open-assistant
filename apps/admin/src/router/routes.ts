import 'vue-router';
import { createRouter, createWebHistory, RouteMeta } from 'vue-router';
import AboutView from '../app/views/AboutView.vue';
import HomeView from '../app/views/HomeView.vue';
import LoginView from '../app/views/LoginView.vue';

declare module 'vue-router' {
  interface RouteMeta {
    isAdmin?: boolean;
    protected: boolean
  }
}

export const routes = [
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
    component: LoginView,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    component: () => import('../app/pages/DashboardPage.vue'),
    meta: <RouteMeta>{ protected: true },
    children: [],
  },
  {
    path: '/app-config',
    name: 'app-config',
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    component: () => import('../app/pages/AppConfigPage.vue'),
    meta: <RouteMeta>{ protected: true },
    children: [],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  strict: true,
  routes
});

export { };

export default router;
