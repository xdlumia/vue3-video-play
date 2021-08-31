import{a as e,c as l,e as i,f as r}from"./app.c186bf63.js";const a='{"title":"更新日志","description":"","frontmatter":{},"headers":[{"level":3,"title":"1.3.0-rc.3","slug":"_1-3-0-rc-3"},{"level":3,"title":"1.2.52","slug":"_1-2-52"},{"level":3,"title":"1.2.51","slug":"_1-2-51"},{"level":3,"title":"1.2.4","slug":"_1-2-4"},{"level":3,"title":"1.2.3","slug":"_1-2-3"},{"level":3,"title":"1.2.2","slug":"_1-2-2"}],"relativePath":"guide/changelog.md","lastUpdated":1630394997851}',d={},h=r('<h1 id="更新日志"><a class="header-anchor" href="#更新日志" aria-hidden="true">#</a> 更新日志</h1><h3 id="_1-3-0-rc-3"><a class="header-anchor" href="#_1-3-0-rc-3" aria-hidden="true">#</a> 1.3.0-rc.3</h3><p><em>2021-08-31</em></p><ul><li>新增: 支持hls视频/直播</li><li>新增: 新增画质切换，需视频支持</li><li>新增: 新增画音视切换，需视频支持</li><li>新增: props参数增加<code>currentTime</code>属性，可跳转到固定时间播放</li><li>新增: props参数增加<code>type</code>属性，视频格式</li></ul><h3 id="_1-2-52"><a class="header-anchor" href="#_1-2-52" aria-hidden="true">#</a> 1.2.52</h3><p><em>2021-08-27</em></p><ul><li>优化: 优化重新播放按钮样式偏移问题</li></ul><h3 id="_1-2-51"><a class="header-anchor" href="#_1-2-51" aria-hidden="true">#</a> 1.2.51</h3><p><em>2021-08-25</em></p><ul><li>新增: <code>mirrorChange</code> <code>loopChange</code> <code>lightOffChange</code> 事件</li><li>新增: 倍速播放默认配置,增加<code>0.5</code>倍速播放</li><li>新增: 资源播放失败错误状态</li><li>新增: 非循环播放状态下播放结束增加重新播放按钮</li><li>新增: 增加空格快捷键 <code>播放/暂停</code> 的操作</li><li>修复: 关灯模式不能覆盖菜单栏区域</li><li>优化: svg图标更换成字体图标,总体减少8KB</li><li>优化: 如果音量为0关闭静音按钮 音量设置为5</li></ul><h3 id="_1-2-4"><a class="header-anchor" href="#_1-2-4" aria-hidden="true">#</a> 1.2.4</h3><p><em>2021-08-24</em></p><ul><li>Refactors 重构进度条拖动和音量拖动功能，精简代码</li><li>Chore 处理鼠标移动到进度条上距左或者距右时间显示显示不完整的问题</li></ul><h3 id="_1-2-3"><a class="header-anchor" href="#_1-2-3" aria-hidden="true">#</a> 1.2.3</h3><p><em>2021-08-23</em></p><ul><li>Chore 暂停状态下视频中央增加播放按钮</li></ul><h3 id="_1-2-2"><a class="header-anchor" href="#_1-2-2" aria-hidden="true">#</a> 1.2.2</h3><p><em>2021-08-23</em></p><ul><li>Add <code>props</code> 新增 <code>speed</code> 属性，开启或者关闭快进快退，默认true (<a href="https://github.com/xdlumia/vue3-video-play/issues/2" target="_blank" rel="noopener noreferrer">#2</a>)</li><li>Fix 方向键快进快退的时候会移动页面的问题</li><li>Chore 双击视频全屏/关闭全屏</li><li>Chore 修改<code>设置</code>按钮鼠标<code>hover</code>效果</li></ul>',19);d.render=function(r,a,d,o,t,c){return e(),l("div",null,[i("\n * @Author: web.王晓冬\n * @Date: 2021-08-24 14:50:14\n * @LastEditors: web.王晓冬\n * @LastEditTime: 2021-08-31 15:23:56\n * @Description: file content\n"),h])};export{a as __pageData,d as default};