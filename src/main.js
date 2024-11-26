import { createApp } from 'vue';
import App from './App.vue';
import store from './js/store';
import './css/styles.css'

createApp(App).use(store).mount('#app');      