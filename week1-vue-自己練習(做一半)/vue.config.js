const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
});

// 這裡就是更改根路徑，github pages 可以直接連到正確網址
// 三元判斷 -> production 就是 npm run build
// Hex-all_practice -> 資料夾路徑也是 git 儲存庫名稱
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/week1-vue" : "/",
};
