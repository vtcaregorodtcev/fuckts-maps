import React from 'react';
import { Zoom } from '../index';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Zoom></Zoom>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
