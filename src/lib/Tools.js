import ShapesFactory from "./ShapesFactory"

import {
  ADD_OBJECT_TO_LAYER, SET_CURRENTLY_HOVERED_OBJECT_ID,
  SET_CURRENTLY_SELECTED_OBJECT_ID
} from "../store/mutation-types"

const coordinatesLiesWithinObjectBBox = (objectId, coordinates) => {
  const o = document.getElementById(objectId)
  if (!o) {
    return false
  }
  const bbox = o.getBBox()
  const { x, y } = coordinates
  const x1 = bbox.x
  const y1 = bbox.y + bbox.width
  const x2 = bbox.x + bbox.width
  const y2 = bbox.y
  return x >= x1 && x <= x2 && y <= y1 && y >= y2
}

const tools = {
  select: {
    hoverAction (coordinates, state) {
      let hoveredObjectId = null
      for (const objectId of state.objects.map(o => o.id).slice().reverse()) {
        if (coordinatesLiesWithinObjectBBox(objectId, coordinates)) {
          hoveredObjectId = objectId
          break
        }
      }
      return [
        {
          type: SET_CURRENTLY_HOVERED_OBJECT_ID,
          id: hoveredObjectId
        }
      ]
    },
    clickAction (coordinates, state) {
      let selectedObjectId = null
      for (const objectId of state.objects.map(o => o.id).slice().reverse()) {
        if (coordinatesLiesWithinObjectBBox(objectId, coordinates)) {
          selectedObjectId = objectId
          break
        }
      }
      return [
        {
          type: SET_CURRENTLY_SELECTED_OBJECT_ID,
          id: selectedObjectId
        }
      ]
    }
  },
  circle: {
    clickAction (coordinates) {
      const object = ShapesFactory.generateCircle(coordinates, 75)
      return [{
        type: ADD_OBJECT_TO_LAYER,
        object
      }]
    }
  },
  triangle: {
    clickAction (coordinates) {
      const object = ShapesFactory.generatePolygon(coordinates, 3, 150)
      return [{
        type: ADD_OBJECT_TO_LAYER,
        object
      }]
    }
  },
  rectangle: {
    clickAction (coordinates) {
      const object = ShapesFactory.generateRectangle(coordinates, 150, 150)
      return [{
        type: ADD_OBJECT_TO_LAYER,
        object
      }]
    }
  },
  pentagon: {
    clickAction (coordinates) {
      const object = ShapesFactory.generatePolygon(coordinates, 5, 150)
      return [{
        type: ADD_OBJECT_TO_LAYER,
        object
      }]
    }
  },
  hexagon: {
    clickAction (coordinates) {
      const object = ShapesFactory.generatePolygon(coordinates, 6, 150)
      return [{
        type: ADD_OBJECT_TO_LAYER,
        object
      }]
    }
  }
}

export default tools
