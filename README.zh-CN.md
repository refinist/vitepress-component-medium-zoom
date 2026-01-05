# vitepress-component-medium-zoom

[English](./README.md) | 中文

VitePress 图片预览功能组件

## 特性

- 🖼️ 点击图片放大/缩小
- 🔄 路由变化时自动重新初始化
- ⚙️ 可自定义选择器和配置选项
- 🎨 内置 z-index 样式，确保遮罩层正确显示

## 安装

```bash
npm install vitepress-component-medium-zoom
# 或
pnpm add vitepress-component-medium-zoom
# 或
yarn add vitepress-component-medium-zoom
```

## 使用

参考 [VitePress Layout Slots](https://vitepress.dev/guide/extending-default-theme#layout-slots)，在布局中直接引入组件。

创建或更新 `.vitepress/theme/index.js`：

```js
import DefaultTheme from 'vitepress/theme';
import MyLayout from './MyLayout.vue';

export default {
  extends: DefaultTheme,
  // override the Layout with a wrapper component that
  // injects the slots
  Layout: MyLayout
};
```

创建或更新 `.vitepress/theme/MyLayout.vue`：

```vue
<script setup>
import DefaultTheme from 'vitepress/theme';
import { MediumZoom } from 'vitepress-component-medium-zoom';
import 'vitepress-component-medium-zoom/style.css';

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>...</Layout>
  <!-- 在这里使用 -->
  <MediumZoom />
</template>
```

**注意：** 该组件不会渲染任何可见内容，因此可以将其放置在布局的任何位置。它会自动处理所有匹配选择器的图片缩放功能。

⚠️ **重要：** 需要把下面这个配置添加到 `.vitepress/config.ts` 中，否则构建会报错：

```js
vite: {
  ssr: {
    noExternal: ['vitepress-component-medium-zoom'];
  }
}
```

## Props

### selector

- **类型**: `string | HTMLElement | HTMLElement[] | NodeList`
- **默认值**: `'.vp-doc img'`

自定义图片选择器。遵循 [medium-zoom](https://github.com/francoischalifour/medium-zoom#selectors) 的选择器格式。

**示例：**

```vue
<MediumZoom selector=".vp-doc img" />
```

### options

- **类型**: `ZoomOptions`
- **默认值**: `{}`

medium-zoom 的配置选项。查看 [medium-zoom 文档](https://github.com/francoischalifour/medium-zoom#options) 了解可用的配置选项。

**示例：**

```vue
<MediumZoom
  selector=".vp-doc img"
  :options="{
    background: 'rgba(0, 0, 0, 0.8)',
    margin: 24
  }"
/>
```

如果某些图像不要 zoom，可以自定义一个 data 值，然后从 selector 中排除掉。

```vue
<MediumZoom selector=".vp-doc img:not([data-disable-zoom])" />
```

**示例：**

```md
![foo](./assets/foo.png){data-disable-zoom}
```

或

```vue
<img src="image.png" data-disable-zoom />
```

## 工作原理

该组件使用 [medium-zoom](https://github.com/francoischalifour/medium-zoom) 库来提供图片缩放功能。它：

1. 组件挂载时自动初始化
2. 路由变化时重新初始化（使用 VitePress 路由钩子）
3. 组件卸载时清理资源
4. 应用适当的 z-index 样式，确保遮罩层显示在内容之上

## 参考

组件参考了 Rspress 文档框架中的 [@rspress/plugin-medium-zoom](https://rspress.rs/plugin/official-plugins/medium-zoom) 的设计。

## License

[MIT](./LICENSE)

Copyright (c) 2026-present, REFINITIST
