/*
 * @Author: web.王晓冬
 * @Date: 2020-10-29 10:08:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-11-03 16:33:21
 * @Description: Table
 */
import VPlay from './main';

/* istanbul ignore next */
VPlay.install = function(Vue) {
  Vue.component(VPlay.name, VPlay);
};

export default VPlay;
