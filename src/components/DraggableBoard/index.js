import React, { useState } from 'react';
import { findDOMNode } from 'react-dom';
import Draggable from 'react-draggable';

import { Fuckt } from 'components';
import {
  isCtrlC,
  newFuckt,
  getCoordsFromNode,
  getMaxZIndex
} from 'utils';

export const DraggableBoard = ({
  style,
  fuckts,
  onUpdate,
  zoomOut
}) => {
  const [movedFuckt, setMovedFuckt] = useState(null);

  const updateFuckts = (fuckts, fuckt) => {
    onUpdate([].concat(fuckts, fuckt || []));
  }

  const handleAreaKeyDown = e => {
    if (!isCtrlC(e)) return;

    const selected = fuckts
      .filter(f => !f.deleted)
      .find(f => f.selected);

    if (!selected) return;

    const nf = newFuckt(
      selected.text, {
      ...selected,
      defaultPosition: {
        x: selected.defaultPosition.x + 50,
        y: selected.defaultPosition.y + 50
      }
    });

    updateFuckts(fuckts, nf);
  }

  const handleUpdateFucktCoords = fuckt => {
    const node = findDOMNode(movedFuckt);

    if (!node) return;

    const [x, y] = getCoordsFromNode(node);

    const idx = fuckts.findIndex(f => f.id === fuckt.id);
    fuckts[idx].pos = { x: +x, y: +y };

    updateFuckts(fuckts);
  }

  const handleClickDragFuckt = fuckt => {
    fuckts.map(f => {
      if (f.id === fuckt.id) {
        f.selected = true;
        f.zIndex = getMaxZIndex(fuckts);
      } else {
        f.selected = false;
      }

      return f;
    });

    updateFuckts(fuckts);
  }

  const handleCahngeFuckt = (value, fuckt) => {
    const idx = fuckts.findIndex(f => f.id === fuckt.id);
    fuckts[idx].text = value;

    updateFuckts(fuckts);
  }

  const handleCloseFuckt = fuckt => {
    const idx = fuckts.findIndex(f => f.id === fuckt.id);

    fuckts[idx].deleted = true;

    updateFuckts(fuckts);
  }

  return <div className="draggable-area"
    style={style.content.div}
    onKeyDown={handleAreaKeyDown}>
    {
      fuckts.map((f, idx) => (
        <Draggable key={f.id}
          bounds='.draggable-area'
          handle=".paper__drag-place"
          defaultPosition={f.defaultPosition}
          onStart={({ currentTarget: t }) => setMovedFuckt(t)}
          onStop={() => handleUpdateFucktCoords(f)}
        >
          <div
            style={{
              ...style.draggable.wrapper,
              zIndex: f.zIndex,
              opacity: f.deleted ? 0 : 1,
              pointerEvents: f.deleted ? 'none' : 'auto'
            }}
            onClick={() => handleClickDragFuckt(f)}
          >
            <Fuckt
              zoomOut={zoomOut}
              fuckt={f}
              onFucktChange={handleCahngeFuckt}
              onCloseClick={handleCloseFuckt}
            />
          </div>
        </Draggable>))
    }
  </div>
}
