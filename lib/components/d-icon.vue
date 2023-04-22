<template>
  <i class="d-icon iconfont" :class="icon" :style="iconSize"></i>
</template>
<script>
export default {
  name: 'd-icon'
}
</script>
<script setup>
const props = withDefaults(
  defineProps <
    {
      icon: string,
      size: [Number, String]
    } >
    {
      icon: {
        type: String,
        default: ''
      },
      size: {
        type: [Number, String],
        default: () => []
      }
    }
)

const iconSize = computed(() => {
  const size = /^\d+$/.test(props.size) ? props.size + 'px' : props.size
  return { fontSize: size }
})
</script>
<style lang="less" scoped>
@import '../style/iconfont.css';
.d-icon {
  display: inline-block;
  cursor: pointer;
  overflow: hidden;
}
</style>
