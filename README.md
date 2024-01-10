<!-- Logo -->
<h1 align="center">
  vite-plugin-react-rich-svg
</h1>

<!-- Slogan -->
<p align="center">
   Seamless SVG loader with versatile import options
</p>
<!-- Badges -->
<p align="center">

  <!-- Main Badges -->
  <img src="https://raw.githubusercontent.com/iGoodie/paper-editor/master/.github/assets/main-badge.svg" height="20px"/>
  <a href="https://www.npmjs.com/package/vite-plugin-react-rich-svg">
    <img src="https://img.shields.io/npm/v/vite-plugin-react-rich-svg"/>
  </a>
  <a href="https://github.com/iGoodie/vite-plugin-react-rich-svg/tags">
    <img src="https://img.shields.io/github/v/tag/iGoodie/vite-plugin-react-rich-svg"/>
  </a>
  <a href="https://github.com/iGoodie/vite-plugin-react-rich-svg">
    <img src="https://img.shields.io/github/languages/top/iGoodie/vite-plugin-react-rich-svg"/>
  </a>

  <br/>

  <!-- Github Badges -->
  <img src="https://raw.githubusercontent.com/iGoodie/paper-editor/master/.github/assets/github-badge.svg" height="20px"/>
  <a href="https://github.com/iGoodie/vite-plugin-react-rich-svg/commits/master">
    <img src="https://img.shields.io/github/last-commit/iGoodie/vite-plugin-react-rich-svg"/>
  </a>
  <a href="https://github.com/iGoodie/vite-plugin-react-rich-svg/issues">
    <img src="https://img.shields.io/github/issues/iGoodie/vite-plugin-react-rich-svg"/>
  </a>
  <a href="https://github.com/iGoodie/vite-plugin-react-rich-svg/tree/master/src">
    <img src="https://img.shields.io/github/languages/code-size/iGoodie/vite-plugin-react-rich-svg"/>
  </a>

  <br/>

  <!-- Support Badges -->
  <img src="https://raw.githubusercontent.com/iGoodie/paper-editor/master/.github/assets/support-badge.svg" height="20px"/>
  <a href="https://discord.gg/KNxxdvN">
    <img src="https://img.shields.io/discord/610497509437210624?label=discord"/>
  </a>
  <a href="https://www.patreon.com/iGoodie">
    <img src="https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3DiGoodie%26type%3Dpatrons"/>
  </a>
</p>

# Description

A vite plugin that handles SVG loading with zero-config effort.

It handles loading raw (html string), inline data uri (`data:svg+xml,...`) and SVGR Component (with easily usable SVGO options) imports easily!

This plugin is heavily inspired by [vite-svg-loader](https://github.com/jpkleemans/vite-svg-loader), which is an SVG loading Vite plugin for Vue. It is one of my favourites. Thanks to everyone contributed to it! 💜

# How to use?

1. Use your favorite package manager to install as dependency

```
npm install vite-plugin-react-rich-svg --save-dev
```

2. Include it in your `vite.config.ts`

```ts
import richSvg from "vite-plugin-react-rich-svg";

export default defineConfig({
  plugins: [react(), richSvg()],
});
```

3. If you're using Typescript, you might want to include the typings under `vite-env.d.ts`:

```tsx
// Caveat: referencing our plugin first will ensure vite types do not overlap

/// <reference types="vite-plugin-react-rich-svg/client" />
/// <reference types="vite/client" />
```

4. Start importing your SVGs! Happy coding!

```ts
// Raw string import
import viteLogoRaw from "./assets/vite.svg?raw";

// Data URL import
import viteLogoDataURL from "./assets/vite.svg?url";

// SVGR Component import
import ViteLogoComponent from "./assets/vite.svg?component";

// Default import, not handled by our plugin
import viteLogo from "./assets/vite.svg";
```

# Plugin Configurations

## `include` option

Acts as a whitelist predicate for the files you want to be processed.

```ts
  richSvg({
    include: (path) => /.*\.icon\.svg$/.test(path),
    // ^ This config will only process files that look like:
    // ...chevron-right.icon.svg?raw
    // ...chevron-left.icon.svg?component
    // ...home.icon.svg?url
  }),
```

## `exclude` option

Acts as a blacklist predicate for the files you want to be ignored.

```ts
  richSvg({
    exclude: (path) => /.*\.ignore\.svg$/.test(path),
    // ^ This config will ignore files that look like:
    // ...my-illustration.ignore.svg?raw
    // ...my-illustration.ignore.svg?component
    // ...my-illustration.ignore.svg?url
  }),
```

## `componentLoaderOptions.svgrConfig` option

Options used while running SVGR on the original svg code/asset (See [SVGR Options](https://react-svgr.com/docs/options/))

```ts
  richSvg({
    componentLoaderOptions: {
      svgrConfig: {
        ref: true,
        memo: true,
      },
      // ^ This config will make it load component svg imports loads with forwardedRef & memo wrapped
    },
  }),
```

## `componentLoaderOptions.esbuildConfig` option

Options used to generate import code with given SVGR output (See [ESBuild Transform Options](https://esbuild.github.io/api/#transform))

```ts
  richSvg({
    componentLoaderOptions: {
      esbuildConfig:{
        minify: true
      }
      // ^ This config will make it load component svg imports loads with minification enabled
    },
  }),
```

# SVGO, Prettier & Other SVGR Plugins

SVGO and Prettier are supported out of the box. Just mark them in the svgrConfig and they'll start working.

You can also include your own SVGR plugins as you desire!

```ts
import myCustomPlugin from "my-custom-svgr-plugin";

richSvg({
  componentLoaderOptions: {
    svgrConfig: {
      svgo: true,
      prettier: true,
      plugins: [myCustomPlugin]
    },
  },
}),
```

## License

&copy; 2024 Taha Anılcan Metinyurt (iGoodie)

For any part of this work for which the license is applicable, this work is licensed under the [Attribution-ShareAlike 4.0 International](http://creativecommons.org/licenses/by-sa/4.0/) license. (See LICENSE).

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a>

```

```
