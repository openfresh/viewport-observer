# ViewportObserver

[![Build Status](https://travis-ci.org/openfresh/viewport-observer.svg?branch=master)](https://travis-ci.org/openfresh/viewport-observer)
[![devDependency Status](https://david-dm.org/openfresh/viewport-observer/dev-status.svg)](https://david-dm.org/openfresh/viewport-observer?type=dev)
[![peerDependency Status](https://david-dm.org/openfresh/viewport-observer/peer-status.svg)](https://david-dm.org/openfresh/viewport-observer?type=peer)
[![codecov](https://codecov.io/gh/openfresh/viewport-observer/branch/master/graph/badge.svg)](https://codecov.io/gh/openfresh/viewport-observer)

> React Component that observe changes in the intersection of a target element with viewport using [`IntersectionObserver`](https://wicg.github.io/IntersectionObserver/)

## Install

```bash
$ npm install --save viewport-observer
```

This package depends on `IntersectionObserver`, so you probably need to polyfill via [w3c/IntersectionObserver Polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) before using this package.

## Usage

```jsx
// you probably need to polyfill
import 'intersection-observer';
import ViewportObserver from 'viewport-observer';

...

<ViewportObserver
  onChange={() => console.log('onChange')}
  onEnter={() => console.log('onEnter')}
  onLeave={() => console.log('onLeave')}>
  <div>{/* ... */}</div>
</ViewportObserver>
```

You can call `dispose()` of ViewportObserver instance to stop observing and dispose `IntersectionObserver` instance.

## Config

|  Property   | Type       | Default Value |
| ----------- | ---------- | ------------- |
| tagName | `String` | `div` |
| onChange | `Function` | `() => {}` |
| onEnter | `Function` | `() => {}` |
| onLeave | `Function` | `() => {}` |
| [root](https://wicg.github.io/IntersectionObserver/#dom-intersectionobserver-root) | `Node` | `null` |
| [rootMargin](https://wicg.github.io/IntersectionObserver/#dom-intersectionobserverinit-rootmargin) | [`DOMString`](https://heycam.github.io/webidl/#idl-DOMString) | `0px` |
| [threshold](https://wicg.github.io/IntersectionObserver/#dom-intersectionobserverinit-threshold)  | `Array<Number>` | `[0]` |

## Related

- [openfresh/super-image](https://github.com/openfresh/super-image): React component that render a image with object-fit and its fallback

## License

MIT © [FRESH!](https://github.com/openfresh)
