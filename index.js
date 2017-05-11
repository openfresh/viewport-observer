'use strict';

import * as React from 'react';
import * as PropTypes from 'prop-types';

export default class ViewportObserver extends React.Component {
  static propTypes = {
    onEnter    : PropTypes.func,
    onLeave    : PropTypes.func,
    root       : PropTypes.node.isRequired,
    rootMargin : PropTypes.string,
    threshold  : PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.number)
    ]),
    children : PropTypes.node.isRequired
  };

  static defaultProps = {
    onEnter    : () => {},
    onLeave    : () => {},
    rootMargin : null,
    threshold  : [0]
  };

  intersectionObserver;

  element;

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
    return (
      <div ref={this.setElement} className="Waypoint">
        {this.props.children}
      </div>
    );
  }
}
