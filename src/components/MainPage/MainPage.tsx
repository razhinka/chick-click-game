import React, { useEffect } from 'react';
import BuildingList from '../BuildingList/BuildingList.tsx';
import ClickerTarget from '../ClickerTarget/ClickerTarget.tsx';
import './MainPage.css'
import { Player } from '../../context/player-context.tsx';

interface Props {
   player: Player,
   setPlayer: (player: Player) => void,
}

const MainPage = (props: Props) => {

   const handleTick = () => {
      let playerCopy = {...props.player};
      playerCopy.score += playerCopy.baseScorePerSecond / 10;
      playerCopy.totalScore += playerCopy.baseScorePerSecond / 10;
      props.setPlayer(playerCopy);
   }

   useEffect(() => {
      const timer = setTimeout(handleTick, 100);
      return () => clearTimeout(timer);
   })

   return (
      <div className="Main-page">
         <ClickerTarget player={props.player} setPlayer={props.setPlayer}/>
         <BuildingList player={props.player} setPlayer={props.setPlayer}/>
      </div>
   );
}


MainPage.propTypes = {};

MainPage.defaultProps = {};

export default MainPage;
