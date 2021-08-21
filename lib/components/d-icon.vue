/*
 * @Author: web.王晓冬
 * @Date: 2020-10-27 10:31:35
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-20 21:46:19
 * @Description: file content
*/
<template>
  <svg class="d-icon" :style="iconSize" aria-hidden="true">
    <use :xlink:href="`#${icon}`" />
  </svg>
</template>
<script>
import '../utils/iconfont.js'
export default {
  name: "d-icon"
}
</script>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: String,
  size: [Number, String],
})
const emits = defineEmits(['play'])

const iconSize = computed(() => {
  let size = /^\d+$/.test(props.size) ? props.size + "px" : props.size
  return { width: size, height: size };
})

</script>
<style lang = "less" scoped >
.d-icon {
  cursor: pointer;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
