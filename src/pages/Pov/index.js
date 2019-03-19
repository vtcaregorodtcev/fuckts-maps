import React from 'react';
import {findDOMNode} from 'react-dom';
import Draggable from 'react-draggable';

import {
  Layout,
  Menu,
  Icon,
  Input,
  Modal,
  Alert
} from 'antd';

import {Fuckt, Zoom} from 'components';
import style from './style';
import {history} from '_helpers';

const {Content, Sider} = Layout;
const confirm = Modal.confirm;
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
    currentMapIndex: 1,
    zoomOut: 0
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

    if (pov === 'new' && prevState.pov !== 'new') {
      return {
        pov,
        zoomOut: 0,
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

      const {fuckts, zoomOut = 0} = fucktsMap;
      const currentMapIndex = allFucktMaps.findIndex(fm => fm.id === fucktsMap.id) + 3;

      return {
        pov,
        zoomOut,
        allFucktMaps,
        currentMapIndex,
        fuckts: fuckts && fuckts.length
          ? fuckts.map(f => {
              f.defaultPosition = f.pos;

              return f;
            })
          : []
      };
    }

    return null;
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
      currentMapIndex,
      zoomOut
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
            <span>Сохранить карту</span>
          </Menu.Item>
          {
            allFucktMaps.map((fm, idx) => (
              <Menu.Item key={idx+3} onClick={() => this.goToMap(fm.mapSaveNameFormatted, idx+3)}>
                <Icon type="copy"/>
                <span>{fm.name}</span>
              </Menu.Item>
            ))
          }
          <Menu.Item key="1000" onClick={() => this.triggerDeleteMap()}>
            <Icon type="delete" />
            <span>Удалить карту</span>
          </Menu.Item>
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
        <div className="draggable-area" style={style.content.div} onKeyDown={e => this.handleAreaKeyDown(e)}>
          {
            fuckts.map((f, idx) => (
              <Draggable key={f.id}
                bounds='.draggable-area'
                handle=".paper__drag-place"
                defaultPosition={f.defaultPosition}
                onStart={e => this.handleUpdateFucktCoordsFromStart(e)}
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
                    zoomOut={zoomOut}
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
        <span style={
          {
            ...style.zoom,
            ...(
              !collapsed
                ? style.notCollapsedZoom
                : {}
              )
          }
        }>
          <Zoom
            onPlus={() => this.handleZoom(-10)}
            onMinus={() => this.handleZoom(10)}
          />
        </span>
    </Layout>);
  }

  handleAreaKeyDown(e) {
    const charCode = String.fromCharCode(e.which).toLowerCase();

    if ((e.ctrlKey || e.metaKey) && charCode === 'c') {
      const {fuckts} = this.state;

      const selected = fuckts.find(f => f.selected);
      if (selected && !selected.deleted) {
        fuckts.push(
          newFuckt(selected.text, {...selected, defaultPosition: {x: 30, y: 30}})
        );

        this.setState(() => ({fuckts}));
      }
    }
  }

  handleZoom(val) {
    let {zoomOut} = this.state;
    zoomOut += val;

    if (zoomOut > 50) {
      zoomOut = 50;
    }

    if (zoomOut < 0) {
      zoomOut = 0;
    }

    this.setState(() => ({zoomOut}));
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
    fuckts[idx].text = value;

    this.setState(() => ({fuckts}));
  }

  handleCloseFuckt(fuckt) {
    const {fuckts} = this.state;

    const idx = fuckts.findIndex(f => f.id === fuckt.id);

    fuckts[idx].deleted = true;

    this.setState(() => ({fuckts}));
  }

  handleClickDragFuckt(fuckt) {
    const {fuckts} = this.selectFuckt(fuckt);

    const idx = fuckts.findIndex(f => f.id === fuckt.id);

    fuckts[idx].zIndex = Math.max.apply(null, fuckts.map(f => f.zIndex || 0)) + 1;

    this.setState(() => ({fuckts}));
  }

  selectFuckt(fuckt) {
    const {fuckts} = this.state;

    fuckts.map(f => {
      f.selected = f.id === fuckt.id;
    });

    return {fuckts};
  }

  handleUpdateFucktCoordsFromStart(e) {
    this.movedFuckt = e.currentTarget;
  }

  handleUpdateFucktCoords(e, fuckt) {
    const node = findDOMNode(this.movedFuckt);

    if (!node) return;

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

  triggerDeleteMap() {
    const {match: {params: {pov} = {}} = {}} = this.props;
    const toNew = () => this.goToNew();

    if (pov !== 'new') {
      const fucktsMap = JSON.parse(
        localStorage.getItem(`${FUCKT_MAP_KEY}${pov}`) || '{}'
      );

      confirm({
        title: `Хочешь удалить карту '${fucktsMap.name}'?`,
        content: 'Её больше нельзя будет восстановить',
        okText: 'Да, давай',
        okType: 'danger',
        cancelText: 'Ой, нет!',
        onOk() {
          const storedNames = JSON.parse(
            localStorage.getItem(FUCKT_MAP_NAMES) || '[]'
          );

          const nameIdx = storedNames.indexOf(pov);
          storedNames.splice(nameIdx, 1);

          localStorage.setItem(FUCKT_MAP_NAMES, JSON.stringify(storedNames));
          localStorage.setItem(`${FUCKT_MAP_KEY}${pov}`, '');

          toNew();
        }
      });
    }
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
    const {mapSaveName = pov, fuckts, zoomOut} = this.state;
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
        fuckts,
        zoomOut
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
