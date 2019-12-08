const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
    input: fs.createReadStream('input.txt')
})

let fuel = 0

const calcModule = (mass) => {
  let curMass = Math.floor(mass / 3) - 2
  if (curMass > 0) {
    return curMass + calcModule(curMass)
  }
  return 0
}


rl.on('line', function(line) {
  const mass = parseInt(line, 10)
  //fuel += Math.floor(mass / 3) - 2
  fuel += calcModule(mass)
})

// end
rl.on('close', function(line) {
    console.log('Total fuel : ' + fuel)
})

