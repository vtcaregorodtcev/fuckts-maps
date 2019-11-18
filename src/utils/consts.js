export const ALERT_DURATION = 5000;
export const FUCKT_MAP_NAMES = 'FUCKT_MAP_NAMES';
export const FUCKT_MAP_KEY = 'FUCKT_MAP_KEY_';

export function nextSeq() {
  return Math.floor(Math.random() * 100000);
}

export function nextId() {
  return Date.now() + nextSeq();
}

export function newFuckt(text, options = {}) {
  return {
    ...options,
    text,
    id: Date.now() + nextSeq(),
  };
}

export const DEFAULT_FUCKTS = [
  newFuckt('Кликни на меня!', {
    defaultPosition: { x: 400, y: 70 },
  }),
  newFuckt('Привет, добавь пару фактов о себе!', {
    defaultPosition: { x: 100, y: 100 },
  }),
  newFuckt('Ты можешь двигать нас как захочешь!', {
    defaultPosition: { x: 305, y: 130 },
  }),
  newFuckt('Потяни мышкой за край листочка!', {
    defaultPosition: { x: 150, y: 225 },
  }),
];
