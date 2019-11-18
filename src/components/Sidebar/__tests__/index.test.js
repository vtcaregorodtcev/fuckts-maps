import React from 'react';
// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import renderer from 'react-test-renderer';
import { Sidebar } from '../index';

it('renders correctly', () => {
  const tree = renderer.create(<Sidebar maps={[]} />).toJSON();
  expect(tree).toMatchSnapshot();
});
