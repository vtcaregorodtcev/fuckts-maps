import React from 'react';
import Draggable from 'react-draggable';

import {
  Layout,
  Menu,
  Icon,
  Input,
  Modal,
  Alert
} from 'antd';

import {Fuckt} from 'components';
import style from './style';
import {history} from '_helpers';

const {Content, Sider} = Layout;

const CreateFuckt = Input.Search;
const SubMenu = Menu.SubMenu;

const ALERT_DURATION = 5000;

let ID_SEQUENCE = 1;
let Z_INDEX_COUNTER = 1;

const FUCKT_MAP_NAMES = 'FUCKT_MAP_NAMES';
const FUCKT_MAP_KEY = 'FUCKT_MAP_KEY_';

const newFuckt = (text, options = {}) => ({
  ...options,
  text,
  id: Date.now() + ID_SEQUENCE++
});

const defaultFuckts = [
  newFuckt('Кликни на меня!', {
    defaultPosition: {x: 400, y: 70}
  }),
  newFuckt('Привет, добавь пару фактов о себе!', {
    defaultPosition: {x: 100, y: 100}
  }),
  newFuckt('Ты можешь двигать нас как захочешь!', {
    defaultPosition: {x: 305, y: 130}
  }),
  newFuckt('Потяни мышкой за край листочка!', {
    defaultPosition: {x: 150, y: 225}
  })
];

class PovPage extends React.Component {
  state = {
    fuckts: defaultFuckts,
    fucktValue: '',
    collapsed: true,
    currentMapIndex: 1
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  static getDerivedStateFromProps(props, prevState) {
    const {match: {params: {pov} = {}} = {}} = props;

    if (prevState.saveMapModalIsVisible) {
      return null;
    }

    const storedNames = JSON.parse(
      localStorage.getItem(FUCKT_MAP_NAMES) || '[]'
    );

    const allFucktMaps = storedNames.map(name => {
      return JSON.parse(
        localStorage.getItem(`${FUCKT_MAP_KEY}${name}`) || '{}'
      );
    });

    if (pov === 'new') {
      return {
        pov,
        fuckts: defaultFuckts.map(f => {
          f.id = Date.now() + ID_SEQUENCE++;

          return f;
        }),
        allFucktMaps
      };
    }

    if (prevState.pov !== pov) {
      const fucktsMap = JSON.parse(
        localStorage.getItem(`${FUCKT_MAP_KEY}${pov}`) || '{}'
      );

      const {fuckts} = fucktsMap;

      return {
        pov,
        allFucktMaps,
        fuckts: fuckts && fuckts.length
          ? fuckts.map(f => {
              f.defaultPosition = f.pos;

              return f;
            })
          : []
      };
    }

    return {
      pov,
      allFucktMaps
    };
  }

  render() {
    const {
      fuckts,
      fucktValue,
      collapsed,
      saveMapModalIsVisible,
      mapSaveName,
      successTextAlert,
      allFucktMaps,
      currentMapIndex
    } = this.state;

    return (<Layout className="layout pov-page" style={style.layout}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}>
        <div className="logo"/>
        <Menu theme="dark" selectedKeys={[`${currentMapIndex}`]} mode="inline">
          <Menu.Item key="1" onClick={() => this.goToNew()}>
            <Icon type="file" />
            <span>Новая карта</span>
          </Menu.Item>
          <Menu.Item key="2" onClick={() => this.triggerSaveMap()}>
            <Icon type="save"/>
            <span>Сохранить Карту</span>
          </Menu.Item>
          {
            allFucktMaps.map((fm, idx) => (
              <Menu.Item key={idx+3} onClick={() => this.goToMap(fm.mapSaveNameFormatted, idx+3)}>
                <Icon type="copy"/>
                <span>{fm.name}</span>
              </Menu.Item>
            ))
          }
        </Menu>
      </Sider>
      <Content style={style.content.wrapper}>
        <CreateFuckt
          className="pov-page__create-input"
          placeholder="Введи свой факт"
          enterButton="Добавить" size="large"
          value={fucktValue}
          onChange={({ target: { value } }) => this.handleUpdateFucktValue(value)}
          onSearch={fuckt => this.handleCreateFuckt(fuckt)}
        />
        <div className="draggable-area" style={style.content.div}>
          {
            fuckts.map((f, idx) => (
              <Draggable key={f.id}
                bounds='.draggable-area'
                handle=".paper__drag-place"
                defaultPosition={f.defaultPosition}
                onStop={e => this.handleUpdateFucktCoords(e, f)}
              >
                <div
                  style={{
                    ...style.draggable.wrapper,
                    zIndex: f.zIndex,
                    opacity: f.deleted ? 0 : 1,
                    pointerEvents: f.deleted ? 'none' : 'auto'
                  }}
                  onClick={() => this.handleClickDragFuckt(f)}
                >
                  <Fuckt
                    fuckt={f}
                    onFucktChange={(val, fuckt) => this.handleCahngeFuckt(val, fuckt)}
                    onCloseClick={fuckt => this.handleCloseFuckt(fuckt)}
                  />
                </div>
             </Draggable>))
          }
        </div>
      </Content>
        <Modal
          title="Назови свою факт-карту"
          visible={saveMapModalIsVisible}
          onOk={() => this.handleSaveMapOk()}
          onCancel={() => this.toggleSaveMap()}
          okText="Вот так"
          cancelText="Потом, отстань!"
        >
          <Input
            placeholder="Название сюда"
            value={mapSaveName}
            onChange={({ target: { value: mapSaveName } }) => this.setState(() => ({mapSaveName}))}
          />
        </Modal>
        {
          successTextAlert &&
          <div>
          <Alert
              message={successTextAlert}
              type="success"
              showIcon
              afterClose={() => this.setState(() => ({successTextAlert: ''}))}
            />
          </div>
        }
    </Layout>);
  }

