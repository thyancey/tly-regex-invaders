const CHARACTERS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export const generateFromWordList = (requested = -1, wordList) => {
  let retVal = [];
  let numEntries = requested;
  if(requested < 0 || requested > wordList.length){
    numEntries = wordList.length;
  }
  
  for(let i = 0; i < numEntries; i++){
    retVal.push( wordList[Math.floor(Math.random() * wordList.length)] );
  }

  return retVal;
}
export const generateRandomTextEntries = (numEntries) => {
  let retVal = [];
  for(let i = 0; i < numEntries; i++){
    retVal.push(generateRandomTextEntry());
  }

  return retVal;
}

export const generateRandomTextEntry = (min = 3, max = 8) => {
  const thisLength = min + Math.round(Math.random() * (max - min));
  let retVal = [];
  for(let i = 0; i < thisLength; i++){
    retVal.push(getRandomFromString(CHARACTERS));
  }

  return retVal.join('');
}

const getRandomFromString = str => {
  return str[Math.floor(Math.random() * (str.length))]
}

export const matchThisString = (str1, str2) => {
  if(!str2){
    return false;
  }
  if(str1.indexOf(str2) > -1){
    return true;
  }else{
    return false;
  }
}

export const checkForValidRegex = (regexString) => {
  try{
    return new RegExp(regexString);
  }catch(e){
    return `${regexString}`;
  }
}

// export const matchThisRegex = (str1, regexString, onError) => {
//   console.log('matchThisRegex', str1, regexString)
//   if(!regexString){
//     return false;
//   }

//   try{
//     const re = new RegExp(regexString);
//     return str1.match(re);
//   }catch(e){
//     let message = `${regexString}`;
//     onError ? onError(message) : console.error(message);
//     return false;
//   }
// }


/* assuming group is shape below, only return items with matching idx
  [
    {
      idx:
    }
  ]
*/
export const matchWithinThisGroup = (group, text, onError) => {
  if(!text) return [];
  
  const regexResult = checkForValidRegex(text);
  if(typeof regexResult === 'string'){
    onError ? onError(regexResult) : console.error(regexResult);
    return [];
  }else{
    return group.filter(g => matchThisRegex(g.text, regexResult, onError)).map(g => g.idx);
  }
}

export const matchThisRegex = (str1, regex) => {
  return str1.match(regex);
}

export const characterMatchesExpressions = (char, expressions) => {
  if(expressions.includes('A') && /[A-Z]/.test(char)){
    return true;
  }
  else if(expressions.includes('a') && /[a-z]/.test(char)){
    return true;
  }
  else if(expressions.includes('0') && !isNaN(char)){
    return true;
  }
  
  return expressions.includes(char);
}

export const restrictTextToExpressions = (text, expressions) => {
  return ([...text].filter(c => characterMatchesExpressions(c, expressions))).join('');
}

export const ENTITY_WIDTH = 150;
export const HOSTILES_PER_ROW = 4;
export const FRIENDLIES_PER_ROW = 3;

export const DEFAULT_COUNT_HOSTILES = 8;
export const DEFAULT_COUNT_FRIENDLIES = 6;