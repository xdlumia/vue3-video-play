/*
 * @Author: web.王晓冬
 * @Date: 2021-08-19 12:50:35
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-26 09:50:44
 * @Description: file content
 */

// hex转rgb
export const hexToRgba = (hex) => {
    return `${parseInt("0x" + hex.slice(1, 3))},${parseInt(
        "0x" + hex.slice(3, 5)
    )},${parseInt("0x" + hex.slice(5, 7))}`;
}
export const firstUpperCase = (str) => str.charAt(0).toUpperCase() + str.slice(1)
// 电影时间格式化
export const timeFormat = (time) => {
    let hh: any = ~~(time / 3600);
    let mm: any = ~~((time % 3600) / 60);
    let ss: any = ~~(time % 60); //取整
    hh = hh < 10 ? "0" + hh : hh; //个位数补0
    mm = mm < 10 ? "0" + mm : mm; //个位数补0
    ss = ss < 10 ? "0" + ss : ss; //个位数补0
    return `${hh}:${mm}:${ss}`;
}
// 是否是移动端
export const isMobile = !!("ontouchstart" in window)
// 全屏模式
export const toggleFullScreen = (el) => {
    //如果当前是全屏状态，就退出全屏，否则进入全屏状态
    //获取当前的全屏状态
    let documentEL = (document as any)
    let isFullscreen = documentEL.webkitIsFullScreen || documentEL.fullscreen;
    if (!isFullscreen) {
        const inFun =
            el.requestFullscreen || el.webkitRequestFullScreen;
        //让当前播放器进入全屏状态
        inFun.call(el);
    } else {
        const exitFun =
            document.exitFullscreen || documentEL.webkitExitFullScreen;
        //退出全屏状态要使用document
        exitFun.call(documentEL);
    }
    return !isFullscreen

}
// 画中画模式
export const requestPictureInPicture = (el: HTMLElement | Document | Window) => {
    if ((document as any).pictureInPictureElement) {
        (document as any).exitPictureInPicture().catch((error) => {
            console.log(error, "Video failed to leave Picture-in-Picture mode.");
        });

    } else {
        //开启
        (el as any).requestPictureInPicture().catch((error) => {
            console.log(error, "Video failed to enter Picture-in-Picture mode.");
        });
    }
}