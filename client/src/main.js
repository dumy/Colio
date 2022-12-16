import { createApp } from 'vue'
import { createPinia } from 'pinia'

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import BootstrapVue3 from 'bootstrap-vue-3'

//template components
import BaseBlock from "@/components/BaseBlock.vue";
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import App from './App.vue'
import router from './router'

// import './assets/main.css'

const app = createApp(App)

//register global components
app.component("BaseBlock", BaseBlock);

app.use(createPinia())
app.use(router)
app.use(BootstrapVue3)

app.mount('#app')
