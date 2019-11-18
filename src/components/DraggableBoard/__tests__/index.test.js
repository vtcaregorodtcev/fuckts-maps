import React from 'react';
import renderer from 'react-test-renderer';
import { DraggableBoard } from '../index';

it('renders correctly without params', () => {
  const tree = renderer
    .create(<DraggableBoard style={{ content: {}, draggable: {} }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with params', () => {
  const tree = renderer
    .create(
      <DraggableBoard
        fuckts={[
          {
            id: 1,
            defaultPosition: { x: 1, y: 1 },
            zIndex: 1,
          },
        ]}
        style={{ content: {}, draggable: {} }}
      ></DraggableBoard>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
