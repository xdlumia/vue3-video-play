/*
 * @Author: web.王晓冬
 * @Date: 2021-08-20 13:52:52
 * @LastEditors: itab.link
 * @LastEditTime: 2023-11-09 15:28:50
 * @Description: file content
*/
<template>
    <div class="d-status" v-show="state.handleType || state.isMultiplesPlay">
        <li class="d-flex-center" v-show="state.handleType == 'volume'">
            <d-icon
                size="18"
                class="d-status-icon"
                :icon="`icon-volume-${state.volume == 0 ? 'mute' : state.volume > 0.5 ? 'up' : 'down'
                }`"
            ></d-icon>
            {{ ~~(state.volume * 100) }}%
        </li>
        <li
            class="d-flex-center"
            v-show="state.handleType == 'playbackRate' || state.isMultiplesPlay"
        >
            <d-icon size="12" icon="icon-play"></d-icon>
            <d-icon size="12" icon="icon-play" style="margin-right:5px"></d-icon>5倍速播放中
        </li>
    </div>
</template>

<script setup lang='ts'>
import DIcon from './d-icon.vue'
const props = defineProps(['state'])

</script>

<style scoped lang='less'>
@import "../style/base.less";
.d-status {
    text-align: center;
    font-size: 14px;
    vertical-align: middle;
    background: rgba(0, 0, 0, 0.8);
    padding: 0 8px;
    height: 30px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.95);

    .d-status-icon {
        width: 24px !important;
        display: inline-block;
        margin-right: 5px;
    }
}
</style>