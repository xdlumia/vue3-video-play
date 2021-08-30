/*
 * @Author: web.王晓冬
 * @Date: 2021-08-20 09:34:45
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-28 07:15:07
 * @Description: file content
*/
<template>
    <div class="d-switch" :class="{ 'is-checked': checked }">
        <input
            class="d-switch__input"
            ref="input"
            type="checkbox"
            :checked="checked"
            @change="handleInput"
            :true-value="trueValue"
            :false-value="falseValue"
        />
        <span class="d-switch_action"></span>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'
const props = defineProps({
    modelValue: {  //绑定值，必须等于active-value或inactive-value，默认为Boolean类型
        type: [Number, String, Boolean],
    },
    width: { //switch 的宽度（像素）
        type: String,
        default: '40px',
    },
    trueValue: { //switch 打开时的值
        type: [Number, String, Boolean],
        default: true,
    },
    falseValue: { //	switch 关闭时的值
        type: [Number, String, Boolean],
        default: true,
    },
    activeColor: { //switch 打开时的背景色
        type: [String],
        default: '#409EFF',
    }
})
const emits = defineEmits(['update:modelValue', 'change'])

const input = ref(null)
const checked = computed(() => {
    return props.modelValue === props.trueValue
})
const handleInput = (): void => {
    nextTick(() => {
        const val = input.value.checked
        emits("update:modelValue", val);
        emits("change", val);
    })


};
</script>
<style lang='less' scoped>
.d-switch {
    position: relative;
    height: 18px;
    transition: background 0.2s;
    width: v-bind(width);
    background: rgb(117, 117, 117);
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    .d-switch__input {
        position: relative;
        z-index: 1;
        margin: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    .d-switch_action {
        position: absolute;
        transition: 0.2s;
        left: 2px;
        top: 2px;
        z-index: 0;
        height: 14px;
        width: 14px;
        background: #fff;
        border-radius: 50%;
    }
    &.is-checked {
        background: v-bind(activeColor);
        .d-switch_action {
            left: 100%;
            background: #fff;
            margin-left: -18px;
        }
    }
}
</style>