import React from 'react';
import { Sidebar } from '../index';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Sidebar maps={[]}></Sidebar>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
