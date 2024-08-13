import {
  MouseSensor as DndKitLibMouseSensor,
  TouchSensor as DndKitLibTouchSensor
} from '@dnd-kit/core'

// Block DnD event propagation if element have "data-no-dnd" attribute
const handler = ({ nativeEvent: event }) => {
  let cur = event.targe

  while (cur) {
    if (cur.dataset && cur.dataset.noDnd) {
      return false
    }
    cur = cur.parentElement
  }

  return true
}

export class MouseSensor extends DndKitLibMouseSensor {
  static activators = [{ eventName: 'onMouseDown', handler }]
}

export class TouchSensor extends DndKitLibTouchSensor {
  static activators = [{ eventName: 'onTouchStart', handler }]
}
