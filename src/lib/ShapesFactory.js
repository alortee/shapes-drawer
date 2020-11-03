import { v4 as uuidv4 } from "uuid"
import getPolygonCoordinates from "./PolygonSolver"

const origin = {
  x: 0,
  y: 0
}

const commonAttributes = {
  "stroke": "#000000",
  "fill": "#ffffff",
  "stroke-width": "2"
}

const objects = {
  circle: {
    tag: "circle",
    cx: 0,
    cy: 0,
    r: 0,
    ...commonAttributes
  },
  rect: {
    tag: "rect",
    cx: 0,
    cy: 0,
    r: 0,
    ...commonAttributes
  },
  polygon: {
    tag: "polygon",
    points: null,
    ...commonAttributes
  }
}

export default {
  generateObject (tag, attributes = {}) {
    return {
      id: uuidv4(),
      tag,
      attributes: {
        ...objects[tag],
        ...attributes
      }
    }
  },
  generateCircle (center = origin, radius = 0) {
    const attributes = {
      cx: center.x,
      cy: center.y,
      r: radius
    }
    return {
      id: uuidv4(),
      tag: objects.circle.tag,
      center,
      attributes: {
        ...objects.circle,
        ...attributes
      }
    }
  },
  generateRectangle (center = origin, width = 0, height = 0) {
    const attributes = {
      x: center.x,
      y: center.y,
      width,
      height
    }
    return {
      id: uuidv4(),
      tag: objects.rect.tag,
      attributes: {
        ...objects.rect,
        ...attributes
      }
    }
  },
  generatePolygon (center = origin, sideCount = 0, sideLength = 0) {
    const points = getPolygonCoordinates(center, sideLength, sideCount)
    const attributes = {
      points: points.map(p => p.join(",")).join(" ")
    }
    return {
      id: uuidv4(),
      tag: objects.polygon.tag,
      center,
      sideLength,
      sideCount,
      attributes: {
        ...objects.polygon,
        ...attributes
      }
    }
  }
}
