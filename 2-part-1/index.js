const fs = require('fs')

const ops = fs.readFileSync('./input.txt')
              .toString()
              .split(',')
              .map(Number)
ops[1] = 12
ops[2] = 2
const offset = 4
let idx = 0
while (idx <= ops.length) {
  const [op, num1, num2, position] = ops.slice(idx, idx + offset)
  switch (op) {
    case 1:
      ops[position] = ops[num1] + ops[num2]
      break
    case 2:
      ops[position] = ops[num1] * ops[num2]
      break
    case 99:
      idx += ops.length
      break
  }
  idx += offset
}

console.log(ops[0])