  goToNew() {
    this.setState(() => ({fuckts: defaultFuckts, currentMapIndex: 1}));

    history.replace(`/fuckts/new`);
  }

  goToMap(name, idx) {
    this.setState(() => ({currentMapIndex: idx}));

    history.replace(`/fuckts/${name}`)
  }

  handleUpdateFucktValue(value) {
    this.setState(() => ({fucktValue: value}));
  }

  handleCreateFuckt(fuckt) {
    const {fuckts} = this.state;
    const fucktValue = '';

    fuckts.push(newFuckt(fuckt));

    this.setState(() => ({fuckts, fucktValue}));
  }

  handleCahngeFuckt(value, fuckt) {
    const {fuckts} = this.state;

    const idx = fuckts.findIndex(f => f.id === fuckt.id);

    fuckts.splice(idx, 1, newFuckt(value, {...fuckt}));

    this.setState(() => ({fuckts}));
  }

  handleCloseFuckt(fuckt) {
    const {fuckts} = this.state;

    const idx = fuckts.findIndex(f => f.id === fuckt.id);

    fuckts[idx].deleted = true;

    this.setState(() => ({fuckts}));
  }

  handleClickDragFuckt(fuckt) {
    const {fuckts} = this.state;

    const updated = fuckts.map(f => {
      if (f.id === fuckt.id) {
        f.zIndex = Z_INDEX_COUNTER++;
      }

      return f;
    });

    this.setState(() => ({fuckts: updated}));
  }

  handleUpdateFucktCoords(e, fuckt) {
    const node = e.path[2];
    const nodeTransform = node.style.transform;

    const [x, y] = nodeTransform
      .replace('translate(', '')
      .replace(')', '')
      .replace('px,', '')
      .replace('px', '')
      .split(' ');

    const {fuckts} = this.state;
    const idx = fuckts.findIndex(f => f.id === fuckt.id);
    fuckts[idx].pos = {x: +x, y: +y};

    this.setState(() => ({fuckts}));
  }

  triggerSaveMap() {
    const {match: {params: {pov} = {}} = {}} = this.props;

    if (pov !== 'new') {
      return this.handleSaveMapOk(pov);
    }

    this.setState(() => ({saveMapModalIsVisible: true}))
  }

  toggleSaveMap() {
    const {saveMapModalIsVisible} = this.state;

    this.setState(() => ({saveMapModalIsVisible: !saveMapModalIsVisible}))
  }

  handleSaveMapOk(pov) {
    const {mapSaveName = pov, fuckts} = this.state;
    const mapSaveNameFormatted = mapSaveName.replace(/\s/g, '_');

    const storedNames = JSON.parse(
      localStorage.getItem(FUCKT_MAP_NAMES) || '[]'
    );

    if (storedNames.indexOf(mapSaveNameFormatted) === -1) {
      storedNames.push(mapSaveNameFormatted);
    }

    localStorage.setItem(FUCKT_MAP_NAMES, JSON.stringify(storedNames));

    localStorage.setItem(
      `${FUCKT_MAP_KEY}${mapSaveNameFormatted}`,
      JSON.stringify({
        id: Date.now() + ID_SEQUENCE++,
        name: mapSaveName,
        mapSaveNameFormatted,
        fuckts
      })
    );

    this.setState(() => ({
      mapSaveName: undefined,
      saveMapModalIsVisible: false,
      successTextAlert: 'Карта сохранена'
    }));

    setTimeout(() => this.setState(() => ({successTextAlert: ''})), ALERT_DURATION);

    if (!pov) {
      history.replace(`/fuckts/${mapSaveNameFormatted}`);
    }
  }
}

export default PovPage;
