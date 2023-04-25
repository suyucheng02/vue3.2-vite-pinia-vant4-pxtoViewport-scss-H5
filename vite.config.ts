import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { createVitePlugins } from './build/plugins/index'
import { wrapperEnv } from './build/utils'
import { createBuild } from './build/index'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const root = process.cwd() // 当前工作目录
  const isBuild = command === 'build' // 是否是构建 serve
  const env = loadEnv(mode, root) // 加载env环境
  const viteEnv = wrapperEnv(env) // 读取环境变量配置

  return {
    plugins: createVitePlugins(viteEnv, isBuild),
    build: createBuild(viteEnv),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false, // 避免出现: build时的 @charset 必须在第一行的警告
          // scss全局变量添加
          additionalData: `
              @import "@/assets/style/mixin.scss";
              @import "@/assets/style/variables.scss";
            `
        }
      }
    },
    server: {
      host: true,
      proxy: {
        '/test': {
          target: 'http://127.0.0.1:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
