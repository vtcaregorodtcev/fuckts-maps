import React, { useState } from 'react';
import { Input } from 'antd';

const CreateFuckt = Input.Search;

export const CreateFucktInput = (props) => {
  const [value, setValue] = useState('');

  return <CreateFuckt
    className="pov-page__create-input"
    placeholder="Введи свой факт"
    enterButton="Добавить" size="large"
    value={value}
    onChange={({ target: { value } }) => setValue(value)}
    onSearch={props.handleCreateFuckt}
  />
}
