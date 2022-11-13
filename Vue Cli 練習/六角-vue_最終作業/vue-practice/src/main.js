import { createApp } from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

// vue3-loading-overlay -> 讀取 轉圈效果
// Import component
import Loading from 'vue3-loading-overlay';
// Import stylesheet
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
// 全域註冊 vue3-loading-overlay
app.component('Loading', Loading);
app.mount('#app');
