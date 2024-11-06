import router from './router';
import { createApp } from 'vue';
import App from './app/App.vue';
import './styles.scss';

const app = createApp(App);

app.use(router);

app.config.errorHandler = (err) => {
  console.log(err);
}

app.mount('#root');
