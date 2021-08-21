/*
 * @Author: web.王晓冬
 * @Date: 2021-08-19 18:56:59
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-21 14:57:41
 * @Description: file content
 */
module.exports = {
    title: "Vue3VideoPlayer", // 网站标题
    description: 'Vue3VideoPlayer 基于vue3编写的视频播放器', //网站描述
    base: '/', //  部署时的路径 默认 /  可以使用二级地址 /base/
    // lang: 'en-US', //语言
    repo: 'vuejs/vitepress',
    head: [
        // 改变title的图标
        [
            'link',
            {
                rel: 'icon',
                href: '/img/linktolink.png', //图片放在public文件夹下
            },
        ],
    ],
    markdown: {
        // options for markdown-it-anchor
        anchor: {
            permalink: false
        },

        // options for markdown-it-toc
        toc: {
            includeLevel: [1, 2]
        },

        config: (md) => {
            const {
                demoBlockPlugin
            } = require('vitepress-theme-demoblock')
            md.use(demoBlockPlugin)
        }
    },
    // 主题配置
    themeConfig: {
        //   头部导航
        nav: [{
            text: '首页',
            link: '/'
        }],
        //   侧边导航
        sidebar: [{
            text: '我的',
            link: '/mine/'
        }]
    }
}