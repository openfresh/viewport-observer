'use strict';

import * as React from 'react';
import * as PropTypes from 'prop-types';

export default class ViewportObserver extends React.Component {
  static propTypes = {
    tag         : PropTypes.node,
    className   : PropTypes.string,
    onEnter     : PropTypes.func,
    onLeave     : PropTypes.func,
    root        : PropTypes.node,
    rootMargin  : PropTypes.string,
    threshold   : PropTypes.arrayOf(PropTypes.number),
    triggerOnce : PropTypes.bool,
    children    : PropTypes.node
  };

  static defaultProps = {
    tag         : 'div',
    className   : '',
    onEnter     : () => {},
    onLeave     : () => {},
    root        : null,
    rootMargin  : null,
    threshold   : [0],
    triggerOnce : false,
    children    : null
  };

  intersectionObserver;

  element;

  constructor(props) {
    super(props);

    this.setElement = this.setElement.bind(this);
  }

  setElement(node) {
    this.element = node;
  }

  componentDidMount() {
    const { root, rootMargin, threshold } = this.props;

    this.intersectionObserver = new IntersectionObserver(entries => {
      if (entries.length === 0) {
        return;
      }

      if (entries[0].intersectionRatio <= 0) {
        this.props.onLeave();
        return;
      }

      if (this.props.triggerOnce) {
        this.intersectionObserver.unobserve(this.element);
        this.intersectionObserver = null;
      }

      this.props.onEnter();
    }, { root, rootMargin, threshold });

    this.intersectionObserver.observe(this.element);
  }

  componentWillUnmount() {
    if (this.intersectionObserver) {
      this.intersectionObserver.unobserve(this.element);
      this.intersectionObserver = null;
    }
  }

  render() {
    const { tag, className } = this.props;

    return (
      <tag ref={this.setElement} className={className}>
        {this.props.children}
      </tag>
    );
  }
}
