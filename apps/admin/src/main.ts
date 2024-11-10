import router from './router/routes';
import { createApp } from 'vue';
import App from './app/App.vue';
import './assets/styles/main.css';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

app.use(router).use(pinia);

app.config.errorHandler = (err: any) => {
  throw new Error(err.message);
};

app.mount('#root');
