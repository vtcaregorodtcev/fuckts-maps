import React from 'react';
import Type from 'prop-types';
import {Button} from 'antd';

import style from './style';

function Zoom(props) {
  const {onPlus, onMinus} = props;

  return (<div className="zoom" style={style.zoom}>
    <Button shape="circle" icon="plus" onClick={() => onPlus()} />
    <Button shape="circle" icon="minus" onClick={() => onMinus()}/>
  </div>);
}

Zoom.propTypes = {
  onPlus: Type.func,
  onMinus: Type.func
};

Zoom.defaultProps = {
  onPlus: () => {},
  onMinus: () => {}
};

export default Zoom;
