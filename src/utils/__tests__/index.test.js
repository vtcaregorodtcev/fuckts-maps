import {
  newFuckt,
  nextId,
  isCtrlC,
  getAllMaps,
  saveMap,
  getFucktsMap,
  updateZoom,
  getCurrentMap,
  eraseFucktsMap,
  getCoordsFromNode,
  getMaxZIndex,
  getMenuMapIndex
} from '../index';

describe('main utils for fuckts map', () => {

  beforeAll(() => {
    const mock = (() => {
      let store = {}

      return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => store[key] = value.toString(),
        removeItem: (key) => delete store[key],
        clear: () => store = {}
      }
    })();

    Object.defineProperty(window, 'localStorage', { value: mock });
  });

  afterEach(() => window.localStorage.clear());

  it('should create plain object with params by creating new fuckt', () => {
    const received = newFuckt('test', { key: 'test' });
    const expected = { text: 'test', key: 'test' };

    delete received.id;

    expect(received).toEqual(expected);
  });

  it('should return random value', () => {
    const one = nextId();
    const two = nextId();

    expect(one).not.toEqual(two);
  });

  it('should return true if event is for ctrl/meta + c', () => {
    const e = { which: 67, ctrlKey: true };
    const e2 = { which: 99, ctrlKey: false, metaKey: true };
    const e3 = { which: 99, ctrlKey: false, metaKey: false };

    expect(isCtrlC(e)).toBe(true);
    expect(isCtrlC(e2)).toBe(true);
    expect(isCtrlC(e3)).toBe(false);
  });

  it('should return empty array of maps if nothing seeded', () => {
    const maps = getAllMaps();

    expect(maps).toEqual([]);
  });

  it('should return one map if one seeded', () => {
    saveMap('test', 'test_form', [newFuckt('test')], 0);

    const maps = getAllMaps();

    expect(maps.length).toEqual(1);
    expect(maps[0].fuckts[0].text).toBe('test');
  });

  it('should return map by name', () => {
    saveMap('test', 'test_form', [newFuckt('test')], 0);
    saveMap('llld', 'llld2', [newFuckt('llld2')], 0);

    const map = getFucktsMap('test_form');

    expect(map.name).toBe('test');
    expect(map.fuckts[0].text).toBe('test');

    const map2 = getFucktsMap('llld2');
    expect(map2.name).toBe('llld');
  });

  it('should update zoom in allowed frame', () => {
    const one = updateZoom(0, 10);

    expect(one).toBe(10);

    const two = updateZoom(one, 60);

    expect(two).toBe(50);

    const three = updateZoom(two, -100);

    expect(three).toBe(0);
  });

  it('should return correct current map name', () => {
    Object.defineProperty(window, 'location', { value: { hash: '#/fuckts/fu' } });

    const currentMap = getCurrentMap();
    expect(currentMap).toBe('fu');
  });

  it('should erase map from store', () => {
    saveMap('test', 'test_form', [newFuckt('test')], 0);
    saveMap('llld', 'llld2', [newFuckt('llld2')], 0);

    const maps = getAllMaps();
    expect(maps.length).toEqual(2);

    eraseFucktsMap('test_form');

    const maps2 = getAllMaps();
    expect(maps2.length).toEqual(1);
  });

  it('should return correct coords from node', () => {
    const node = { style: { transform: 'translate(40px, 50px)' } };

    const coords = getCoordsFromNode(node);

    expect(coords).toEqual(["40", "50"]);
  });

  it('should return max zIndex from array of objects', () => {
    const max = getMaxZIndex([]);

    expect(max).toBe(1);

    const max2 = getMaxZIndex([{ zIndex: 2 }, { zIndex: 4 }, { zIndex: 23 }]);

    expect(max2).toBe(24);
  });

  it('should return correct menu index', () => {
    saveMap('test', 'test_form', [newFuckt('test')], 0);
    saveMap('llld', 'llld2', [newFuckt('llld2')], 0);

    const idx = getMenuMapIndex('llld2');

    expect(idx).toBe(4); // 1 + 3.. skip new and save btn, also starts from 1
  });
});
