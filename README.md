


🎉 基于 vite4 + Vue3.2 + TypeScript + pinia + sass + vantUI + viewport 适配 + axios 封装 的基础模版

## Node 版本要求

本示例 Node.js v18.0.0

## 项目安装/启动

```js
yarn install // 安装依赖
yarn dev // 开发
yarn build // 打包
yarn preview  // 本地预览打包的项目
```

# <span id="top">目录</span>

- [√ 配置多环境变量](#env)
- [√ Pinia 状态管理](#pinia)
- [√ 自动导入](#unplugin)
- [√ VantUI 组件按需加载](#vant)
- [√ viewport 适配方案](#viewport)
- [√ 适配苹果底部安全距离](#phonex)
- [√ Eslint + Prettier 统一开发规范](#prettier)
- [√ husky + lint-staged 提交校验](#husky)
- [√ 项目打包优化](#build)


## <span id="env">✅ 配置多环境变量 </span>

- 文档：https://cn.vitejs.dev/guide/env-and-mode.html

* 在生产环境，会把 import.meta.env 的值转换成对应真正的值

1. 添加环境变量文件，每个文件写入配置，**定义 env 环境变量前面必须加 VITE\_**

- `.env.development`

```js
# must start with VITE_
VITE_ENV = 'development'
VITE_OUTPUT_DIR = 'dev'
```

- `.env.production`

```js
# must start with VITE_
VITE_ENV = 'production'
VITE_OUTPUT_DIR = 'dist'
```

- `.env.test`

```js
# must start with VITE_
VITE_ENV = 'test'
VITE_OUTPUT_DIR = 'test'
```

2. 修改 scripts 命令

- `--mode` 用来识别我们的环境

```js
"dev": "vite --mode development",
"test": "vite --mode test",
"prod": "vite --mode production",
```

3. 在项目中访问

```js
console.log(import.meta.env)
```

4. typescript 智能提示

- 修改 `src/env.d.ts` 文件，如果没有创建一个

```js
/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_ENV: string; // 环境
  readonly VITE_OUTPUT_DIR: string; // 打包目录
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

### 动态导入环境配置

```ts
// config/env.development.ts
// 本地环境配置
export default {
  env: 'development',
  mock: true,
  title: '开发',
  baseUrl: 'http://localhost:9018', // 项目地址
  baseApi: 'https://test.xxx.com/api', // 本地api请求地址,注意：如果你使用了代理，请设置成'/'
  APPID: 'wx9790364d20b47d95',
  APPSECRET: 'xxx',
  $cdn: 'https://imgs.solui.cn'
}
```

```ts
// config/index.ts
export interface IConfig {
  env: string // 开发环境
  mock?: string // mock数据
  title: string // 项目title
  baseUrl?: string // 项目地址
  baseApi?: string // api请求地址
  APPID?: string // 公众号appId  一般放在服务器端
  APPSECRET?: string // 公众号appScript 一般放在服务器端
  $cdn: string // cdn公共资源路径
}
const envMap = {}
const globalModules = import.meta.globEager('./*.ts')
Object.entries(globalModules).forEach(([key, value]) => {
  // key.match(/\.\/env\.(\S*)\.ts/)
  const name = key.replace(/\.\/env\.(.*)\.ts$/, '$1')
  envMap[name] = value
})

// 根据环境引入不同配置
export const config = envMap[import.meta.env.VITE_ENV].default
console.log('根据环境引入不同配置', config)
```

[▲ 回顶部](#top)



## <span id="pinia">✅ Pinia 状态管理 </span>

- 初始化项目集成了 pinia ,我们这里只做配置

* 文档：https://pinia.vuejs.org/
* 参考资料：https://juejin.cn/post/7049196967770980389
* Pinia 的特点：
  - 完整的 typescript 的支持；
  - 足够轻量，压缩后的体积只有 1.6kb;
  - 去除 mutations，只有 state，getters，actions（这是我最喜欢的一个特点）；
  - actions 支持同步和异步；
  - 没有模块嵌套，只有 store 的概念，store 之间可以自由使用，更好的代码分割；
  - 无需手动添加 store，store 一旦创建便会自动添加；

### 安装依赖

```js
pnpm i pinia
```

### 创建 Store

- 新建 src/store 目录并在其下面创建 index.ts，导出 store

```js
// src/store/index.ts

import { createPinia } from 'pinia'

const store = createPinia()

export default store
```

### 在 main.ts 中引入并使用

```ts
// src/main.ts

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

const app = createApp(App)
app.use(store)
```

### 定义 State

- 在 src/store 下面创建一个 user.ts

```ts
//src/store/user.ts

import { defineStore } from 'pinia'
import { useAppStore } from './app'

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      name: '张三',
      age: 18
    }
  },
  getters: {
    fullName: (state) => {
      return state.name + '丰'
    }
  },
  actions: {
    updateState(data: any) {
      this.$state = data
      this.updateAppConfig()
    },
    updateAppConfig() {
      const appStore = useAppStore()
      appStore.setData('app-update')
    }
  }
})
```

```ts
//src/store/app.ts
import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => {
    return {
      config: 'app'
    }
  },
  actions: {
    setData(data: any) {
      console.log(data)
      this.config = data
    }
  }
})
```

### 获取/更新 State

```vue
<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
const userStore = useUserStore()
const appStore = useAppStore()
console.log(appStore.config)
console.log(userStore)
console.log(userStore.name)
const name = computed(() => userStore.name)
const { age } = storeToRefs(userStore)

const updateUserState = () => {
  const { name, age } = userStore.$state
  userStore.updateState({
    name: name + 1,
    age: age + 1
  })
}
</script>
<template>
  <div>姓名：{{ name }}</div>
  <div>年龄：{{ age }}</div>
  <div>计算的名字：{{ userStore.fullName }}</div>
  <div>app的config: {{ appStore.config }}</div>
  <button @click="updateUserState">更新数据</button>
</template>

<style lang="scss" scoped></style>
```

### 数据持久化

- 文档：https://github.com/prazdevs/pinia-plugin-persistedstate

* 插件 pinia-plugin-persistedstate 可以辅助实现数据持久化功能。
* 数据默认存在 sessionStorage 里，并且会以 store 的 id 作为 key。

* 安装依赖

```ts
pnpm i pinia-plugin-persistedstate
```

- 引用插件

```ts
// src/store/index.ts

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const store = createPinia()
store.use(piniaPluginPersistedstate)
export default store
```

- 在对应的 store 里开启 persist 即可

```ts
export const useUserStore = defineStore({
  id: 'user',

  state: () => {
    return {
      name: '张三'
    }
  },

  // 开启数据缓存
  persist: {
    key: 'user',
    storage: sessionStorage, // 数据存储位置，默认为 localStorage
    paths: ['name'], // 用于部分持久化状态的点表示法路径数组，表示不会持久化任何状态（默认为并保留整个状态）
    overwrite: true
  }
})
```

[▲ 回顶部](#top)


## <span id="unplugin">✅ unplugin-xxx 自动导入 </span>
* 参考资料：https://juejin.cn/post/7012446423367024676
* 自定义组件自动引入 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components#readme)
* vue3等插件 hooks 自动引入 [unplugin-auto-import/vite](https://github.com/antfu/unplugin-auto-import)
* message, notification 等引入样式自动引入 [vite-plugin-style-import](https://github.com/vbenjs/vite-plugin-style-import)
* eslint插件 [vue-global-api](https://github.com/antfu/vue-global-api)
### unplugin-vue-components
* 自动导入流行库组件和自定义组件
1. 安装依赖
```js
pnpm i -D unplugin-vue-components
```
2. 修改 vite.config.ts
```js
Components({
  // 指定组件位置，默认是src/components
  dirs: ['src/components'],
  // ui库解析器
  // resolvers: [ElementPlusResolver()],
  extensions: ['vue', 'tsx'],
  // 配置文件生成位置
  dts: 'src/components.d.ts',
  // 搜索子目录
  deep: true,
  // 允许子目录作为组件的命名空间前缀。
  directoryAsNamespace: false
  // include:[]
}),
```
### unplugin-auto-import
* 自动导入vue3相关api
1. 安装依赖
```js
pnpm i -D unplugin-auto-import
```
2. 配置 vite.config.ts
```js
AutoImport({
  include: [
    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
    /\.vue$/,
    /\.vue\?vue/, // .vue
    /\.md$/ // .md
  ],
  imports: ['vue', 'vue-router', '@vueuse/core'],
  // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
  dts: 'src/auto-import.d.ts',
  // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
  // 生成全局声明文件，给eslint用
  eslintrc: {
    enabled: true, // Default `false`
    filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
    globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
  }
})
```
3. 配置 eslintrc
```js
// .eslintrc.js
module.exports = { 
  /* ... */
  extends: [
    // ...
    './.eslintrc-auto-import.json',
  ],
}
```
### vue-global-api 
* 在页面没有引入的情况下，使用unplugin-auto-import/vite来自动引入hooks，在项目中肯定会报错的，这时候需要在eslintrc.js中的extends引入vue-global-api，这个插件是vue3hooks的,其他自己找找，找不到的话可以手动配置一下globals
1. 安装依赖
```js
pnpm i -D vue-global-api
```
2. 配置 eslintrc
```js
// .eslintrc.js
module.exports = {
  extends: [
    'vue-global-api'
  ]
};
```
## <span id="vant">✅ VantUI 组件按需加载 </span>

- 文档：https://vant-contrib.gitee.io/vant/v3/#/zh-CN/quickstart

### 1. 安装依赖

```js
pnpm add vant@3
pnpm add vite-plugin-style-import -D
```

### 2. 按需引入配置

- vite.config.ts

```js
import vue from '@vitejs/plugin-vue'
import styleImport, { VantResolve } from 'vite-plugin-style-import'

export default {
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()]
    })
  ]
}
```

- plugins/vant.ts

```ts
import { App as VM } from 'vue'
import { Button, Cell, CellGroup, Icon, Tabbar, TabbarItem, Image as VanImage } from 'vant'

