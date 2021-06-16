import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { StoreContext } from './context';
import data from './data.json';

import { generateFromWordList, matchWithinThisGroup, WORD_LIST_HOSTILE, WORD_LIST_FRIENDLY } from '../util';

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
  const [ levelDefinitions ] = useState(data.levels);
  const [ expressions ] = useState(data.expressions);
  const [ levelIdx, setLevelIdx ] = useState(0);
  const [ score, setScore ] = useState(0);

  const onError = (e) => {
    setError(e)
  }

  const levelData = useMemo(() => (
    {
      idx: levelIdx,
      label: levelIdx + 1,
      ...levelDefinitions[levelIdx]
    }
  ),[ levelIdx, levelDefinitions ]);
  
  const numHostiles = useMemo(() => 
    levelData.hostiles
  , [ levelData ]);

  const numFriendlies = useMemo(() => 
    levelData.friendlies
  , [ levelData ]);

  useEffect(() => {
    const matchedIdxs = matchWithinThisGroup(entities, text, onError);
    setMatchedIdxs(matchedIdxs);
  }, [ text, entities, setMatchedIdxs ]);

  useEffect(() => {
    const matchedIdxs = matchWithinThisGroup(entities, activeText, onError);
    setAttackedIdxs(matchedIdxs);
  }, [ activeText, entities, setAttackedIdxs ]);

  const generateEntities = useCallback(() => {
    let friendlies = generateFromWordList(numFriendlies, WORD_LIST_FRIENDLY, true).map((tE, i) => {
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
  }, [ setEntities, numHostiles, numFriendlies ]);


  useEffect(() => {
    if(!loaded){
      setLoaded(true);
      // generateEntities();
    }
  }, [ loaded, generateEntities ]); 

  
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
    setText('');
    startTextTimer();
  }, [ setActiveText, startTextTimer ]);


  const setLevel = useCallback((levelIdx) => {
    setMatchedIdxs([]);
    setKilledIdxs([]);
    setAttackedIdxs([]);

    setLevelIdx(levelIdx);
  });
    
  const nextLevel = useCallback(() => {
    if(levelIdx < levelDefinitions.length - 1){
      setLevel(levelIdx + 1);
    }else{
      console.error('TODO: end of game')
    }
  }, [ levelIdx, levelDefinitions, setLevel ]);
  
  const prevLevel = useCallback(() => {
    if(levelIdx > 0){
      setLevel(levelIdx - 1);
    }else{
      console.error('TODO: already on first level')
    }
  }, [ levelIdx, setLevel ]);

  useEffect(() => {
    generateEntities();
  }, [ levelIdx ]); 

  const restartGame = useCallback(() => {
    setLevel(0);
  }, [ setLevel ]);

  const activeExpressions = useMemo(() =>
    expressions.map(exp => ({
      value: exp.value,
      active: levelData.expressions.includes(exp.value)
    })), [ levelData, expressions ]);


  return (
    <StoreContext.Provider 
      value={{
        text: text,
        updateText: updateText,
        entities: entities,
        matchedIdxs: matchedIdxs,
        attackedIdxs: attackedIdxs,
        killedIdxs: killedIdxs,
        generateEntities: generateEntities,
        getMatchedEntities: getMatchedEntities,
        restartGame: restartGame,
        submitText: submitText,
        activeText: activeText,
        activeExpressions: activeExpressions,
        levelData: levelData,
        nextLevel: nextLevel,
        prevLevel: prevLevel,
        score: score,
        setScore: setScore,
        error: error
      }}>
      {children}
    </StoreContext.Provider>
  );
}

export default Store;
