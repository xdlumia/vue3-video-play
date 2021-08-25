#!/usr/bin/env zsh
###
 # @Author: web.王晓冬
 # @Date: 2021-08-21 22:18:02
 # @LastEditors: web.王晓冬
 # @LastEditTime: 2021-08-25 18:07:51
 # @Description: file content
### 

# 确保脚本抛出遇到的错误
set -e


git add -A
git commit -m 'deploy to the scipt'

git push
