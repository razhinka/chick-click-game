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
    playerCopy.score += 1;
    playerCopy.totalScore += 1;
    setPlayer(playerCopy)
  } 
  return (
    <div className="chick-target" draggable="false">
      <p> Player name: {player.name} </p>
      <div onClick={handleClick} draggable="false">
        <img src={chick} className="chick-style" draggable="false"/>
      </div>
      <p> Score: {player.score}</p>
      <p> Total score: {player.totalScore}</p>
    </div>
  );
}

ClickerTarget.propTypes = {};

ClickerTarget.defaultProps = {};

export default ClickerTarget;
