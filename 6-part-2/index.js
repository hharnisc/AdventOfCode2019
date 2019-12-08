const fs = require('fs')

const orbits = fs.readFileSync(process.argv[2])
                 .toString()
                 .split('\n')
                 .filter(orbit => orbit)
                 .map(orbit => orbit.split(')'))

const initGraph = (orbits) => {
  const graph = {
    out: {},
    in: {},
  }
  orbits.forEach(([start, end]) => {
    const curOutEdges = graph.out[start]
    if(!curOutEdges) {
      graph.out[start] = [end]
    } else {
      curOutEdges.push(end)
    }

    const curInEdges = graph.in[end]
    if(!curInEdges) {
      graph.in[end] = [start]
    } else {
      curInEdges.push(start)
    }
  })

  return graph
}


const leastTransfers = (graph, start, target, visited, curDistance) => {
  curDistance += 1
  const outEdges = graph.out[start]
  if (outEdges) {
    for(let i = 0; i <= outEdges.length; i++) {
      const nextNode = outEdges[i]
      if (visited[nextNode]) {
        continue
      }
      if (nextNode === target) {
        return curDistance
      }
      visited[nextNode] = true
      let foundCurDistance = leastTransfers(graph, nextNode, target, visited, curDistance)
      if (foundCurDistance) {
        return foundCurDistance
      }
    }
  }

  const inEdges = graph.in[start]
  if (inEdges) {
    for(let i = 0; i <= inEdges.length; i++) {
      const nextNode = inEdges[i]
      if (visited[nextNode]) {
        continue
      }
      if (nextNode === target) {
        return curDistance
      }
      visited[nextNode] = true
      let foundCurDistance = leastTransfers(graph, nextNode, target, visited, curDistance)
      if (foundCurDistance) {
        return foundCurDistance
      }
    }
  }
}

const graph = initGraph(orbits)

console.log(leastTransfers(graph, 'YOU', 'SAN', {}, 0) - 2)
