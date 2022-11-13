const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  // 本來影片是說 GUI 更改公開路徑 /dist 保存後會出現這個資料夾，但在 create 時候就已經有這個設定檔
  // 所以我在這手動加入 publicPath: '/dist/'
  // 並再 npm eun build，就能更改 dist 下 index.html 內的路徑(本來路徑是 /js/****，npm eun build 之後 會變成 /dist/js/*** */)
  // 這樣 根目錄 在 dist 下 就能直接 GO LIVE 啟動網頁，不用另外把 dist 資料夾 放到 VSCODE 後才 GO LIVE
  publicPath: '/dist/',
  transpileDependencies: true,
  // 解決 在配置完 ESlint 后，要求代码格式规范的同时，也规定了组件的名称格式，要写成 “XXXName”的格式，不能是单个单词。
  // 所以除了改名，另一种解决方法是在 vue.config.js 文件中加一行
  lintOnSave: false,
});
