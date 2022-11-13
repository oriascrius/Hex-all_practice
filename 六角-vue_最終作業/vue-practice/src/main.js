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
// import .methods/filters 中 currency function ( 千分號 )
// import { currency } from './methods/filters';
import { currency, date } from './methods/filters';
import $httpMessageState from './methods/pushMessageState';
// bootstrap-icons
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);
// 可以放入全域設定的 集合
app.config.globalProperties.$filters = {
// .methods/filters 中的 千分號
  currency,
  date,
};
// 此函式的用途是整合 Ajax 的錯誤事件，統一整理發送給予 Toast 處理
app.config.globalProperties.$httpMessageState = $httpMessageState;
app.use(VueAxios, axios);
app.use(router);
// 全域註冊 vue3-loading-overlay
app.component('Loading', Loading);
app.mount('#app');
