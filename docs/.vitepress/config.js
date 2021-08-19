module.exports = {
    title: "Vue3VideoPlayer",// 网站标题
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
                href: '/img/linktolink.png',//图片放在public文件夹下
            },
        ],
    ],
    // 主题配置
    themeConfig: {
        //   头部导航
        nav: [
            { text: '首页1', link: '/' },
            { text: '关于', link: '/about/' },
        ],
        //   侧边导航
        sidebar: [
            { text: '我的', link: '/mine/' }
        ]
    }
}