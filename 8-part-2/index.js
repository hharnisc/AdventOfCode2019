const fs = require('fs')

const pixels = fs.readFileSync('./input.txt')
              .toString()
              .split('')
              .filter(pixel => pixel !== '\n')
              .map(Number)

const pixelsToLayers = (pixs, width, height) => {
  const layers = []
  while (pixs.length) {
    const layer = []
    for(let i = 0; i < height; i++) {
      layer.push(pixs.splice(0, width))
    }
    layers.push(layer)
  }
  return layers
}
const width = 25
const height = 6
const layers = pixelsToLayers([...pixels], width, height)
const leastZeroLayer = {
  layerIndex: null,
  leastZeros: Number.MAX_SAFE_INTEGER,
}

const image = new Array(height).fill(0).map(() => new Array(width).fill(2))
for(let i = 0; i < width; i++) {
  for(let j = 0; j < height; j++) {
    for(let k = 0; k < layers.length; k++) {
      const curPixel = layers[k][j][i]
      if (curPixel !== 2 || k === layers.length - 1) {
        image[j][i] = curPixel
        break
      }
    }
  }
}
console.log(image)
