//import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import { pinia } from './tools/store';

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(PrimeVue)

app.mount('#app')
