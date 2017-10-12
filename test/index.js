'use strict';

import * as assert from 'power-assert';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
import ViewportObserver from '../src';

describe('ViewportObserver', () => {
  const div = document.createElement('div');

  beforeEach(() => {
    document.body.appendChild(div);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  });

  it('should be rendered as div default', () => {
    const component = TestUtils.renderIntoDocument(<ViewportObserver />);
    const node = TestUtils.findRenderedDOMComponentWithTag(component, 'div');

    assert.notEqual(node, null);
  });

  it('should be rendered as specified `tagName`', () => {
    const component = TestUtils.renderIntoDocument(<ViewportObserver tagName="span" />);
    const node = TestUtils.findRenderedDOMComponentWithTag(component, 'span');

    assert.notEqual(node, null);
  });

  it('should have expected `className`', () => {
    const component = TestUtils.renderIntoDocument(<ViewportObserver className="a" />);
    const node = TestUtils.findRenderedDOMComponentWithTag(component, 'div');

    assert.equal(node.className, 'a');
  });

  it('should fire `onEnter` -> `onChange` -> `onLeave`', done => {
    const onEnter = () => {};
    const onChange = () => {};
    const onLeave = () => {};

    const spiedOnEnter = sinon.spy(onEnter);
    const spiedOnChange = sinon.spy(onChange);
    const spiedOnLeave = sinon.spy(onLeave);

    const props = {
      onEnter  : spiedOnEnter,
      onChange : spiedOnChange,
      onLeave  : spiedOnLeave
    };

    const component = ReactDOM.render(<ViewportObserver {...props} />, div);
    const node = TestUtils.findRenderedDOMComponentWithTag(component, 'div');

    document.body.style.height = '1000px';
    node.style.marginTop = '10px';
    node.style.height = '100px';

    setTimeout(() => {
      window.scrollTo(0, 10);
    }, 100);

    setTimeout(() => {
      assert(spiedOnEnter.called);
      assert(spiedOnChange.called);
      assert(!spiedOnLeave.called);
    }, 200);

    setTimeout(() => {
      window.scrollTo(0, 110);
    }, 300);

    setTimeout(() => {
      assert(spiedOnEnter.called);
      assert(spiedOnChange.called);
      assert(!spiedOnLeave.called);
    }, 400);

    setTimeout(() => {
      window.scrollTo(0, 111);
    }, 500);

    setTimeout(() => {
      assert(spiedOnEnter.called);
      assert(spiedOnChange.called);
      assert(spiedOnLeave.called);
      done();
    }, 600);
  });

  it('should be disposed after unmount', () => {
    const component = ReactDOM.render(<ViewportObserver tagName="span" />, div);

    assert.notEqual(component.observer, null);

    ReactDOM.unmountComponentAtNode(div);

    assert.equal(component.observer, null);
  });
});
