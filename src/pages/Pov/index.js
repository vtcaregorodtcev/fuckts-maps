import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';

import {
  ZoomWrapper,
  CreateFucktInput,
  Sidebar,
  AlertComponent,
  DraggableBoard
} from 'components';

import { history } from 'helpers';

import {
  newFuckt,
  getAllMaps,
  regenDefaultFuckts,
  getFucktsMap,
  updateZoom,
  getMenuMapIndex,
  getFucktsPathname,
  reassignPosToDefault
} from 'utils';

import { DEFAULT_FUCKTS } from 'utils/consts';

import style from './style';

const { Content } = Layout;

const PovPage = () => {
  const [fuckts, setFuckts] = useState(DEFAULT_FUCKTS);
  const [currentMapIndex, setCurrentMapIndex] = useState(1);
  const [zoomOut, setZoomOut] = useState(0);
  const [allMaps, setAllMaps] = useState(getAllMaps());
  const [successTextAlert, setSuccessTextAlert] = useState('');
  const [currentMap, setCurrentMap] = useState('new');

  const setupMap = (map, name) => {
    const { fuckts = [], zoomOut = 0 } = map;

    const currentMapIndex = getMenuMapIndex(name);

    setCurrentMap(name);
    setZoomOut(zoomOut);
    setCurrentMapIndex(currentMapIndex);
    setFuckts(fuckts.map(reassignPosToDefault));
  }

  const handleUrlChanged = ({ pathname }) => {
    const map = pathname.replace('/fuckts/', '');

    if (map === 'new') {
      return setFuckts(regenDefaultFuckts());
    }

    if (map !== currentMap) {
      const fucktsMap = getFucktsMap(map);
      return setupMap(fucktsMap, map);
    }
  }

  const handleCreateFuckt = fucktText => {
    const nf = newFuckt(fucktText);

    setFuckts([].concat(fuckts, nf));
  }

  const handleZoom = val => {
    setZoomOut(updateZoom(zoomOut, val));
  }

  useEffect(() => {
    history.listen(handleUrlChanged);

    handleUrlChanged({ pathname: getFucktsPathname() });
  }, []);

  return (<Layout className="layout currentMap-page" style={style.layout}>
    <Sidebar
      currentFuckts={fuckts}
      currentZoom={zoomOut}
      maps={allMaps}
      currentMapIndex={currentMapIndex}
      onNotify={setSuccessTextAlert}
      onDelete={() => setAllMaps(getAllMaps())}
      onSave={() => setAllMaps(getAllMaps())}
    />

    <Content style={style.content.wrapper}>
      <CreateFucktInput handleCreateFuckt={handleCreateFuckt} />

      <DraggableBoard
        style={style}
        fuckts={fuckts}
        zoomOut={zoomOut}
        onUpdate={setFuckts}
      />
    </Content>

    <AlertComponent
      msg={successTextAlert}
      onClose={setSuccessTextAlert}
    />

    <ZoomWrapper
      style={style}
      handleZoom={handleZoom}
    />
  </Layout>);
}

export default PovPage;
