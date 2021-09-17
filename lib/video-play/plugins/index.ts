/*
 * @Author: web.王晓冬
 * @Date: 2021-08-25 11:19:35
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-09-02 16:03:36
 * @Description: file content
 */
import type { PropType } from 'vue'
export const videoEmits = [
    'loadstart',
    'play',
    'pause',
    'playing',
    'seeking',
    'seeked',
    'waiting',
    'durationchange',
    'progress',
    'canplay',
    'timeupdate',
    'ended',
    'error',
    'stalled',

]
export const defineProps = {
    width: { type: String, default: '800px' },
    height: { type: String, default: '450px' },
    color: { type: String, default: '#409eff' },
    src: { required: true, type: String, default: '' }, //视频源
    title: { type: String, default: '' }, //视频名称
    type: { type: String, default: 'video/mp4' }, //视频类型
    poster: { type: String, default: '' },//封面
    webFullScreen: { type: Boolean, default: false },//网页全屏
    speed: { type: Boolean, default: true },//是否支持快进快退 //移动端不支持
    currentTime: { type: Number, default: 0 }, //当前播放时间
    playsinline: { type: Boolean, default: false },//ios端 点击播放是否全屏
    muted: { type: Boolean, default: false }, //静音
    speedRate: { type: Array, default: () => ["2.0", "1.5", "1.25", "1.0", "0.75", "0.5",] }, //播放倍速
    autoPlay: { type: Boolean, default: false }, //自动播放
    loop: { type: Boolean, default: false }, //循环播放
    mirror: { type: Boolean, default: false }, //镜像画面
    ligthOff: { type: Boolean, default: false },  //关灯模式
    volume: { type: [String, Number], default: 0.3 }, //默认音量大小
    control: { type: Boolean, default: true }, //是否显示控制器
    controlBtns: {
        type: Array as PropType<Array<string>>,
        default: ['audioTrack', 'quality', 'speedRate', 'volume', 'setting', 'pip', 'pageFullScreen', 'fullScreen']
    }, //是否显示控制器
    preload: { type: String, default: 'auto' }, //预加载 
}