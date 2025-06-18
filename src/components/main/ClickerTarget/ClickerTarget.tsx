import React, { useEffect, useRef, useState } from 'react';
import chick from '../../../assets/img/chick.png'
import chickSun from '../../../assets/img/chick-sun.png'
import screamingChick from '../../../assets/img/screaming-chick.png'
import eggCurrency from '../../../assets/img/egg.png';
import eggSound from '../../../assets/sounds/eggclick.mp3'
import './ClickerTarget.css'
import { click, Player } from '../../../context/player-context.tsx';
import { formatNumber } from '../../../util/number-formatter.tsx';

interface Props {
  player: Player,
  setPlayer: (player: Player) => void;
}

interface Feather {
  id: number,
  top: number,
  left: number,
  speedX: number,
  speedY: number,
  ttl: number,
  angle: number,
  animationDelay: string,
}

interface Eggs {
  id: number,
  top: number,
  left: number,
  eggsPerClick: number,
  ttl: number,
}

const ClickerTarget = (props: Props) => {
  let {player, setPlayer} = props;
  const eggsAnimationFrameId = useRef<number>(0);
  const feathersAnimationFrameId = useRef<number>(0);
  const [feathers, setFeathers] = useState<Feather[]>([]);
  const [eggsPerClick, setEggsPerClick] = useState<Eggs[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    click(player, setPlayer);

    //animations:

    handleFeathers(event, feathers, setFeathers, feathersAnimationFrameId);
    let chickImg = document.getElementById("chick");
    if(chickImg != null){
      (chickImg as HTMLImageElement).src = screamingChick;
      setTimeout(() => {
        (chickImg as HTMLImageElement).src = chick;
      }, 100)
    }
    handleEggs(event, eggsPerClick, setEggsPerClick, player.baseClickPower, eggsAnimationFrameId);
    let audio = new Audio(eggSound);
    audio.volume = player.settings.surroundingVolumeMuted ? 0 : player.settings.surroundingVolume / 100;
    audio.play();
  } 


  return (
    <div className='chick-container' draggable="false">
        <p> Имя игрока: {player.name} </p>
        <p> <img src={eggCurrency} className='egg-currency'/> {formatNumber(player.score, player.settings.suffix)}</p>
        <p> <img src={eggCurrency} className='egg-currency'/> в секунду {formatNumber(player.baseScorePerSecond, player.settings.suffix)}</p>
        <div className="chick-img-container" onClick={handleClick} draggable="false">
          <img id="chick-sun" src={chickSun} className='chick-sun'/>
          <img id="chick" src={chick} className="chick" draggable="false"/>
        </div>
        {
          eggsPerClick.map((eggs, index) => (
            <div className='eggs-per-click' key={eggs.id}
              style={{
                left: eggs.left,
                top: eggs.top,
                animationDuration: `2s`
              }}>
              + {formatNumber(eggs.eggsPerClick, player.settings.suffix, 1)}
            </div>
          ))
        }
        {feathers.map((feather, index) => (
          <div
            key={feather.id}
            className="feather"
            style={{
              left: `${feather.left}px`,
              top: `${feather.top}px`,
              transform: `rotate(${feather.angle}deg)`,
              animationDelay: feather.animationDelay
            }}
          />
        ))}
    </div>
  );
}

function handleEggs (event: React.MouseEvent<HTMLDivElement>, 
                    eggs: Eggs[], 
                    setEggs: (eggs: Eggs[]) => void,
                    eggsPerClick: number,  
                    eggsAnimationFrameId: React.RefObject<number>
                  ) {
  const newEggs = [{id: Math.random(), left: event.clientX, top: event.clientY, eggsPerClick, ttl: 80}];
  
  if(!eggsAnimationFrameId.current){ 
    eggsAnimationFrameId.current = requestAnimationFrame(() => updateEggs([...eggs, ...newEggs], setEggs));
  } else{
    cancelAnimationFrame(eggsAnimationFrameId.current);
    eggsAnimationFrameId.current = requestAnimationFrame(() => updateEggs([...eggs, ...newEggs], setEggs));
  }
}

function updateEggs(eggs: Eggs[], setEggs: (eggs: Eggs[]) => void){
  const updatedEggs = eggs.map(egg => {
    return {
      ...egg, 
      ttl: egg.ttl - 1}}
    ).filter((egg) => egg.ttl > 0);

  setEggs(updatedEggs);

  if(updatedEggs && updatedEggs.length > 0){
      requestAnimationFrame(() => updateEggs(updatedEggs, setEggs));
  }
}

function handleFeathers (event: React.MouseEvent<HTMLDivElement>, feathers: Feather[], 
    setFeathers: (feather: Feather[]) => void, feathersAnimationFrameId: React.RefObject<number>) {
  const newFeathers = Array.from({ length: 4 }).map((_, index) : Feather => {
    const angle = Math.random() * 2 * Math.PI; // Случайный угол в радианах
    const speedX = Math.cos(angle) * (Math.random() * 3 + 1); // Скорость по X
    const speedY = -Math.sin(angle) * (Math.random() * 3 + 1); // Скорость по Y
    
    return {
        id: Math.random(), 
        left: event.clientX,
        top: event.clientY,
        angle: angle * 180 / Math.PI,
        speedX,
        speedY,
        ttl: 80,
        animationDelay: `${index * 0.2}s`,
    };
  });

  if(!feathersAnimationFrameId.current){
    feathersAnimationFrameId.current = requestAnimationFrame(() => moveFeathers([...feathers, ...newFeathers], setFeathers));
  } else{
    cancelAnimationFrame(feathersAnimationFrameId.current);
    feathersAnimationFrameId.current = requestAnimationFrame(() => moveFeathers([...feathers, ...newFeathers], setFeathers));
  }
}

function moveFeathers(feathersArray: Feather[], setFeathers: (feather: Feather[]) => void) {
  const updatedFeathers = feathersArray.map(feather => {
      return {
          ...feather,
          left: feather.left + feather.speedX,
          top: feather.top + feather.speedY,
          ttl: feather.ttl - 1,
      };
  }).filter(feather => feather.ttl > 0);

  setFeathers(updatedFeathers);

  // Продолжайте анимацию, если хотя бы одно перо всё ещё на экране
  if (updatedFeathers && updatedFeathers.length > 0) {
      requestAnimationFrame(() => moveFeathers(updatedFeathers, setFeathers));
  }
};

export default ClickerTarget;
