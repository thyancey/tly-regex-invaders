import React, { useState, useCallback, useEffect } from 'react';
import { StoreContext } from './context';

import { generateFromWordList, generateRandomTextEntries, matchThis, regexMatchThis } from '../util';

function Store({children}) {
  const [ loaded, setLoaded ] = useState(false);
  const [ text, setText ] = useState('');
  const [ activeText, setActiveText ] = useState('');
  const [ enemies, setEnemies ] = useState([]);
  const [ matchedIdxs, setMatchedIdxs ] = useState([]);
  const [ attackedIdxs, setAttackedIdxs ] = useState([]);
  const [ killActive, setKillActive ] = useState(false);
  const [ mode, setMode ] = useState('regex');
  const [ error, setError ] = useState('');

  const onError = (e) => {
    setError(e)
  }

  const matchThese = (group, text, type) => {
    return group.filter(g => matchThis(g.text, text, type, onError)).map(g => g.idx);
  }


  useEffect(() => {
    const matchedIdxs = matchThese(enemies, text, mode);
    setMatchedIdxs(matchedIdxs);
  }, [ text, enemies, setMatchedIdxs, mode ]);

  useEffect(() => {
    const matchedIdxs = matchThese(enemies, activeText, mode);
    setAttackedIdxs(matchedIdxs);
  }, [ activeText, enemies, setAttackedIdxs, mode ]);

  const generateEnemies = useCallback((numEnemies = 6) => {
    setEnemies(generateFromWordList(numEnemies).map((tE, i) => ({
      text: tE,
      idx: i
    })))
  }, [ setEnemies ]);
  
  useEffect(() => {
    if(!loaded){
      setLoaded(true);
      generateEnemies();
    }
  }, [ loaded, setLoaded, generateEnemies ]); 
  
  const restartGame = useCallback(() => {
    generateEnemies();
  }, [ setEnemies ]);
  
  const getMatchedEnemies = useCallback(() => {
    return enemies.map(e => ({
      ...e,
      isMatched: matchedIdxs.includes(e.idx),
      isAttacked: attackedIdxs.includes(e.idx)
    }));
  }, [ enemies, matchedIdxs, attackedIdxs ]);

  const removeAttackedEnemies = useCallback(() => {
    const remaining = enemies.filter(e => !attackedIdxs.includes(e.idx));
    setEnemies(remaining);
  }, [ enemies, setEnemies, attackedIdxs ]);

  useEffect(() => {
    if(killActive){
      removeAttackedEnemies();
      setKillActive(false);
    }
  }, [ killActive, setKillActive ]);

  const submitText = useCallback((text) => {
    setActiveText(text);
    startTextTimer();
  }, [ setActiveText, removeAttackedEnemies, attackedIdxs ]);

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

  return (
    <StoreContext.Provider 
      value={{
        text: text,
        updateText: updateText,
        enemies: enemies,
        matchedIdxs: matchedIdxs,
        attackedIdxs: attackedIdxs,
        generateEnemies: generateEnemies,
        getMatchedEnemies: getMatchedEnemies,
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
