function primeDividers(n) {
  const primeDividers = []
  let remainder = n;
  while (remainder > 1) {
    for(let primeDivider = 2; primeDivider <= n; primeDivider ++) {
      if(remainder % primeDivider === 0) {
        primeDividers.push(primeDivider)
        remainder /= primeDivider;
        break;
      }
    }
  }
  console.log([...new Set(primeDividers)].join(", "))
}

/* Passed Examples:
primeDividers(15)
primeDividers(11)
primeDividers(12)
*/
