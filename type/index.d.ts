// Type definitions for viewport-observer
// Project: https://github.com/openfresh/viewport-observer

import * as React from 'react';

declare namespace ViewportObserver {
  export interface Props {
    tagName?: string;
    onChange?: (entry: IntersectionObserverEntry) => void;
    onEnter?: () => void;
    onLeave?: () => void;
    root?: HTMLElement;
    rootMargin?: string;
    threshold?: number[];
  }
}

declare class ViewportObserver extends React.Component<ViewportObserver.Props> {
  dispose(): void;
  isIntersected: boolean;
}

export = ViewportObserver;
