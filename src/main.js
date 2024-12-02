import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@/assets/styles/main.scss';
import { createPinia } from 'pinia';
import router from './router';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');