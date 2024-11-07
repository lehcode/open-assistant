import router from './router/index';
import { createApp } from 'vue';
import App from './app/App.vue';
import './assets/styles/main.css';

const app = createApp(App);

app.use(router);

app.config.errorHandler = (err) => {
  console.log(err);
}

app.mount('#root');
