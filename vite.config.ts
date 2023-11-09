/*
 * @Author: web.王晓冬
 * @Date: 2021-08-19 10:25:40
 * @LastEditors: itab.link
 * @LastEditTime: 2023-11-09 15:27:03
 * @Description: file content
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3005,
    open: true,
    // 反向代理
    proxy: {
      "/api": {
        target: "http://xxx.xxxxx.xxx/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    terserOptions: {
      compress: {
        drop_debugger: true,
      },
    },
    lib: {
      entry: "./lib/index.js",
      name: "index",
      fileName: "index",
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
    // hmr: { overlay: false }
  },
});
