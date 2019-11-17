import React, { useState } from 'react';
import { Modal, Input } from 'antd';

export const SaveMapModal = ({ visible, handleSaveMapOk, toggleSaveMap }) => {
  const [newMapName, setNewMapName] = useState('');
  const [err, setErr] = useState(false);

  return <Modal
    title="Назови свою факт-карту"
    visible={visible}
    onOk={() => {
      if (newMapName && /^[a-zA-Zа-яА-Я0-9\s]+$/i.test(newMapName)) {
        handleSaveMapOk(newMapName);

        setNewMapName('');
        return setErr(false);
      }

      setErr(true);
    }}
    onCancel={() => {
      setErr(false);

      toggleSaveMap();
    }}
    okText="Вот так"
    cancelText="Потом, отстань!"
  >
    <Input
      data-cy-save-map-name-input
      placeholder="Название сюда"
      value={newMapName}
      onChange={({ target: { value } }) => setNewMapName(value)}
    />
    {err && <i>Выбери норм имя</i>}
  </Modal>
}
