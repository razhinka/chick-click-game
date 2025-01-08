import React, { useEffect } from 'react';
import BuildingList from '../BuildingList/BuildingList.tsx';
import ClickerTarget from '../ClickerTarget/ClickerTarget.tsx';
import './MainPage.css'
import { Player } from '../../context/player-context.tsx';
import WindowFocusHandler from '../WindowFocusHandler/WindowFocusHandler.tsx';

interface Props {
   player: Player,
   setPlayer: (player: Player) => void,
}

const MainPage = (props: Props) => {

   const {player, setPlayer} = props;

   const handleTick = () => {
      let playerCopy = {...player};
      playerCopy.score += playerCopy.baseScorePerSecond / 10;
      playerCopy.totalScore += playerCopy.baseScorePerSecond / 10;
      playerCopy.maxScore = Math.max(playerCopy.score, playerCopy.maxScore);
      setPlayer(playerCopy);
   }

   const recalculatePlayerStats = (player: Player) => {
      let playerCopy = {...player};
      playerCopy.baseScorePerSecond = playerCopy.buildings
         .map(building => {
               let bonusMultiplier = player.upgrades
                  .filter((upgrade)=> upgrade.buildingId !== undefined && upgrade.buildingId == building.index)
                  .reduce((a, v) => v.perSecondModifier !== undefined ?  a = a * v.perSecondModifier : a, 1);
               return building.bonusPerSecond !== undefined ? 
                  building.amount * building.bonusPerSecond * bonusMultiplier
                : 0;
            }
         ).reduce((a,v)=> a = a + v, 0);
      playerCopy.baseClickPower = 1 + playerCopy.buildings
         .map(building => {
               let bonusMultiplier = player.upgrades
                  .filter((upgrade)=> upgrade.buildingId !== undefined && upgrade.buildingId == building.index)
                  .reduce((a, v) => v.perSecondModifier !== undefined ?  a = a * v.perSecondModifier : a, 1);
               return building.bonusPerSecond !== undefined ? building.amount * building.bonusPerSecond * bonusMultiplier: 0;
            }
         ).reduce((a,v)=> a = a + v, 1) * 0.1;
      setPlayer(playerCopy)
   }

   useEffect(() => {
      const timer = setTimeout(handleTick, 100);
      return () => clearTimeout(timer);
   })

   return (
      <div className="Main-page">
         <ClickerTarget player={player} setPlayer={setPlayer}/>
         <BuildingList player={player} recalculatePlayerStats={recalculatePlayerStats}/>
         <WindowFocusHandler player={player} setPlayer={setPlayer}/>
      </div>
   );
}


MainPage.propTypes = {};

MainPage.defaultProps = {};

export default MainPage;
