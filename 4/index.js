// 372304-847060

const checkNumber = (num) => {
  const splitNum = num.toString().split('')
  let sameCount = 1
  let hasDouble = false
  // check number is only increasing
  for(let i = 0; i < splitNum.length; i++) {
    if(splitNum[i] > splitNum[i+1]) {
      return false
    }
    if(splitNum[i] === splitNum[i+1]) {
      sameCount += 1
    } else {
      if (sameCount === 2) {
        hasDouble = true
      }
      sameCount = 1
    }
  }
  if(!hasDouble) {
    return false
  }
  return true
}

let count = 0
for(let i = 372304; i <= 847060; i++) {
  if(checkNumber(i)) {
    console.log(i)
    count += 1
  }
}
console.log(count)
