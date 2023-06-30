import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/app/style.css'
import App from '@/App.vue'
import router from '@/app/router';

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app');