/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import { Alert } from 'antd';

export const AlertComponent = ({ msg, type = 'success', onClose }) =>
  msg ? (
    <div>
      <Alert message={msg} type={type} showIcon afterClose={onClose} />
    </div>
  ) : null;
