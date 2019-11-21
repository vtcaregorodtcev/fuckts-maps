/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import { Input } from 'antd';

const CreateFuckt = Input.Search;

export const CreateFucktInput = props => {
  const [value, setValue] = useState('');

  return (
    <CreateFuckt
      data-cy-create-fuckt
      className="pov-page__create-input"
      placeholder="Введи свой факт"
      enterButton="Добавить"
      value={value}
      onChange={({ target: { value } }) => setValue(value)}
      onSearch={() => props.handleCreateFuckt(value) || setValue('')}
    />
  );
};
