import React from 'react';
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
  nextId,
  getFucktsMap,
  updateZoom,
  getMenuMapIndex,
  getFucktsPathname
} from 'utils';

import { DEFAULT_FUCKTS } from 'utils/consts';

import style from './style';

const { Content } = Layout;

class PovPage extends React.Component {
  fuckts = DEFAULT_FUCKTS;
  collapsed = true;
  currentMapIndex = 1;
  zoomOut = 0;

  constructor(props) {
    super(props);

    this.handleUpdate(true);
  }

  componentDidMount() {
    history.listen(this.handleUrlChanged);

    this.handleUrlChanged({ pathname: getFucktsPathname() });
  }

  handleUrlChanged = ({ pathname }) => {
    const map = pathname.replace('/fuckts/', '');

    if (map === 'new' && this.currentMap !== 'new') {
      return this.setNewMap();
    }

    if (this.currentMap !== map) {
      const fucktsMap = getFucktsMap(map);
      return this.setMap(fucktsMap, map);
    }
  }

  render() {
    return (<Layout className="layout currentMap-page" style={style.layout}>
      <Sidebar
        currentFuckts={this.fuckts}
        currentZoom={this.zoomOut}
        maps={this.allMaps}
        currentMapIndex={this.currentMapIndex}
        onNotify={this.handleSidebarNotify}
        onDelete={this.handleUpdate}
        onSave={this.handleUpdate}
      />

      <Content style={style.content.wrapper}>
        <CreateFucktInput handleCreateFuckt={this.handleCreateFuckt} />

        <DraggableBoard
          style={style}
          fuckts={this.fuckts}
          zoomOut={this.zoomOut}
          onUpdate={this.handleFucktsUpdate}
        />
      </Content>

      <AlertComponent
        msg={this.successTextAlert}
        onClose={this.handleSidebarNotify}
      />

      <ZoomWrapper
        style={style}
        handleZoom={this.handleZoom}
      />
    </Layout>);
  }

  handleFucktsUpdate = fuckts => {
    this.fuckts = fuckts;

    this.forceUpdate();
  }

  handleSidebarNotify = (msg = '') => {
    this.successTextAlert = msg;

    this.forceUpdate();
  }

  handleCreateFuckt = fucktText => {
    const nf = newFuckt(fucktText);

    this.addNewFuckt(nf);
  }

  setNewMap = () => {
    this.currentMap = 'new';
    this.zoomOut = 0;
    this.currentMapIndex = 1;

    this.fuckts = DEFAULT_FUCKTS.map(f => {
      f.id = nextId();

      return f;
    });

    this.forceUpdate();
  };

  setMap = (map, name) => {
    const { fuckts = [], zoomOut = 0 } = map;

    const currentMapIndex = getMenuMapIndex(name);

    this.currentMap = name;
    this.zoomOut = zoomOut;
    this.currentMapIndex = currentMapIndex;

    this.fuckts = fuckts.map(f => {
      f.defaultPosition = f.pos;

      return f;
    });

    this.forceUpdate();
  }

  addNewFuckt(fuckt) {
    this.fuckts = [].concat(this.fuckts, fuckt);

    this.forceUpdate();
  }

  handleCollapse = collapsed => {
    this.collapsed = collapsed;

    this.forceUpdate();
  }

  handleZoom = val => {
    this.zoomOut = updateZoom(this.zoomOut, val);

    this.forceUpdate();
  }

  handleUpdate = skipForce => {
    this.allMaps = getAllMaps();

    if (skipForce) { return; }

    this.forceUpdate();
  }
}

export default PovPage;
