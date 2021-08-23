/*
 * @Author: web.王晓冬
 * @Date: 2021-08-23 21:12:57
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-24 07:39:27
 * @Description: file content
*/
<template>
    <div
        ref="refSlider"
        class="d-slider"
        @mousedown.stop="mouseDownHandle"
        :class="{ 'is-vertical': props.vertical }"
    >
        <div class="d-slider__runway">
            <div class="d-slider__bar" :style="sliderBarStyle"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, Ref, computed } from 'vue'
import type { PropType } from 'vue'
type Nullable<T> = null | T
const refSlider: Ref<Nullable<HTMLElement>> = ref(null)
const props = defineProps({
    modelValue: {
        required: true,
        type: [Number],
        default: 0,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    vertical: {
        type: Boolean,
        default: true,
    },
    size: {
        type: String,
        default: '10px',
    }
})
const emits = defineEmits(['update:modelValue',])
let siderLoadSize: any = ref(0)
const sliderBarStyle: any = computed(() => (props.vertical ? `height:${props.modelValue * 100}%` : `width:${props.modelValue * 100}%`)
)
const mouseDownHandle = (ev: Event) => {
    const value = getPosition(ev) //获取当前按下位置
    emits("update:modelValue", value);
    // on(window, 'mousemove', onDragging)
    // on(window, 'touchmove', onDragging)
    // on(window, 'mouseup', onDragEnd)
    // on(window, 'touchend', onDragEnd)
    // siderLoadSize.value = value
}
// import { on, off } from '../utils/dom'
const getPosition = (ev: any) => {
    let refSliderEl = (refSlider.value as HTMLButtonElement)
    let value = 0
    if (props.vertical) {
        let clientHeight = (refSlider.value as HTMLButtonElement).clientHeight
        value = (refSliderEl.getBoundingClientRect().bottom - ev.clientY) / clientHeight
    } else {
        value = (ev.offsetX || ev.layerX) / refSliderEl.clientWidth
    }
    return value < 0 ? 0 : value > 1 ? 1 : value;
}

</script>
<style lang='less' scoped>
.d-slider {
    background: #000;
    .d-slider__runway {
        width: 100%;
        height: v-bind(size);
        background-color: #333333;
        position: relative;
        cursor: pointer;
        vertical-align: middle;
        .d-slider__bar {
            position: relative;
            height: 100%;
            background-color: #409eff;
            &::before {
                display: block;
                content: "";
                position: absolute;
                right: -6px;
                top: 50%;
                width: 12px;
                height: 12px;
                transform: translateY(-50%) scale(1, 1);
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 0 0 5px #409eff;
            }
        }
    }
    &.is-vertical {
        height: 100%;
        width: 26px;
        .d-slider__runway {
            position: relative;
            height: 100%;
            width: v-bind(size);
            margin: 0 6px;
            .d-slider__bar {
                position: absolute;
                bottom: 0;
                width: 100%;
                &::before {
                    top: -6px;
                    left: 50%;
                    width: 12px;
                    height: 12px;
                    transform: translateX(-50%) scale(1, 1);
                }
            }
        }
    }
}
</style>