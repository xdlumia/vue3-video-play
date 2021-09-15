/*
 * @Author: web.王晓冬
 * @Date: 2021-08-21 19:20:46
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-09-15 23:18:12
 * @Description: file content
*/
<template>
    <div style="text-align:center;margin-top:20px">
        <div class="video-main">
            <component v-bind="options" v-if="dynamicComponent" :is="dynamicComponent"></component>
            <!-- <vue3-video-play /> -->
        </div>
        <h1>Vue3-video-play</h1>
        <p>适用于 Vue3 的 hls.js 播放器组件 | 并且支持MP4/WebM/Ogg格式</p>
        <p>配置强大，UI还算好看</p>

        <div class="index-link">
            <a class="d-button primary" href="/vue3-video-play/guide/install">快速上手</a>
            <a
                class="d-button"
                target="_blank"
                href="https://github.com/xdlumia/vue3-video-play/"
            >view github</a>
        </div>
        <div>
            <a href="https://www.npmjs.com/package/vue3-video-play" target="_blank">
                <img
                    src="https://img.shields.io/npm/v/vue3-video-play.svg?style=flat-square"
                    alt="Downloads"
                />
            </a>
            <a href="https://www.npmjs.com/package/vue3-video-play" target="_blank">
                <img
                    src="https://img.shields.io/npm/dt/vue3-video-play.svg?style=flat-square"
                    alt="Version"
                />
            </a>
            <a href="https://github.com/xdlumia/vue3-video-play/stargazers" target="_blank">
                <img
                    src="https://img.shields.io/github/stars/xdlumia/vue3-video-play.svg?style=flat-square"
                />
            </a>
            <a href="https://github.com/xdlumia/vue3-video-play/issues" target="_blank">
                <img
                    src="https://img.shields.io/github/issues/xdlumia/vue3-video-play.svg?style=flat-square"
                />
            </a>
            <a href="https://github.com/xdlumia/vue3-video-play/network" target="_blank">
                <img
                    src="https://img.shields.io/github/forks/xdlumia/vue3-video-play.svg?style=flat-square"
                />
            </a>
            <a href="https://github.com/xdlumia/vue3-video-play" target="_blank">
                <img
                    src="https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square"
                />
            </a>
            <a href="https://github.com/xdlumia/vue3-video-play" target="_blank">
                <img
                    src="https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square"
                />
            </a>
            <p>
                <a href="https://www.npmjs.com/package/vue3-video-play" target="_blank">
                    <img
                        src="https://nodei.co/npm/vue3-video-play.png?downloads=true&downloadRank=true&stars=true"
                    />
                </a>
            </p>
        </div>
        <hr />
        <p class="index-footer">
            <a href="https://dreamwq.com/" target="_blank">博客</a>
            <a href="https://dreamwq.com/bing" target="_blank">每日必应壁纸</a>
            <a href="https://go.dreamwq.com/" target="_blank">lingo新标签页</a>
        </p>
        <hr />
        <p>MIT Licensed | Copyright © 2021-present xdlumia</p>
    </div>
</template>

<script setup>
import { shallowRef, onMounted, reactive } from 'vue'
let dynamicComponent = shallowRef(null)
const options = {
    autoPlay: true,
    src: "https://go.dreamwq.com/videos/IronMan.mp4" //视频源
}
onMounted(() => {
    import('../../lib/index.js').then(module => {
        dynamicComponent.value = module.default
    })
    // import('vue3-video-play')
})
</script>

<style>
.video-main {
    display: flex;
    justify-content: center;
}
.index-link {
    margin: 20px 0;
    text-align: center;
}
.d-button {
    display: inline-block;
    padding: 0 24px;
    line-height: 52px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 5px;
    color: var(--c-brand);
    border: 2px solid var(--c-brand);
    margin: 0 10px;
}
.d-button.primary {
    background: var(--c-brand);
    color: #fff;
}
.index-footer a {
    font-size: 14px;
    margin: 0 10px;
    color: #666;
}
hr {
    height: 0;
    border-color: #ddd;
    border-top: 1px;
}
</style>