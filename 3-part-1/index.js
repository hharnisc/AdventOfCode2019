const fs = require('fs')

const wires = fs.readFileSync(process.argv[2])
                .toString()
                .split('\n')
                .filter(wire => wire !== '')
                .map(wire => wire.split(',').map(turn => [turn[0], parseInt(turn.slice(1))]))

const calcWirePath = (wire) => {
  let wirePath = new Set()
  let curPos = {
    x: 0,
    y: 0,
  }
  wire.forEach(turn => {
    let newYPos, newXPos
    switch(turn[0]) {
      case 'U':
        newYPos = curPos.y + turn[1]
        for(let i = curPos.y; i <= newYPos; i++) {
          wirePath.add(JSON.stringify({ x: curPos.x, y: i }))
        }
        curPos.y = newYPos
        break
      case 'D':
        newYPos = curPos.y - turn[1]
        for(let i = curPos.y; i >= newYPos; i--) {
          wirePath.add(JSON.stringify({ x: curPos.x, y: i }))
        }
        curPos.y = newYPos 
        break
      case 'R':
        newXPos = curPos.x + turn[1]
        for(let i = curPos.x; i <= newXPos; i++) {
          wirePath.add(JSON.stringify({ x: i, y: curPos.y }))
        }
        curPos.x = newXPos
        break
      case 'L':
        newXPos = curPos.x - turn[1]
        for(let i = curPos.x; i >= newXPos; i--) {
          wirePath.add(JSON.stringify({ x: i, y: curPos.y }))
        }
        curPos.x = newXPos
        break
    }
  })
  return wirePath
}
const calcClosestIntersectionDistance = (wirePath1, wirePath2) => {
  let distance = Number.MAX_SAFE_INTEGER
  wirePath1.forEach(pos => {
    if(wirePath2.has(pos)) {
      const { x, y } = JSON.parse(pos)
      if((x !== 0 || y !== 0) && (Math.abs(x) + Math.abs(y) < distance)) {
        distance = Math.abs(x) + Math.abs(y)
      }
    }
  })
  return distance
}

console.log(calcClosestIntersectionDistance(calcWirePath(wires[0]), calcWirePath(wires[1])))
