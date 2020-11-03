const PI = 3.1415926535898
const R = (a, n) => (0.5) * a * (1 / Math.sin(PI / n))

const getPolygonCoordinates = (origin, sideLength, sideCount) => {
  const r = R(sideLength, sideCount)
  const y = (2 * PI) / sideCount

  const points = []

  const p = {
    x: origin.x,
    y: origin.y - r
  }

  points.push(p)

  for (let i = 1; i < sideCount; i++) {
    const px = (Math.cos(y * i) * (p.x - origin.x)) - (Math.sin(y * i) * (p.y - origin.y)) + origin.x
    const py = (Math.sin(y * i) * (p.x - origin.x)) + (Math.cos(y * i) * (p.y - origin.y)) + origin.y
    points.push({
      x: px,
      y: py
    })
  }
  return points.map(p => [p.x, p.y])
}

export default getPolygonCoordinates
