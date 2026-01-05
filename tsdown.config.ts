import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: './src/index.ts',
  external: ['vue', 'vitepress'],
  platform: 'neutral',
  fromVite: true,
  dts: { vue: true },
  minify: true
});
