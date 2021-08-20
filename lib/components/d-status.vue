/*
 * @Author: web.王晓冬
 * @Date: 2021-08-20 13:52:52
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-20 20:47:29
 * @Description: file content
*/
<template>
    <div class="d-message" v-show="state.handleType || state.isMultiplesPlay">
        <li class="d-message-info" v-show="state.handleType == 'volume'">
            <d-icon
                size="18"
                class="d-message-icon"
                :icon="`icon-volume-${state.volumeSize == 0 ? 'mute' : state.volumeSize > 50 ? 'up' : 'down'
                }`"
            ></d-icon>
            {{ ~~state.volumeSize }}%
        </li>
        <li
            class="d-message-info"
            v-show="state.handleType == 'playbackRate' || state.isMultiplesPlay"
        >
            <d-icon size="12" icon="icon-play"></d-icon>
            <d-icon size="12" icon="icon-play" style="margin-right:5px"></d-icon>5X速播放中
        </li>
    </div>
</template>

<script setup lang='ts'>
import { computed } from '@vue/reactivity';
import DIcon from './d-icon.vue'
const props = defineProps(['state'])

</script>

<style scoped lang='less'>
@import "../style/transition.less";
.d-message {
    margin-top: 50px;
    text-align: center;
    font-size: 14px;
    vertical-align: middle;
    background: rgba(0, 0, 0, 0.8);
    padding: 4px 8px;
    border-radius: 5px;
    display: inline-block;
    color: rgba(255, 255, 255, 0.95);
    li {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .d-message-icon {
        width: 24px !important;
        display: inline-block;
        margin-right: 5px;
    }
}
</style>