// import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './app/App.vue';
import AuthService from './app/services/auth.service';
import pinia from './app/stores/base.store';
import { useUserStore } from './app/stores/user.store';
import './assets/styles/main.css';
import router from './router/routes';

const app = createApp(App);
const authService = new AuthService();

app.use(router).use(pinia);

router.beforeEach(async (to) => {
  const user = useUserStore(pinia);
  
  if (to.meta.protected && !user.authenticated) {
    // this route requires authorization, checks if logged in
    // if not, redirect to login page.
    return {
      path: '/login',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  }

  return;
});

app.config.errorHandler = (err: any) => {
  throw new Error(err.message);
};

app.mount('#root');
