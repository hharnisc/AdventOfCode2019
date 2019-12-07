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
  let stepMap = {}
  let curStep = 0
  wire.forEach(turn => {
    let newYPos, newXPos
    switch(turn[0]) {
      case 'U':
        newYPos = curPos.y + turn[1]
        for(let i = curPos.y + 1; i <= newYPos; i++) {
          const pos = JSON.stringify({ x: curPos.x, y: i })
          wirePath.add(pos)
          stepMap[pos] = ++curStep
        }
        curPos.y = newYPos
        break
      case 'D':
        newYPos = curPos.y - turn[1]
        for(let i = curPos.y - 1; i >= newYPos; i--) {
          const pos = JSON.stringify({ x: curPos.x, y: i })
          wirePath.add(pos)
          stepMap[pos] = ++curStep
        }
        curPos.y = newYPos 
        break
      case 'R':
        newXPos = curPos.x + turn[1]
        for(let i = curPos.x + 1; i <= newXPos; i++) {
          const pos = JSON.stringify({ x: i, y: curPos.y })
          wirePath.add(pos)
          stepMap[pos] = ++curStep
        }
        curPos.x = newXPos
        break
      case 'L':
        newXPos = curPos.x - turn[1]
        for(let i = curPos.x - 1; i >= newXPos; i--) {
          const pos = JSON.stringify({ x: i, y: curPos.y })
          wirePath.add(pos)
          stepMap[pos] = ++curStep
        }
        curPos.x = newXPos
        break
    }
  })
  return { wirePath, stepMap }
}
const calcClosestIntersectionDistance = (wire1, wire2) => {
  const { wirePath: wirePath1, stepMap: stepMap1 } = wire1
  const { wirePath: wirePath2, stepMap: stepMap2 } = wire2
  let steps = Number.MAX_SAFE_INTEGER
  wirePath1.forEach(pos => {
    if(wirePath2.has(pos)) {
      const { x, y } = JSON.parse(pos)
      if((x !== 0 || y !== 0) && (stepMap1[pos] + stepMap2[pos] < steps)) {
        steps = stepMap1[pos] + stepMap2[pos]
      }
    }
  })
  return steps
}

console.log(calcClosestIntersectionDistance(calcWirePath(wires[0]), calcWirePath(wires[1])))
