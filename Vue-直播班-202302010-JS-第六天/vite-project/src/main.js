import { createApp } from 'vue'
import { createPinia } from 'pinia'
// Vue loading
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
// axios
import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/all.scss'

import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(createPinia())
app.use(router) // 對應 this.$route、this.$router

// Vue loading
app.component("VueLoading", Loading) // 全域元件
// axios
app.use(VueAxios, axios) // 套件

app.mount('#app')
