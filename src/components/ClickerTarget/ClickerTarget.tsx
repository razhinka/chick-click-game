import React, { useContext, useState } from 'react';
import chick from '../../img/chick.png'
import './ClickerTarget.css'
import { Player } from '../../context/player-context';

interface Props {
  player: Player,
  setPlayer: (player: Player) => void;
}

const ClickerTarget = (props: Props) => {
  let {player, setPlayer} = props;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("Chick was Clicked!");
    let playerCopy = {...player}
    playerCopy.score += playerCopy.baseClickPower;
    playerCopy.totalScore += playerCopy.baseClickPower;
    setPlayer(playerCopy)
  } 
  return (
    <div className='chick-container'>
        <div className="chick-target" draggable="false">
        <p> Имя игрока: {player.name} </p>
        <p> Яички: {player.score.toFixed(0)}</p>
        <p> Яичек в секунду: {player.baseScorePerSecond.toFixed(0)}</p>
        <div onClick={handleClick} draggable="false">
          <img src={chick} className="chick-style" draggable="false"/>
        </div>
      </div>
    </div>
  );
}

ClickerTarget.propTypes = {};

ClickerTarget.defaultProps = {};

export default ClickerTarget;
