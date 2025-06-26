#!/usr/bin/env zsh
###
 # @Author: web.王晓冬
 # @Date: 2021-08-21 22:18:02
 # @LastEditors: web.王晓冬
 # @LastEditTime: 2021-09-01 15:27:27
 # @Description: file content
### 

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
pnpm run docs:build

# 进入生成的文件夹
cd ../docs/.vitepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy to the gh-pages'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:xdlumia/vue3-video-play.git gh-pages
# git push -f git@github.com:xdlumia/vue3-video-play.git master:gh-pages
# git push -f git@github.com:xdlumia/xdlumia.github.io.git master:gh-pages
# git push -f https://github.com/xdlumia/vue3-video-play.git master:gh-pages
git push -f https://github.com/xdlumia/xdlumia.github.io.git master:gh-pages
