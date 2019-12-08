const fs = require('fs')

const orbits = fs.readFileSync(process.argv[2])
                 .toString()
                 .split('\n')
                 .filter(orbit => orbit)
                 .map(orbit => orbit.split(')'))

const initGraph = (orbits) => {
  const graph = {}
  orbits.forEach(([start, end]) => {
    const curEdges = graph[start]
    if(!curEdges) {
      graph[start] = [end]
    } else {
      curEdges.push(end)
    }
  })

  return graph
}

const countOrbits = (graph, curVertex, curDistance, totalDistance) => {
  const edges = graph[curVertex]
  if(edges) {
    curDistance++
    totalDistance += edges.length * curDistance
    edges.forEach(nextVertex => {
      totalDistance = countOrbits(graph, nextVertex, curDistance, totalDistance)
    })
  }
  return totalDistance
}

const graph = initGraph(orbits)

console.log(countOrbits(graph, 'COM', 0, 0))
