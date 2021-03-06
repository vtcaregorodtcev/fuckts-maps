import React from 'react';
import { Icon } from 'antd';

import './style.css';

export const Fuckt = (props) => {
  const { fuckt, onFucktChange, onCloseClick, zoomOut } = props;

  return (<div data-cy-fuckt className="paper" style={
    {
      zoom: (100 - zoomOut) + '%',
      outline: fuckt.selected ? 'dashed 1px cornflowerblue' : 'none'
    }
  }>
    <div data-cy-draggable-fuckt className="paper__drag-place"></div>
    <div className="paper-content">
      <textarea
        data-cy-fuckt-textarea
        autoFocus
        value={fuckt.text}
        onChange={({ target: { value } }) => onFucktChange(value, fuckt)}>
      </textarea>
    </div>
    <Icon className="paper__close" type="close" onClick={() => onCloseClick(fuckt)} />
  </div>)
}
