'use strict';

import * as React from 'react';
import * as PropTypes from 'prop-types';

const UNKNOWN_PROPS = [
  'tagName',
  'onChange',
  'onEnter',
  'onLeave',
  'root',
  'rootMargin',
  'threshold',
  'rootMargin',
  'triggerOnce',
  'children'
];

export default class ViewportObserver extends React.Component {
  static propTypes = {
    tagName     : PropTypes.string,
    onChange    : PropTypes.func,
    onEnter     : PropTypes.func,
    onLeave     : PropTypes.func,
    root        : PropTypes.node,
    rootMargin  : PropTypes.string,
    threshold   : PropTypes.arrayOf(PropTypes.number),
    triggerOnce : PropTypes.bool,
    children    : PropTypes.node
  };

  static defaultProps = {
    tagName     : 'div',
    onChange    : () => {},
    onEnter     : () => {},
    onLeave     : () => {},
    root        : null,
    rootMargin  : '0px',
    threshold   : [0],
    triggerOnce : false,
    children    : null
  };

  constructor(props) {
    super(props);

    this.isIntersected = false;
    this.observer = null;
    this.element = null;
    this.setElement = this.setElement.bind(this);
  }

  setElement(element) {
    this.element = element;
  }

  dispose() {
    if (this.observer) {
      this.observer.unobserve(this.element);
      this.observer.disconnect();
      this.observer = null;
    }
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(entries => {
      if (entries.length === 0) {
        return;
      }

      const entry = entries[0];
      const ratio = entry.intersectionRatio;
      const next = ratio > 0;

      if (!this.isIntersected && ratio > 0) {
        this.props.onEnter();
      }

      this.props.onChange(entry);

      if (this.isIntersected && ratio <= 0) {
        this.props.onLeave();
      }

      this.isIntersected = next;

      if (this.props.triggerOnce) {
        this.dispose();
      }
    }, {
      root       : this.props.root,
      rootMargin : this.props.rootMargin,
      threshold  : this.props.threshold
    });

    this.observer.observe(this.element);
  }

  componentWillUnmount() {
    this.dispose();
  }

  render() {
    const props = {};

    Object.keys(this.props)
      .filter(key => UNKNOWN_PROPS.indexOf(key) === -1)
      .forEach(key => {
        props[key] = this.props[key];
      });

    return React.createElement(this.props.tagName, {
      ...props,
      ref : this.setElement
    }, this.props.children);
  }
}
