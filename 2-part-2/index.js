const fs = require('fs')

const ops = fs.readFileSync('./input.txt')
              .toString()
              .split(',')
              .map(Number)

const calc = (ops, inputNoun, inputVerb) => {
  const opsCopy = [...ops]
  opsCopy[1] = inputNoun
  opsCopy[2] = inputVerb
  const offset = 4
  let idx = 0
  while (idx <= opsCopy.length) {
    const [op, num1, num2, position] = opsCopy.slice(idx, idx + offset)
    switch (op) {
      case 1:
        opsCopy[position] = opsCopy[num1] + opsCopy[num2]
        break
      case 2:
        opsCopy[position] = opsCopy[num1] * opsCopy[num2]
        break
      case 99:
        idx += opsCopy.length
        break
    }
    idx += offset
  }
  return opsCopy[0]
}
for (let noun = 0; noun < 100; noun++) {
  for (let verb = 0; verb < 100; verb++) {
    if(calc(ops, noun, verb) === 19690720) {
      console.log(noun * 100 + verb)
    }
  }
}
