import videoPlay from './video-play/main.vue'

function install(app) {
  app.component(videoPlay.name, videoPlay)
}
videoPlay.install = install
export { videoPlay, install }
export default videoPlay
