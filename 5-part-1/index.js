const fs = require('fs')

const ops = fs.readFileSync('./input.txt')
              .toString()
              .split(',')
              .map(Number)

const parseInstruction = (ins) => {
  const [mode2, mode1, mode0, op2, op1] = ins.toString()
                                             .padStart(5, '0')
                                             .split('')
                                             .map(str => parseInt(str))
  return [op1 + op2 * 10, mode0, mode1, mode2]
}

const calcOpOffset = (op) => {
  switch (op) {
    case 1:
    case 2:
      return 4
      break
    case 3:
    case 4:
      return 2
      break
    default:
      return 4
      break
  }
}

const runProgram = (ops, inputNoun, inputVerb) => {
  const opsCopy = [...ops]
  let idx = 0
  while (idx <= opsCopy.length) {
    const [op, mode0, mode1, mode2] = parseInstruction(opsCopy[idx])
    const offset = calcOpOffset(op)
    let p0, p1, p2, position
    switch (op) {
      case 1:
        [p0, p1, p2] = opsCopy.slice(idx + 1, idx + 1 + offset)
        opsCopy[p2] = (mode0 ? p0 : opsCopy[p0]) + (mode1 ? p1 : opsCopy[p1])
        break
      case 2:
        [p0, p1, p2] = opsCopy.slice(idx + 1, idx + 1 + offset)
        opsCopy[p2] = (mode0 ? p0 : opsCopy[p0]) * (mode1 ? p1 : opsCopy[p1])
        break
      case 3:
        p0 = opsCopy[idx + 1]
        opsCopy[p0] = 1 // user input 1
        break
      case 4:
        p0 = opsCopy[idx + 1]
        console.log(mode0 ? p0 : opsCopy[p0])
        break
      case 99:
        process.exit(0)
    }
    idx += offset
  }
}

runProgram(ops)
