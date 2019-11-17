import React from 'react';
import { CreateFucktInput } from '../index';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<CreateFucktInput></CreateFucktInput>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
