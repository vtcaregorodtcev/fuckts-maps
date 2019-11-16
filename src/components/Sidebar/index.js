import React, { useState } from 'react';
import { Layout, Menu, Icon, Modal } from 'antd';

import { history } from 'helpers';
import { ALERT_DURATION } from 'utils/consts';
import {
  getFucktsPathname,
  getFucktsMap,
  eraseFucktsMap,
  saveMap,
  getMenuMapIndex
} from 'utils';

import { SaveMapModal } from 'components';

const { Sider } = Layout;
const confirm = Modal.confirm;

export const Sidebar = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [currentMapIndex, setCurrentMapIndex] = useState(null);
  const [saveMapModalIsVisible, setSaveMapModalIsVisible] = useState(false);

  const goToNew = (idx) => {
    history.replace(`/fuckts/new`);

    setCurrentMapIndex(idx);
  }

  const toggleSaveMap = force => {
    setSaveMapModalIsVisible(typeof force !== 'undefined'
      ? force
      : !saveMapModalIsVisible);
  }

  const handleSaveMapOk = newMapName => {
    const currentMap = getFucktsPathname().replace('/fuckts/', '');

    const mapSaveName = newMapName || currentMap;
    const mapSaveNameFormatted = mapSaveName.replace(/\s/g, '_');

    saveMap(mapSaveName, mapSaveNameFormatted, props.currentFuckts, props.currentZoom);

    props.onNotify('Карта сохранена');
    props.onSave();

    toggleSaveMap(false);

    setTimeout(() => props.onNotify(''), ALERT_DURATION);

    if (currentMap === 'new') {
      history.replace(`/fuckts/${mapSaveNameFormatted}`);
      setCurrentMapIndex(getMenuMapIndex(mapSaveName));
    }
  }

  const triggerSaveMap = () => {
    const currentMap = getFucktsPathname().replace('/fuckts/', '');

    if (currentMap !== 'new') {
      return handleSaveMapOk(this.currentMap);
    }

    toggleSaveMap(true);
  }

  const triggerDeleteMap = () => {
    const currentMap = getFucktsPathname().replace('/fuckts/', '');

    if (currentMap === 'new') { return; }

    const fucktsMap = getFucktsMap(currentMap);

    confirm({
      title: `Хочешь удалить карту '${fucktsMap.name}'?`,
      content: 'Её больше нельзя будет восстановить',
      okText: 'Да, давай',
      okType: 'danger',
      cancelText: 'Ой, нет!',
      onOk() {
        eraseFucktsMap(currentMap);

        props.onDelete();

        goToNew();
      }
    });
  }

  const goToMap = (name, idx) => {
    history.replace(`/fuckts/${name}`);

    setCurrentMapIndex(idx);
  }

  return <Sider
    collapsible
    collapsed={collapsed}
    onCollapse={setCollapsed}>
    <div className="logo" />
    <Menu theme="dark"
      selectedKeys={[`${currentMapIndex || props.currentMapIndex}`]}
      mode="inline"
    >
      <Menu.Item key="1" onClick={() => goToNew(1)}>
        <Icon type="file" />
        <span>Новая карта</span>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => triggerSaveMap()}>
        <Icon type="save" />
        <span>Сохранить карту</span>
      </Menu.Item>
      {
        props.maps.map((fm, idx) => (
          <Menu.Item key={idx + 3} onClick={() => goToMap(fm.mapSaveNameFormatted, idx + 3)}>
            <Icon type="copy" />
            <span>{fm.name}</span>
          </Menu.Item>
        ))
      }
      <Menu.Item key="1000" onClick={() => triggerDeleteMap()}>
        <Icon type="delete" />
        <span>Удалить карту</span>
      </Menu.Item>
    </Menu>
    <SaveMapModal
      visible={saveMapModalIsVisible}
      handleSaveMapOk={handleSaveMapOk}
      toggleSaveMap={toggleSaveMap}
    />
  </Sider>
}
