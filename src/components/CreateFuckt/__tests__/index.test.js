import React from 'react';
import renderer from 'react-test-renderer';
import { CreateFucktInput } from '../index';

it('renders correctly', () => {
  const tree = renderer.create(<CreateFucktInput />).toJSON();
  expect(tree).toMatchSnapshot();
});
