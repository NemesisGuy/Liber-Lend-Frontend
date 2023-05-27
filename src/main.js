import './assets/main.css'
import './assets/styles.css'
import { createApp } from 'vue'
import App from './App.vue'


//import App from './App.vue';
import router from './router';

//createApp(App).mount('#app')s



//Vue.config.productionTip = false;

createApp(App).use(router).mount('#app');