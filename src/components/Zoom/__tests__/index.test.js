import React from 'react';
import renderer from 'react-test-renderer';
import { Zoom } from '../index';

it('renders correctly', () => {
  const tree = renderer.create(<Zoom />).toJSON();
  expect(tree).toMatchSnapshot();
});
