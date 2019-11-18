import React from 'react';
import renderer from 'react-test-renderer';
import { SaveMapModal } from '../index';

it('renders correctly', () => {
  const tree = renderer
    // always false, bc of portal renderer
    .create(<SaveMapModal visible={false} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
