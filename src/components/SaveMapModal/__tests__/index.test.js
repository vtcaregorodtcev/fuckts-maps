import React from 'react';
import { SaveMapModal } from '../index';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    // always false, bc of portal renderer
    .create(<SaveMapModal visible={false}></SaveMapModal>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
