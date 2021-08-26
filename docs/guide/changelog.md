<!--
 * @Author: web.王晓冬
 * @Date: 2021-08-24 14:50:14
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-25 20:50:52
 * @Description: file content
-->
<style scoped>

</style>
# 更新日志

### 1.2.51
*2021-08-25*

- 新增: `mirrorChange` `loopChange` `lightOffChange` 事件
- 新增: 倍速播放默认配置,增加`0.5`倍速播放
- 新增: 资源播放失败错误状态
- 新增: 非循环播放状态下播放结束增加重新播放按钮
- 新增: 增加空格快捷键 `播放/暂停` 的操作
- 修复: 关灯模式不能覆盖菜单栏区域
- 优化: svg图标更换成字体图标,总体减少8KB
- 优化: 如果音量为0关闭静音按钮 音量设置为5


### 1.2.4
*2021-08-24*

- Refactors 重构进度条拖动和音量拖动功能，精简代码
- Chore 处理鼠标移动到进度条上距左或者距右时间显示显示不完整的问题
### 1.2.3
*2021-08-23*

- Chore 暂停状态下视频中央增加播放按钮

### 1.2.2 
*2021-08-23*

- Add `props` 新增 `speed` 属性，开启或者关闭快进快退，默认true ([#2](https://github.com/xdlumia/vue3-video-play/issues/2))
- Fix 方向键快进快退的时候会移动页面的问题
- Chore 双击视频全屏/关闭全屏
- Chore 修改`设置`按钮鼠标`hover`效果

