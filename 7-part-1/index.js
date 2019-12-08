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
    case 7:
    case 8:
      return 4
      break
    case 3:
    case 4:
      return 2
      break
    case 5:
    case 6:
      return 3
      break
    default:
      return 4
      break
  }
}

const runProgram = (ops, phase, input) => {
  const opsCopy = [...ops]
  let idx = 0
  let usedPhase = false
  while (idx <= opsCopy.length) {
    const [op, mode0, mode1, mode2] = parseInstruction(opsCopy[idx])
    const offset = calcOpOffset(op)
    let p0, p1, p2, val0, val1
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
        opsCopy[p0] = usedPhase ? input : phase
        usedPhase = true
        break
      case 4:
        p0 = opsCopy[idx + 1]
        return mode0 ? p0 : opsCopy[p0]
        break
      case 5:
        [p0, p1] = opsCopy.slice(idx + 1, idx + 1 + offset)
        if((mode0 ? p0 : opsCopy[p0])) {
          idx = (mode1 ? p1 : opsCopy[p1]) - offset // remove offset, since we'll add it back
        }
        break
      case 6:
        [p0, p1] = opsCopy.slice(idx + 1, idx + 1 + offset)
        if(!(mode0 ? p0 : opsCopy[p0])) {
          idx = (mode1 ? p1 : opsCopy[p1]) - offset // remove offset, since we'll add it back
        }
        break
      case 7:
        [p0, p1, p2] = opsCopy.slice(idx + 1, idx + 1 + offset)
        val0 = mode0 ? p0 : opsCopy[p0]
        val1 = mode1 ? p1 : opsCopy[p1]
        opsCopy[p2] = val0 < val1 ? 1 : 0
        break
      case 8:
        [p0, p1, p2] = opsCopy.slice(idx + 1, idx + 1 + offset)
        val0 = mode0 ? p0 : opsCopy[p0]
        val1 = mode1 ? p1 : opsCopy[p1]
        opsCopy[p2] = val0 === val1 ? 1 : 0
        break
      case 99:
        process.exit(0)
    }
    idx += offset
  }
}

const generatePermutations = (input) => {
  const permutations = []
  const generate = (arr, curPermutation = []) => {
    if(arr.length === 0) {
      permutations.push(curPermutation)
    } else {
      for (let i = 0; i < arr.length; i++) {
        const start = [...arr]
        const end = start.splice(i, 1)
        generate([...start], curPermutation.concat(end))
      }
    }
  }
  generate(input)
  return permutations
}
let maxThrust = -1
const permutations = generatePermutations([0,1,2,3,4])
permutations.forEach(permutation => {
  let out = runProgram(ops, permutation[0], 0)
  out = runProgram(ops, permutation[1], out)
  out = runProgram(ops, permutation[2], out)
  out = runProgram(ops, permutation[3], out)
  out = runProgram(ops, permutation[4], out)
  if(out > maxThrust) {
    maxThrust = out
  }
})
console.log(maxThrust)
