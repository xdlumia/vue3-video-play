/*
 * @Author: web.王晓冬
 * @Date: 2021-08-19 12:50:35
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-19 17:33:53
 * @Description: file content
 */

// hex转rgb
export const hexToRgba = (hex) => {
    return `${parseInt("0x" + hex.slice(1, 3))},${parseInt(
        "0x" + hex.slice(3, 5)
    )},${parseInt("0x" + hex.slice(5, 7))}`;
}
// 时间格式化
export const timeFormat = (time) => {
    let hh = ~~(time / 3600);
    let mm = ~~((time % 3600) / 60);
    let ss = ~~(time % 60); //取整
    hh = hh < 10 ? "0" + hh : hh; //个位数补0
    mm = mm < 10 ? "0" + mm : mm; //个位数补0
    ss = ss < 10 ? "0" + ss : ss; //个位数补0
    return `${hh}:${mm}:${ss}`;
}
// 全屏模式
export const toggleFullScreen = (el) => {
    //如果当前是全屏状态，就退出全屏，否则进入全屏状态
    //获取当前的全屏状态
    let isFullscreen = document.webkitIsFullScreen || document.fullscreen;
    if (!isFullscreen) {
        const inFun =
            el.requestFullscreen || myvideo.webkitRequestFullScreen;
        //让当前播放器进入全屏状态
        inFun.call(el);
    } else {
        const exitFun =
            document.exitFullscreen || document.webkitExitFullScreen;
        //退出全屏状态要使用document
        exitFun.call(document);
    }

}
// 画中画模式
export const requestPictureInPicture = (el) => {
    if (!document.pictureInPictureElement) {
        //开启
        el.requestPictureInPicture().catch((error) => {
            console.log(error, "Video failed to enter Picture-in-Picture mode.");
        });
    } else {
        document.exitPictureInPicture().catch((error) => {
            console.log(error, "Video failed to leave Picture-in-Picture mode.");
        });
    }
}