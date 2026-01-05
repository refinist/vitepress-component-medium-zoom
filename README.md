# vitepress-component-medium-zoom

English | [中文](./README.zh-CN.md)

VitePress image preview component

## Features

- 🖼️ Click images to zoom in/out
- 🔄 Automatically reinitialize on route changes
- ⚙️ Customizable selector and options
- 🎨 Built-in z-index styling for overlay

## Installation

```bash
npm install vitepress-component-medium-zoom
# or
pnpm add vitepress-component-medium-zoom
# or
yarn add vitepress-component-medium-zoom
```

## Usage

Refer to [VitePress Layout Slots](https://vitepress.dev/guide/extending-default-theme#layout-slots), import the component directly in your layout.

Create or update `.vitepress/theme/index.js`:

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

Create or update `.vitepress/theme/MyLayout.vue`:

```vue
<script setup>
import DefaultTheme from 'vitepress/theme';
import { MediumZoom } from 'vitepress-component-medium-zoom';
import 'vitepress-component-medium-zoom/style.css';

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>...</Layout>
  <!-- Use here -->
  <MediumZoom />
</template>
```

**Note:** The component doesn't render any visible content, so you can place it anywhere in your layout. It will automatically handle image zooming for all images matching the selector.

⚠️ **Important:** You need to add the following configuration to `.vitepress/config.ts`, otherwise the build will fail:

```js
vite: {
  ssr: {
    noExternal: ['vitepress-component-medium-zoom'];
  }
}
```

## Props

### selector

- **Type**: `string | HTMLElement | HTMLElement[] | NodeList`
- **Default**: `'.vp-doc img'`

Customize the image selector. This follows the [medium-zoom](https://github.com/francoischalifour/medium-zoom#selectors) selector format.

**Example:**

```vue
<MediumZoom selector=".vp-doc img" />
```

If you want to exclude certain images from zooming, you can use a custom data attribute and exclude them from the selector.

```vue
<MediumZoom selector=".vp-doc img:not([data-disable-zoom])" />
```

**Example:**

```md
![foo](./assets/foo.png){data-disable-zoom}
```

or

```vue
<img src="image.png" data-disable-zoom />
```

### options

- **Type**: `ZoomOptions`
- **Default**: `{}`

Configuration options for medium-zoom. See the [medium-zoom documentation](https://github.com/francoischalifour/medium-zoom#options) for available options.

**Example:**

```vue
<MediumZoom
  :selector="'.vp-doc img'"
  :options="{
    background: 'rgba(0, 0, 0, 0.8)',
    margin: 24
  }"
/>
```

### zIndex

- **Type**: `number`
- **Default**: `999`

Customize the z-index value for the overlay and zoomed image.

**Example:**

```vue
<MediumZoom :z-index="2000" />
```

## How It Works

This component uses the [medium-zoom](https://github.com/francoischalifour/medium-zoom) library to provide image zoom functionality. It:

1. Automatically initializes when the component is mounted
2. Reinitializes when the route changes (using VitePress router hooks)
3. Cleans up resources when the component is unmounted
4. Applies appropriate z-index styling to ensure the overlay appears above content

## Reference

This component references the design of [@rspress/plugin-medium-zoom](https://rspress.rs/plugin/official-plugins/medium-zoom) from the Rspress documentation framework.

## License

[MIT](./LICENSE)

Copyright (c) 2026-present, REFINITIST
