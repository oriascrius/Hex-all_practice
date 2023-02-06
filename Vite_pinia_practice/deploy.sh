#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -B main
git add -A
git commit -m 'deploy'



# 以下兩種擇一開啟

# 部屬在 main 上
# if you are deploying to https://oriascrius.github.io
# git push -f git@github.com:oriascrius/oriascrius.github.io.git main

# 部屬在 gh-pages 上
# if you are deploying to https://oriascrius.github.io/vue-deploy
# git push -f git@github.com:oriascrius/vue-deploy.git main:gh-pages

# 上方會報錯，以下是可用方式 
# 根據組員的分享，把 deploy.sh 裡的 git 路徑改成上面的，
# 再到任何一個 .vue 檔加入一段 code ，只要有更動檔案就好，
# 儲存後再執行一次 sh deploy.sh 就有出現 gh-pages 分支了。
# 以下網址 -> 可到 Github 專案中，右上角 code 的 Https 網址，就可以出現分支
git push -f https://github.com/oriascrius/vue-deploy.git main:gh-pages

cd -