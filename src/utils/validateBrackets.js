export default function validateBrackets(str) {
 let bigBracesBalance = 0;
 let mediumBracesBalance = 0;
 let smallBracesBalance = 0;
 let isValid = true;
 for(let i = 0; i < str.length; i ++) {
  const ch = str[i];
  if(ch === "{") {
    // brackers order: small and medium are invalid if are before big
    if(mediumBracesBalance !== 0 || smallBracesBalance !== 0) {
      isValid = false;
    }
    bigBracesBalance ++;
  } else if(ch === "}") {
    // brackets order: smallest brackets close first
    if(mediumBracesBalance !== 0 || smallBracesBalance !== 0) {
      isValid = false;
    }
    bigBracesBalance --;
  }

  if(ch === "[") {
    mediumBracesBalance ++;
    // brackers order: small brackets are invalid if are before medium
    if(smallBracesBalance !== 0) {
      isValid = false;
    }
  } else if(ch === "]") {
      // [()]
     // brackets order: smallest brackets close first
     if(smallBracesBalance !== 0) {
      isValid = false;
    }
    mediumBracesBalance --;
  }

  if(ch === "(") {
    smallBracesBalance ++;
  } else if(ch === ")") {
    smallBracesBalance --;
  }
  // console.log(i, bigBracesBalance, mediumBracesBalance, smallBracesBalance);
  }
  if(!isValid || 
    smallBracesBalance !== 0 || 
    mediumBracesBalance !== 0 ||
    bigBracesBalance !== 0
  ) {
    isValid = false;
  }
  return isValid;
}