/*
 * @Author: web.王晓冬
 * @Date: 2021-08-20 11:00:41
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-25 16:41:51
 * @Description: file content
*/
<template>
    <div class="d-loading" :style="loadingStyle" v-show="loadType">
        <div>
            <!-- 初始化加载 -->
            <span v-if="loadType == 'init'">
                <d-icon class="rotating" icon="icon-loading" :size="50"></d-icon>
                <p>{{ text }}</p>
            </span>
            <!-- 缓冲中 -->
            <span v-show="loadType == 'buffer'">
                <d-icon class="rotating" icon="icon-loading" :size="50"></d-icon>
                <p>正在缓冲...</p>
            </span>
            <!-- 播放结束 -->
            <span v-show="loadType == 'ended'">
                <p @click="replayHandle" class="d-flex-x d-pointer">
                    <d-icon icon="icon-replay" :size="24" style="mrgin-right:5px"></d-icon>重新播放
                </p>
            </span>
            <!-- 播放错误 -->
            <span v-show="loadType == 'error' || loadType == 'stalled'">
                <p @click="replayHandle" class="d-flex-x d-pointer">
                    <d-icon icon="icon-replay" :size="24" style="mrgin-right:5px"></d-icon>请求错误
                </p>
            </span>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { getCurrentInstance, reactive, computed, } from 'vue'

import DIcon from './d-icon.vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
    loadType: String,
    text: {
        type: String,
        default: '',
    },
})
const replayHandle = () => {
    proxy.$parent.play()
}
const loadingStyle = computed(() => {
    let style = "background: rgba(0, 0, 0, .1);z-index:1"
    if (props.loadType == 'init') {
        style = "background: rgba(0, 0, 0, 1);;z-index:3"
    }
    return style
})
</script>

<style scoped lang='less'>
.d-flex-x {
    display: flex;
    justify-content: center;
    align-items: center;
}
.d-pointer {
    cursor: pointer;
}
@import "../style/animate.less";
@import "../style/transition.less";
.d-loading {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2;
    color: #efefef;
    text-align: center;
    font-size: 13px;
}
// .d-play-btn {
//     width: 90px;
//     height: 90px;
//     color: #fff;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background-color: rgba(0, 0, 0, 0.7);
//     border-radius: 50%;
// }
</style>
