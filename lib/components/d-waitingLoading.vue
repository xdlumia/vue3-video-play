/*
 * @Author: web.王晓冬
 * @Date: 2021-08-20 11:00:41
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-22 20:12:08
 * @Description: file content
*/
<template>
    <div class="d-loading">
        <div>
            <d-icon class="rotating" icon="icon-loading" :size="50"></d-icon>
            <p>{{ text }}</p>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { reactive, toRefs } from 'vue'
import DIcon from './d-icon.vue'
const props = defineProps({
    text: {
        type: String,
        default: '',
    },
})

</script>

<style scoped lang='less'>
@import "../style/animate.less";
.d-loading {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 50px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 3;
    color: #efefef;
    text-align: center;
    font-size: 12px;
}
</style>
