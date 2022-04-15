# Vue Animate Height

[![npm version](https://img.shields.io/npm/v/vue-animate-height.svg?style=flat-square)](https://www.npmjs.com/package/vue-animate-height)
[![npm downloads](https://img.shields.io/npm/dm/vue-animate-height.svg?style=flat-square)](https://www.npmjs.com/package/vue-animate-height)

A port of Stanko's [React Animate Height](https://github.com/Stanko/react-animate-height/blob/master/README.md) for Vue.js.

> Most of the below documentation is derived from [React Animate Height's documentation](https://github.com/Stanko/react-animate-height/blob/master/README.md)

Lightweight Vue component for animating height using CSS transitions.
Slide up/down the element, and animate it to any specific height.
Content's opacity can be optionally animated as well (check `animateOpacity` prop bellow).

CSS classes are applied in specific animation states, check `animationStateClasses` prop.

[Changelog](CHANGELOG.md)

## Demo

Live demo: [leonzalion.github.io/vue-animate-height](https://leonzalion.github.io/vue-animate-height/)

To build the examples locally, run:

```shell
pnpm install
pnpm dev:docs
```

Then, open [`localhost:3000`](http://localhost:3000) in your browser of choice.

## Quick Start

Install the package from npm:

```shell
npm install vue-animate-height
```

Then, import it and use it in your Vue app:

```vue
<script setup>
import { ref } from 'vue';
import AnimateHeight from 'vue-animate-height';

const height = ref(0);
const toggle = () => height.value = height.value === 0 ? 'auto' : 0;
</script>

<template>
  <div>
    <button
      :aria-expanded="height !== 0"
      aria-controls='example-panel'
      @click='toggle'
    >
      {{ height === 0 ? 'Open' : 'Close' }}
    </button>

    <AnimateHeight
      id='example-panel'
      :duration="500"
      :height="height"
    >
      <h1>Your content goes here</h1>
      <p>Put as many Vue or HTML components here.</p>
    </AnimateHeight>
  </div>
</template>
```

### Props

- **height**: numeric or percentage value (ie. `'50%'`) or `'auto'`, required

When changed, element height will be animated to that height.<br/>
To slide up use <code>0</code>, for slide down use <code>'auto'</code>

- **duration**: integer, default: `250`

  Duration of the animation in milliseconds

- **delay**: integer, default: `0`

  Animation delay in milliseconds

- **easing**: string, default: `'ease'`

  CSS easing function to be applied to the animation

- **id**: string

  HTML `id` attribute.

- **contentClassName**: string

  CSS class to be applied to content wrapper element

  **Please note that you shouldn't apply properties that are messing with the layout (like `display`, `height`...), as these might break height calculations**

- **animationStateClasses**: object

  Object containing CSS class names for animation states, default:

  ```javascript
  {
    animating:                  'rah-animating',
    animatingUp:                'rah-animating--up',
    animatingDown:              'rah-animating--down',
    static:                     'rah-static',
    animatingToHeightZero:      'rah-animating--to-height-zero',
    animatingToHeightAuto:      'rah-animating--to-height-auto',
    animatingToHeightSpecific:  'rah-animating--to-height-specific',
    staticHeightZero:           'rah-static--height-zero',
    staticHeightAuto:           'rah-static--height-auto',
    staticHeightSpecific:       'rah-static--height-specific',
  }
  ```

  Please note that this one will be merged with the default object and cached when component is created,
  so changing it afterwards will have no effect.

- **applyInlineTransitions**: boolean, default: `true`

  If this flag is set to `false` only CSS classes will be applied to the element and inline
  transition styles will not be present.

- **animateOpacity**: boolean, default: `false`

  If set to `true` content will fade-in (and fade-out) while height is animated.

- **aria-hidden**: boolean

  By default, library will set `aria-hidden` to `true` when height is zero. If you wish to override it, you can pass the prop yourself.

### Emits

- **animation-start**: function

  Emitted when the animation starts.

  Passes a payload object containing `newHeight`, the pixel value of the height at which the animation will end.

  > **Note:** Do not confuse `@animation-start` with the HTML event `@animationstart`!

- **animation-end**: function

  Emitted when the animation ends.

  Passes a payload object containing `newHeight`, the pixel value of the height at which the animation ended.

Additional props will be forwarded to the wrapper `div` to make adding attributes like `aria-*` easier.

## Accessibility

When the `height` prop is `0`, this library will hide the content using `display: hidden`. It will also apply `aria-hidden="true"` which you can override it by passing `aria-hidden` prop yourself.

When using a button to toggle height, make sure you add `aria-expanded` and `aria-controls` to make everything accessible. Here's an example:

```vue
<!-- The id of `aria-controls` has to match the id passed to AnimateHeight -->
<button
  :aria-expanded="height !== 0"
  aria-controls='example-panel'
  @click="toggleHeight"
  ...
>
  Toggle
</button>

<AnimateHeight id='example-panel'>
  Content
</AnimateHeight>
```

## Gotchas

### Bounded flexboxes

If `AnimateHeight` is a flex child and it's parent has a fixed height, the animation won't work.
To fix this, you just need to add the following CSS rule to the `AnimateHeight` instance.

```css
flex-shrink: 0;
```

You can do it by passing a `class` or directly in the `style` prop

```vue
<AnimateHeight style="flexShrink: 0">
```

Check the [issue #89](https://github.com/Stanko/react-animate-height/issues/89) for the example and more details.
