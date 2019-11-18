import React from 'react';
// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import renderer from 'react-test-renderer';
import { CreateFucktInput } from '../index';

it('renders correctly', () => {
  const tree = renderer.create(<CreateFucktInput />).toJSON();
  expect(tree).toMatchSnapshot();
});
