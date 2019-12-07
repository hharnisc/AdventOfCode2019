const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
    input: fs.createReadStream('input.txt')
})

let fuel = 0
rl.on('line', function(line) {
  const mass = parseInt(line, 10)
  fuel += Math.floor(mass / 3) - 2
})

// end
rl.on('close', function(line) {
    console.log('Total fuel : ' + fuel)
})

