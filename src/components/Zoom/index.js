/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import Type from 'prop-types';
import { Button } from 'antd';

import style from './style';

export const Zoom = props => {
  const { onPlus, onMinus } = props;

  return (
    <div className="zoom" style={style.zoom}>
      <Button shape="circle" icon="plus" onClick={() => onPlus()} />
      <Button shape="circle" icon="minus" onClick={() => onMinus()} />
    </div>
  );
};

Zoom.propTypes = {
  onPlus: Type.func,
  onMinus: Type.func,
};

Zoom.defaultProps = {
  onPlus: () => {},
  onMinus: () => {},
};

export const ZoomWrapper = ({ handleZoom }) => {
  return (
    <span style={style.wrapper}>
      <Zoom onPlus={() => handleZoom(-10)} onMinus={() => handleZoom(10)} />
    </span>
  );
};
