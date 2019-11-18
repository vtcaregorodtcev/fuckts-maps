import React from 'react';
// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import renderer from 'react-test-renderer';
import { SaveMapModal } from '../index';

it('renders correctly', () => {
  const tree = renderer
    // always false, bc of portal renderer
    .create(<SaveMapModal visible={false} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
