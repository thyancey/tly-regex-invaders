
import { useEffect, useContext, useState, useRef, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { StoreContext } from '../../store/context';
import { getColor } from '../../util/theme';

import HostilesGrid from './hostiles-grid';

const MAX_WIDTH = 750;
const DELTA_X = 50;
const HEIGHT = 25;
const BUFFER = 10;
const MOVE_TIME = 1000;

const S = {};
S.Swarm = styled('div')`

  position:absolute;
  width:${MAX_WIDTH}px;
  top:1rem;

  /* animate movement */
  ${'' /* transition: left .5s, top .5s; */}

  >ul{
    padding:0;
    margin:0;
  }
`

S.ActiveText = styled('p')`
  color: ${getColor('white')};
  text-align:center;
  
  ${p => p.isActive ? css`
    margin-top:0;
    opacity:1;
  `:css`
    margin-top:3rem;
    opacity:0;
  `}

  transition: margin-top .2s, opacity .5s;
`

const delay = 1;
const ALLOW_DESCEND = false;

function Hostiles() {
  const [ isMoving, setIsMoving ] = useState(false);
  const [ x, setX ] = useState(0);
  const [ yPos, setYPos ] = useState(0);
  const [ direction, setDirection ] = useState(-1);
  const [ windowWidth, setWindowWidth ] = useState(1000);
  const { activeText } = useContext(StoreContext);
  
  const [counter, setCounter] = useState(0);
  const timer = useRef(null); // we can save timer in useRef and pass it to child

  useEffect(() => {
    // useRef value stored in .current property
    timer.current = setInterval(() => setCounter((v) => v + 1), delay * MOVE_TIME);
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    setWindowWidth(window.innerWidth);

    // clear on component unmount
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  /* TODO: rework this whole thing - it's stupid */
  useEffect(() => {
    if(direction < 0){
      /* movin LEFT */
      let minX = 0 + BUFFER;
      minX = minX + (minX % DELTA_X);

      const nextX = (x - (x % DELTA_X)) - DELTA_X;
      if(minX < nextX){
        setX(nextX);
      }else{
        setDirection(1);
        if(ALLOW_DESCEND) setYPos(yPos + 1);
      }
    }else if(direction > 0){
      /* movin RIGHT */
      let maxX = (windowWidth - MAX_WIDTH - BUFFER);
      maxX = maxX - (maxX % DELTA_X)
      const nextX = (x + DELTA_X) - (x % DELTA_X);
      if(maxX > nextX){
        setX(nextX);
      }else{
        setDirection(-1);
        if(ALLOW_DESCEND) setYPos(yPos + 1);
      }
    }

  }, [ windowWidth, counter, setDirection, setX ]);

  const leftPos = useMemo(() => {
    return x * 50;
  }, [x]);

  const topPos = useMemo(() => {
    return yPos * HEIGHT;
  }, [yPos]);

  const realActiveText = useMemo(() => {
    return activeText ? `ATTACKING: "${activeText}"` : ''
  }, [activeText]);


  useEffect(() => {
    if(!isMoving){
      setIsMoving(true);
    }
  }, [ isMoving, setIsMoving ]);

  return (
    <S.Swarm style={{ left: x, top: topPos }}>
      <HostilesGrid />
      <p>{leftPos}</p>
      <S.ActiveText isActive={!!realActiveText}>{realActiveText}</S.ActiveText>
    </S.Swarm>
  );
}

export default Hostiles;