const plugins = [Button, Icon, Cell, CellGroup, Tabbar, TabbarItem, VanImage]

export const vantPlugins = {
  install: function (vm: VM) {
    plugins.forEach((item) => {
      vm.component(item.name, item)
    })
  }
}
```

- main.ts

```ts
// 全局引入按需引入UI库 vant
import { vantPlugins } from './plugins/vant'
app.use(vantPlugins)
```

### 3. 在 <script setup> 中可以直接使用 Vant 组件，不需要进行组件注册。

- 如果使用这种方式，就不需要注册上面的 `plugins/vant.ts` 了

```js
<script setup>
  import { Button } from 'vant';
</script>

<template>
  <Button />
</template>
```

### 4. 在 JSX 和 TSX 中可以直接使用 Vant 组件，不需要进行组件注册。

- 如果使用这种方式，就不需要注册上面的 `plugins/vant.ts` 了

```ts
import { Button } from 'vant'

export default {
  render() {
    return <Button />
  }
}
```

[▲ 回顶部](#top)

## <span id="viewport">✅ viewport 适配方案 </span>

- 看到 `lib-flexible` 仓库说，由于 viewport 单位得到众多浏览器的兼容，lib-flexible 这个过渡方案已经可以放弃使用，建议大家开始使用 viewport 来替代此方，所以就踩坑用用 viewport
- 参考文档：https://blog.csdn.net/weixin_46429258/article/details/115537383
- vant 官方文档有说怎么配，先按着官方文档配一下
- postcss-px-to-viewport 文档： https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md

### 1. 安装依赖

```js
pnpm i -D postcss-px-to-viewport autoprefixer
```

### 2. 添加 .postcssrc.js

```js
module.exports = {
  plugins: {
    // 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
    autoprefixer: {
      overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
    },
    'postcss-px-to-viewport': {
      unitToConvert: 'px', // 要转化的单位
      viewportWidth: 375, // UI设计稿的宽度
      unitPrecision: 6, // 转换后的精度，即小数点位数
      propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
      fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
      selectorBlackList: ['wrap'], // 指定不转换为视窗单位的类名，
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
      landscape: false // 是否处理横屏情况
    }
  }
}
```

[▲ 回顶部](#top)

## <span id="phonex">✅ 适配苹果底部安全距离 </span>

- index.html 的 meta 指定了 viewport-fit=cover

- [vant 中自带底部安全距离参数](https://vant-contrib.gitee.io/vant/v3/#/zh-CN/advanced-usage#di-bu-an-quan-qu-gua-pei)

```js
<!-- 在 head 标签中添加 meta 标签，并设置 viewport-fit=cover 值 -->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
/>
<!-- 开启顶部安全区适配 -->
<van-nav-bar safe-area-inset-top />

