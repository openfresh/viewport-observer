# `ViewportObserver`

[![Build Status](https://travis-ci.org/openfresh/viewport-observer.svg?branch=master)](https://travis-ci.org/openfresh/viewport-observer)
[![devDependency Status](https://david-dm.org/openfresh/viewport-observer/dev-status.svg)](https://david-dm.org/openfresh/viewport-observer?type=dev)
[![peerDependency Status](https://david-dm.org/openfresh/viewport-observer/peer-status.svg)](https://david-dm.org/openfresh/viewport-observer?type=peer)

> A React Component that observe changes in the intersection of a target element with viewport using [`IntersectionObserver`](https://wicg.github.io/IntersectionObserver/)

## Install

```bash
$ npm install --save viewport-observer
```

This package depends on `IntersectionObserver`, so you probably need to polyfill via [WICG/IntersectionObserver Polyfill](https://github.com/WICG/IntersectionObserver/tree/gh-pages/polyfill) before using this package.

## Usage

```jsx
import ViewportObserver from 'viewport-observer';

...

<ViewportObserver
  onChange={() => console.log('onChange')}
  onEnter={() => console.log('onEnter')}
  onLeave={() => console.log('onLeave')}
/>

<ViewportObserver
  onChange={() => console.log('onChange')}
  onEnter={() => console.log('onEnter')}
  onLeave={() => console.log('onLeave')}>
  <div>{/* ... */}</div>
</ViewportObserver>
```

## Config

|  Property   | Type       | Default Value |
| ----------- | ---------- | ------------- |
| className | `String` | `ViewportObserver` |
| onChange | `Function` | `() => {}` |
| onEnter | `Function` | `() => {}` |
| onLeave | `Function` | `() => {}` |
| [root](https://wicg.github.io/IntersectionObserver/#dom-intersectionobserver-root) | `Node` | `null` |
| [rootMargin](https://wicg.github.io/IntersectionObserver/#dom-intersectionobserverinit-rootmargin) | [`DOMString`](https://heycam.github.io/webidl/#idl-DOMString) | `0px` |
| [threshold](https://wicg.github.io/IntersectionObserver/#dom-intersectionobserverinit-threshold)  | `Array<Number>` | `[0]` |
| triggerOnce | `Boolean` | `false` |

## License

MIT © [FRESH!](https://github.com/openfresh)
