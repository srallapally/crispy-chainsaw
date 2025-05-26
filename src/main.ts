import { createApp } from 'vue'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import App from './App.vue'
import router from './router'
import './style.scss'

const app = createApp(App)
app.use(router)
app.mount('#app')