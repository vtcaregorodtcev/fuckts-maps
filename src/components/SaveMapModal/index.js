import React, { useState } from 'react';
import { Modal, Input } from 'antd';

export const SaveMapModal = ({ visible, handleSaveMapOk, toggleSaveMap }) => {
  const [newMapName, setNewMapName] = useState('');

  return <Modal
    title="Назови свою факт-карту"
    visible={visible}
    onOk={() => newMapName && handleSaveMapOk(newMapName)}
    onCancel={() => toggleSaveMap()}
    okText="Вот так"
    cancelText="Потом, отстань!"
  >
    <Input
      placeholder="Название сюда"
      value={newMapName}
      onChange={({ target: { value } }) => setNewMapName(value)}
    />
  </Modal>
}
