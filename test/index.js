'use strict';

import * as assert from 'power-assert';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import ViewportObserver from '../src';

describe('ViewportObserver', () => {
  it('should be rendered as div default', () => {
    const component = TestUtils.renderIntoDocument(<ViewportObserver />);
    const node = TestUtils.findRenderedDOMComponentWithTag(component, 'div');

    assert(node !== null);
  });

  it('should be rendered as specified `tagName`', () => {
    const component = TestUtils.renderIntoDocument(<ViewportObserver tagName="span" />);
    const node = TestUtils.findRenderedDOMComponentWithTag(component, 'span');

    assert(node !== null);
  });

  it('should have expected `className`', () => {
    const component = TestUtils.renderIntoDocument(<ViewportObserver className="a" />);
    const node = TestUtils.findRenderedDOMComponentWithTag(component, 'div');

    assert(node.className === 'a');
  });
});
