import React from 'react';
import renderer from 'react-test-renderer';
import { Sidebar } from '../index';

it('renders correctly', () => {
  const tree = renderer.create(<Sidebar maps={[]} />).toJSON();
  expect(tree).toMatchSnapshot();
});
