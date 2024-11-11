import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './app/App.vue';
import './assets/styles/main.css';
import router from './router/routes';

const app = createApp(App);
const pinia = createPinia();

app.use(router).use(pinia);

app.config.errorHandler = (err: any) => {
  throw new Error(err.message);
};

app.mount('#root');
