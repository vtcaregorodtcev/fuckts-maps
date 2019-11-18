import React from 'react';
// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import renderer from 'react-test-renderer';
import { Fuckt } from '../index';

it('renders correctly if not selected', () => {
  const tree = renderer
    .create(<Fuckt fuckt={{ text: '1', selected: false }} zoomOut={0} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly if selected', () => {
  const tree = renderer
    .create(<Fuckt fuckt={{ text: '1', selected: true }} zoomOut={0} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
