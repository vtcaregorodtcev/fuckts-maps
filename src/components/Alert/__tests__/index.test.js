import React from 'react';
import { AlertComponent } from '../index';
import renderer from 'react-test-renderer';

it('renders correctly with msg', () => {
  const tree = renderer
    .create(<AlertComponent msg="test"></AlertComponent>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly without msg', () => {
  const tree = renderer
    .create(<AlertComponent></AlertComponent>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
