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

    const updatedFuckts = [].concat(fuckts, nf);

    onUpdate(updatedFuckts);
  }

  const handleUpdateFucktCoords = fuckt => {
    const node = findDOMNode(movedFuckt);

    if (!node) return;

    const [x, y] = getCoordsFromNode(node);

    const idx = fuckts.findIndex(f => f.id === fuckt.id);
    fuckts[idx].pos = { x: +x, y: +y };

    const updatedFuckts = [].concat(fuckts);

    onUpdate(updatedFuckts);
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

    const updatedFuckts = [].concat(fuckts);

    onUpdate(updatedFuckts);
  }

  const handleCahngeFuckt = (value, fuckt) => {
    const idx = fuckts.findIndex(f => f.id === fuckt.id);
    fuckts[idx].text = value;

    const updatedFuckts = [].concat(fuckts);

    onUpdate(updatedFuckts);
  }

  const handleCloseFuckt = fuckt => {
    const idx = fuckts.findIndex(f => f.id === fuckt.id);

    fuckts[idx].deleted = true;

    const updatedFuckts = [].concat(fuckts);

    onUpdate(updatedFuckts);
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
