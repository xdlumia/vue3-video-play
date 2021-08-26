/*
 * @Author: web.王晓冬
 * @Date: 2021-08-23 21:17:54
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-26 14:03:35
 * @Description: file content
 */
export const on = function (
    element: Element | HTMLElement | Document | Window,
    event: string,
    handler: EventListenerOrEventListenerObject,
    useCapture = false,
): void {
    if (element && event && handler) {
        element.addEventListener(event, handler, useCapture)
    }
}
/* istanbul ignore next */
export const off = function (
    element: Element | HTMLElement | Document | Window,
    event: string,
    handler: EventListenerOrEventListenerObject,
    useCapture = false,
): void {
    if (element && event && handler) {
        element.removeEventListener(event, handler, useCapture)
    }
}