<!-- 开启底部安全区适配 -->
<van-number-keyboard safe-area-inset-bottom />
```

如果不用 vant 中的适配，也可以自己写，我在 scss 中写了通用样式

```scss
.fixIphonex {
  padding-bottom: $safe-bottom !important;
  &::after {
    content: '';
    position: fixed;
    bottom: 0 !important;
    left: 0;
    height: calc(#{$safe-bottom} + 1px);
    width: 100%;
    background: #ffffff;
  }
}
```

[▲ 回顶部](#top)


## <span id="prettier">✅ Eslint + Prettier 统一开发规范 </span>

- 初始化项目集成了 eslint + prettier，我们这里只做配置
- .eslintrc.js

```js
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  env: {
    'vue/setup-compiler-macros': true
  },
  rules: {
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
```

- .prettier.js

```js
module.exports = {
  // 定制格式化要求
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json'
      }
    }
  ],
  printWidth: 100, // 一行最多 100 字符
  tabWidth: 2, // 使用 4 个空格缩进
  semi: false, // 行尾需要有分号
  singleQuote: true, // 使用单引号而不是双引号
  useTabs: false, // 用制表符而不是空格缩进行
  quoteProps: 'as-needed', // 仅在需要时在对象属性两边添加引号
  jsxSingleQuote: false, // 在 JSX 中使用单引号而不是双引号
  trailingComma: 'none', // 末尾不需要逗号
  bracketSpacing: true, // 大括号内的首尾需要空格
  bracketSameLine: false, // 将多行 HTML（HTML、JSX、Vue、Angular）元素反尖括号需要换行
  arrowParens: 'always', // 箭头函数，只有一个参数的时候，也需要括号 avoid
  rangeStart: 0, // 每个文件格式化的范围是开头-结束
  rangeEnd: Infinity, // 每个文件格式化的范围是文件的全部内容
  requirePragma: false, // 不需要写文件开头的 @prettier
  insertPragma: false, // 不需要自动在文件开头插入 @prettier
  proseWrap: 'preserve', // 使用默认的折行标准 always
  htmlWhitespaceSensitivity: 'css', // 根据显示样式决定 html 要不要折行
  vueIndentScriptAndStyle: false, //（默认值）对于 .vue 文件，不缩进 <script> 和 <style> 里的内容
  endOfLine: 'lf', // 换行符使用 lf 在Linux和macOS以及git存储库内部通用\n
  embeddedLanguageFormatting: 'auto' //（默认值）允许自动格式化内嵌的代码块
}
```

[▲ 回顶部](#top)

## <span id="husky">✅ husky + lint-staged 提交校验 </span>

### 1. 安装依赖

```js
pnpm i -D husky lint-staged
```

### 2. 添加脚本命令

```js
npm set-script prepare "husky install"  // 在 package.json/scripts 中添加 "prepare": "husky install" 命令， 这个命令只在linux/uinx系统有效，win系统可以直接在scripts中添加命令
npm run prepare  //  初始化husky,将 git hooks 钩子交由,husky执行， 会在根目录创建 .husky 文件夹
npx husky add .husky/pre-commit "npx lint-staged" // pre-commit 执行 npx lint-staged 指令
```

### 3. 创建 .lintstagedrc.json

```json
{
  "**/*.{js,ts,tsx,jsx,vue,scss,css}": [
    "prettier --write \"src/**/*.ts\" \"src/**/*.vue\"",
    "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix"
  ]
}
```

[▲ 回顶部](#top)

## <span id="build">✅ 项目打包优化 </span>
* 项目打包优化主要是把vite.config.ts中的配置提取到了专门做打包配置的文件夹
* build 文件夹目录
```js
- build
- vite vite环境相关配置
- | - plugin 插件相关配置
- | - | - autocomponents 自动导入组件
- | - | - autoImport 自动导入 api
- | - | - compress 压缩打包
- | - | - mock mock 服务
- | - | - styleImport 样式自动导入
- | - | - index 插件配置入口
- | - build.ts 构建配置
- | - proxy.ts 代理配置
- utils 工具函数
```
