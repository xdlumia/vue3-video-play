/*
 * @Author: web.王晓冬
 * @Date: 2020-10-27 10:31:35
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-19 13:59:29
 * @Description: file content
*/
<template>
  <svg class="d-icon" :style="iconSize" aria-hidden="true">
    <use :xlink:href="`#${icon}`" />
  </svg>
</template>

<script>
export default {
  name: "d-icon",

  props: {
    icon: String,
    size: [Number, String],
  },
  methods: {

  },
  computed: {
    iconSize() {
      let size = /^\d+$/.test(this.size) ? this.size + "px" : this.size;
      return { width: size, height: size };
    },
  },
};
</script>
<style lang="less" scoped>
.d-icon {
  cursor: pointer;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
