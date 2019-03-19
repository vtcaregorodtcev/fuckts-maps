import React from 'react';
import {Icon} from 'antd';

import './style.css';

export default function Fuckt(props) {
  const {fuckt, onFucktChange, onCloseClick, zoomOut} = props;

  return (<div className="paper" style={{zoom: (100 - zoomOut) + '%'}}>
    <div className="paper__drag-place"></div>
    <div className="paper-content">
      <textarea
        autoFocus
        value={fuckt.text}
        onChange={({ target: { value } }) => onFucktChange(value, fuckt)}>
      </textarea>
    </div>
    <Icon className="paper__close" type="close" onClick={() => onCloseClick(fuckt)} />
  </div>)
}
