import React, { useState, useCallback, useEffect } from 'react';
import { StoreContext } from './context';

import { generateFromWordList, matchWithinThisGroup, DEFAULT_COUNT_HOSTILES, DEFAULT_COUNT_FRIENDLIES, WORD_LIST_HOSTILE, WORD_LIST_FRIENDLY } from '../util';

function Store({children}) {
  const [ loaded, setLoaded ] = useState(false);
  const [ text, setText ] = useState('');
  const [ activeText, setActiveText ] = useState('');
  const [ entities, setEntities ] = useState([]);
  const [ matchedIdxs, setMatchedIdxs ] = useState([]);
  const [ attackedIdxs, setAttackedIdxs ] = useState([]);
  const [ killedIdxs, setKilledIdxs ] = useState([]);
  const [ killActive, setKillActive ] = useState(false);
  const [ error, setError ] = useState('');

  const onError = (e) => {
    setError(e)
  }

  useEffect(() => {
    const matchedIdxs = matchWithinThisGroup(entities, text, onError);
    setMatchedIdxs(matchedIdxs);
  }, [ text, entities, setMatchedIdxs ]);

  useEffect(() => {
    const matchedIdxs = matchWithinThisGroup(entities, activeText, onError);
    setAttackedIdxs(matchedIdxs);
  }, [ activeText, entities, setAttackedIdxs ]);

  const generateEntities = useCallback((numHostiles = DEFAULT_COUNT_HOSTILES, numFriendlies = DEFAULT_COUNT_FRIENDLIES) => {
    let friendlies = generateFromWordList(numFriendlies, WORD_LIST_FRIENDLY).map((tE, i) => {
      return {
        text: tE,
        idx: i,
        posIdx: i,
        type: 'friendly'
      };
    });

    let hostiles = generateFromWordList(numHostiles, WORD_LIST_HOSTILE).map((tE, i) => {
      return {
        text: tE,
        idx: i + friendlies.length,
        posIdx: i,
        type: 'hostile'
      };
    });

    setEntities(friendlies.concat(hostiles));
  }, [ setEntities ]);
  

  useEffect(() => {
    if(!loaded){
      setLoaded(true);
      generateEntities();
    }
  }, [ loaded, generateEntities ]); 
  
  const restartGame = useCallback(() => {
    setMatchedIdxs([]);
    setKilledIdxs([]);
    setAttackedIdxs([]);
    generateEntities();
  }, [ generateEntities ]);
  
  const getMatchedEntities = useCallback((type = 'hostile') => {
    return entities.filter(e => e.type === type).map(e => {
      const isKilled = killedIdxs.includes(e.idx);
      return {
        ...e,
        isMatched: !isKilled && matchedIdxs.includes(e.idx),
        isAttacked: !isKilled && attackedIdxs.includes(e.idx),
        isKilled: isKilled
      }
    });
  }, [ entities, matchedIdxs, attackedIdxs, killedIdxs ]);

  useEffect(() => {
    if(killActive){
      let newDeaths = [];
      attackedIdxs.forEach(idx => {
        if(!killedIdxs.includes(idx)){
          newDeaths.push(idx);
        }
      });
  
      if(newDeaths.length > 0){
        setKilledIdxs(killedIdxs.concat(newDeaths));
      }

      setKillActive(false);
    }
  }, [ killActive, setKillActive, attackedIdxs, killedIdxs, setKilledIdxs ]);


  let textTimer = null;
  const killTextTimer = () => {
    if(textTimer){
      window.clearTimeout(textTimer);
      textTimer = null;
    }
  }
  const startTextTimer = () => {
    killTextTimer();
    textTimer = window.setTimeout(() => {
      setKillActive(true);
      setActiveText('');
    }, 1000);
  }
  const updateText = useCallback((text) => {
    setError('');
    setText(text);
  }, [ setText, setError ]);
  
  const submitText = useCallback((text) => {
    setActiveText(text);
    startTextTimer();
  }, [ setActiveText, startTextTimer ]);

  return (
    <StoreContext.Provider 
      value={{
        text: text,
        updateText: updateText,
        entities: entities,
        matchedIdxs: matchedIdxs,
        attackedIdxs: attackedIdxs,
        generateEntities: generateEntities,
        getMatchedEntities: getMatchedEntities,
        restartGame: restartGame,
        submitText: submitText,
        activeText: activeText,
        error: error
      }}>
      {children}
    </StoreContext.Provider>
  );
}

export default Store;
