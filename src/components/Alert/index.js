import React from 'react';
import { Alert } from 'antd';

export const AlertComponent = ({ msg, type = 'success', onClose }) => msg ?
  (<div>
    <Alert
      message={msg}
      type={type}
      showIcon
      afterClose={onClose}
    />
  </div>) : null;
