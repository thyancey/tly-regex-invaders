import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { StoreContext } from './context';
import data from './data.json';

import { generateFromWordList, matchWithinThisGroup, restrictTextToExpressions } from '../util';

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
    console.log('onError', e)
    setError(e)
  }

  const levelData = useMemo(() => (
    {
      idx: levelIdx,
      label: levelIdx + 1,
      ...levelDefinitions[levelIdx]
    }
  ),[ levelIdx, levelDefinitions ]);
  
  const activeHostiles = useMemo(() => 
    levelData.hostiles
  , [ levelData ]);

  const activeFriendlies = useMemo(() => 
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
    let friendlies = generateFromWordList(-1, activeFriendlies).map((tE, i) => {
      return {
        text: tE,
        idx: i,
        posIdx: i,
        type: 'friendly'
      };
    });

    let hostiles = generateFromWordList(-1, activeHostiles).map((tE, i) => {
      return {
        text: tE,
        idx: i + friendlies.length,
        posIdx: i,
        type: 'hostile'
      };
    });

    setEntities(friendlies.concat(hostiles));
  }, [ setEntities, activeHostiles, activeFriendlies ]);


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


  useEffect(() => {
    setMatchedIdxs([]);
    setKilledIdxs([]);
    setAttackedIdxs([]);
    setText('');
    setError('');
  }, [ levelIdx ]);

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

  const updateText = useCallback(t => {
    const newText = restrictTextToExpressions(t, levelData.expressions);
    if(newText !== text){
      setError('');
      setText(newText);
    }
  }, [ text, setText, setError, levelData ]);
  
  const submitText = useCallback((text) => {
    setActiveText(text);
    setText('');
    startTextTimer();
  }, [ setActiveText, startTextTimer ]);

    
  const nextLevel = useCallback(() => {
    if(levelIdx < levelDefinitions.length - 1){
      setLevelIdx(levelIdx + 1);
    }else{
      console.error('TODO: end of game')
    }
  }, [ levelIdx, levelDefinitions, setLevelIdx ]);
  
  const prevLevel = useCallback(() => {
    if(levelIdx > 0){
      setLevelIdx(levelIdx - 1);
    }else{
      console.error('TODO: already on first level')
    }
  }, [ levelIdx, setLevelIdx ]);

  useEffect(() => {
    generateEntities();
  }, [ levelIdx, generateEntities ]); 

  const restartGame = useCallback(() => {
    setLevelIdx(0);
  }, [ setLevelIdx ]);

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
