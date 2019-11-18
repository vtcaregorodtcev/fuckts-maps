import {
  FUCKT_MAP_NAMES,
  FUCKT_MAP_KEY,
  DEFAULT_FUCKTS,
  nextId,
  newFuckt,
} from './consts';

export { newFuckt, nextId };

export function isCtrlC(e) {
  const charCode = String.fromCharCode(e.which).toLowerCase();

  return (e.ctrlKey || e.metaKey) && charCode === 'c';
}

export function getFucktsMap(map) {
  const ls =
    localStorage.getItem(`${FUCKT_MAP_KEY}${decodeURIComponent(map)}`) || '{}';

  return JSON.parse(ls);
}

export function getAllMaps() {
  const ls = localStorage.getItem(FUCKT_MAP_NAMES) || '[]';

  const storedNames = JSON.parse(ls);

  return storedNames.map(name => getFucktsMap(name));
}

export function updateZoom(zoomOutVal, val) {
  let zoomOut = zoomOutVal + val;

  if (zoomOut > 50) {
    zoomOut = 50;
  }

  if (zoomOut < 0) {
    zoomOut = 0;
  }

  return zoomOut;
}

export function getFucktsPathname() {
  return window.location.hash.replace('#', '');
}

export function getCurrentMap() {
  return getFucktsPathname().replace('/fuckts/', '');
}

export function eraseFucktsMap(map) {
  const ls = localStorage.getItem(FUCKT_MAP_NAMES) || '[]';

  const storedNames = JSON.parse(ls);

  const nameIdx = storedNames.indexOf(map);
  storedNames.splice(nameIdx, 1);

  localStorage.setItem(FUCKT_MAP_NAMES, JSON.stringify(storedNames));
  localStorage.setItem(`${FUCKT_MAP_KEY}${map}`, '');
}

export function saveMap(mapSaveName, mapSaveNameFormatted, fuckts, zoomOut) {
  const ls = localStorage.getItem(FUCKT_MAP_NAMES) || '[]';
  const storedNames = JSON.parse(ls);

  if (storedNames.indexOf(mapSaveNameFormatted) === -1) {
    storedNames.push(mapSaveNameFormatted);
  }

  localStorage.setItem(FUCKT_MAP_NAMES, JSON.stringify(storedNames));

  const map = {
    id: nextId(),
    name: mapSaveName,
    mapSaveNameFormatted,
    fuckts,
    zoomOut,
  };

  localStorage.setItem(
    `${FUCKT_MAP_KEY}${mapSaveNameFormatted}`,
    JSON.stringify(map),
  );
}

export function getCoordsFromNode(node) {
  const nodeTransform = node.style.transform;

  return nodeTransform
    .replace('translate(', '')
    .replace(')', '')
    .replace('px,', '')
    .replace('px', '')
    .split(' ');
}

export function getMaxZIndex(fuckts = []) {
  return (
    Math.max.apply(null, fuckts.length ? fuckts.map(f => f.zIndex || 0) : [0]) +
    1
  );
}

export function getMenuMapIndex(mapName) {
  const map = getFucktsMap(mapName);

  return getAllMaps().findIndex(fm => fm.id === map.id) + 3;
}

export function regenDefaultFuckts() {
  return DEFAULT_FUCKTS.map(f => ({
    ...f,
    id: nextId(),
  }));
}

export function reassignPosToDefault(f) {
  return {
    ...f,
    defaultPosition: f.pos,
  };
}
