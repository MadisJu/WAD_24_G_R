import { createApp } from 'vue';
import App from './App.vue';
import store from './js/store';
import router from './js/router';
import './css/styles.css'

createApp(App).use(store).use(router).mount('#app');      