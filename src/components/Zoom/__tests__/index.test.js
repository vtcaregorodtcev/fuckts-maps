import React from 'react';
// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import renderer from 'react-test-renderer';
import { Zoom } from '../index';

it('renders correctly', () => {
  const tree = renderer.create(<Zoom />).toJSON();
  expect(tree).toMatchSnapshot();
});
