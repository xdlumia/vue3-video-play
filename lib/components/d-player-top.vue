/*
 * @Author: web.王晓冬
 * @Date: 2021-08-19 16:59:13
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-28 07:14:57
 * @Description: file content
*/
<template>
    <div class="d-player-top">
        <p class="top-title">{{ title || '' }}</p>
        <p class="top-title">{{ currTime }}</p>
    </div>
</template>

<script  setup>
import { onUnmounted, reactive, ref } from 'vue'


Date.prototype.format = function (fmt) {
    let o = {
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds()
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
const props = defineProps({
    title: {
        default: ''
    }
})
let currTime = ref('00:00:00')
currTime.value = new Date().format("hh:mm:ss");
let timeout = null
timeout = setInterval(() => {
    currTime.value = new Date().format("hh:mm:ss");

}, 1000)

onUnmounted(() => {
    clearInterval(timeout)
})
</script>

<style scoped lang='less'>
.d-player-top {
    position: absolute;
    font-size: 16px;
    left: 0px;
    top: 0;
    right: 0px;
    color: #fff;
    display: flex;
    padding: 0 20px;
    height: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), transparent);
    justify-content: space-between;
}
</style>