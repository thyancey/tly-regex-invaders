const CHARACTERS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const WORD_LIST = [
  'hey',
  'there',
  'JUST',
  's0me',
  'words for',
  'you',
  'TO',
  'p!ck',
  'from!!',
  ' yep',
  'words. ',
  '0123',
  '@//',
  ' 123 ',
  'HeLL oO'
]

export const generateFromWordList = (requested = -1) => {
  let retVal = [];
  const numEntries = (requested < 0 || requested > WORD_LIST.length) ? WORD_LIST.length : requested;
  for(let i = 0; i < numEntries; i++){
    retVal.push( WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)] );
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

export const matchThis = (string, text, type, onError) => {
  if(type === 'regex'){
    return matchThisRegex(string, text, onError);
  }else{
    return matchThisString(string, text);
  }
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

export const matchThisRegex = (str1, regexString, onError) => {
  if(!regexString){
    return false;
  }

  try{
    const re = new RegExp(regexString);
    return str1.match(re);
  }catch(e){
    let message = `${regexString}`;
    onError ? onError(message) : console.error(message);
    return false;
  }
}