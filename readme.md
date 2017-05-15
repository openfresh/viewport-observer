# `ViewportObserver`

[![Build Status](https://travis-ci.org/openfresh/viewport-observer.svg?branch=master)](https://travis-ci.org/openfresh/viewport-observer)
[![devDependency Status](https://david-dm.org/openfresh/viewport-observer/dev-status.svg)](https://david-dm.org/openfresh/viewport-observer?type=dev)
[![peerDependency Status](https://david-dm.org/openfresh/viewport-observer/peer-status.svg)](https://david-dm.org/openfresh/viewport-observer?type=peer)

> A React Component that detect element existence on viewport using [`IntersectionObserver`](https://wicg.github.io/IntersectionObserver/)

## Install

```bash
$ npm install --save viewport-observer
```

This package depends on [`IntersectionObserver`](https://wicg.github.io/IntersectionObserver/), You probably need to polyfill via [WICG/IntersectionObserver Polyfill](https://github.com/WICG/IntersectionObserver/tree/gh-pages/polyfill).

## Usage

```jsx
import ViewportObserver from 'viewport-observer';

...

<ViewportObserver
  onEnter={() => console.log('onEnter')}
  onLeave={() => console.log('onLeave')}
/>

<ViewportObserver
  onEnter={() => console.log('onEnter')}
  onLeave={() => console.log('onLeave')}>
  <div>{/* ... */}</div>
</ViewportObserver>
```

## Config

|  Property   | Type       | Description                 |
| ----------- | ---------- | --------------------------- |
| className | `String` | Default value is `ViewportObserver` |
| onEnter | `Function` | Call on enter to viewport   |
| onLeave | `Function` | Call on leave from viewport |
| root | `Node` | |
| rootMargin | `DOMString` | |
| threshold  | `Array<Number>` | |
| triggerOnce | `Boolean` | |

## License

MIT © [FRESH!](https://github.com/openfresh)
