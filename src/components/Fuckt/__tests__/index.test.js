import React from 'react';
import { Fuckt } from '../index';
import renderer from 'react-test-renderer';

it('renders correctly if not selected', () => {
  const tree = renderer
    .create(<Fuckt fuckt={{ text: '1', selected: false }} zoomOut={0}></Fuckt>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly if selected', () => {
  const tree = renderer
    .create(<Fuckt fuckt={{ text: '1', selected: true }} zoomOut={0}></Fuckt>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
