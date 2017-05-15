'use strict';

import * as React from 'react';
import * as PropTypes from 'prop-types';

export default class ViewportObserver extends React.Component {
  static propTypes = {
    className   : PropTypes.string,
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
    className   : '',
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

  setElement(node) {
    this.element = node;
  }

  componentDidMount() {
    const { root, rootMargin, threshold } = this.props;

    this.observer = new IntersectionObserver(entries => {
      if (entries.length === 0) {
        return;
      }

      const entry = entries[0];

      if (this.isIntersected) {
        this.props.onChange(entry);

        if (entry.intersectionRatio <= 0) {
          this.isIntersected = false;
          this.props.onLeave();
        }
      } else {
        if (entry.intersectionRatio > 0) {
          this.isIntersected = true;
          this.props.onEnter();

          if (this.props.triggerOnce) {
            this.observer.unobserve(this.element);
            this.observer = null;
          }
        }

        this.props.onChange(entry);
      }
    }, { root, rootMargin, threshold });

    this.observer.observe(this.element);
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.unobserve(this.element);
      this.observer = null;
    }
  }

  render() {
    return (
      <div ref={this.setElement} className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}
