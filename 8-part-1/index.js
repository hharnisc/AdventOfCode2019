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

const layers = pixelsToLayers([...pixels], 25, 6)
const leastZeroLayer = {
  layerIndex: null,
  leastZeros: Number.MAX_SAFE_INTEGER,
}

layers.forEach((layer, i) => {
  let zeroCount = 0
  layer.forEach(row => {
    zeroCount += row.reduce((a, c) => c === 0 ? a + 1 : a, 0)
  })
  if(zeroCount < leastZeroLayer.leastZeros) {
    leastZeroLayer.leastZeros = zeroCount
    leastZeroLayer.layerIndex = i
  }
})

const {ones, twos} = layers[leastZeroLayer.layerIndex].reduce((acc, row) => {
  const { ones, twos } = row.reduce((rowAcc, pixel) => {
    if(pixel === 1) {
      rowAcc.ones += 1
      return rowAcc
    }
    if(pixel === 2) {
      rowAcc.twos += 1
      return rowAcc
    }
    return rowAcc
  }, {ones: 0, twos: 0})
  acc.ones += ones
  acc.twos += twos
  return acc
}, { ones: 0, twos: 0})
console.log(ones * twos)
