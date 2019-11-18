import React from 'react';
import renderer from 'react-test-renderer';
import { AlertComponent } from '../index';

it('renders correctly with msg', () => {
  const tree = renderer.create(<AlertComponent msg="test" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly without msg', () => {
  const tree = renderer.create(<AlertComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});
