import React, { useEffect, useRef } from 'react';
import BuildingList from '../../building/BuildingList/BuildingList.tsx';
import ClickerTarget from '../ClickerTarget/ClickerTarget.tsx';
import './MainPage.css'
import { Player } from '../../../context/player-context.tsx';
import WindowFocusHandler from '../../global/WindowFocusHandler/WindowFocusHandler.tsx';
import MenuComponentSelector from '../MenuComponent/MenuComponent.tsx';
import BonusEggGenerator from '../../global/BonusEggGenerator/BonusEggGenerator.tsx';

interface Props {
   player: Player,
   setPlayer: (player: Player) => void,
}

const MainPage = (props: Props) => {
   const {player, setPlayer} = props;
   const tickCounter = useRef<number>(0);

   const handleTick = () => {
      let playerCopy = {...player};
      tickCounter.current++;
      playerCopy.gameTick = tickCounter.current;
      playerCopy.score += playerCopy.baseScorePerSecond / 10;
      playerCopy.totalScore += playerCopy.baseScorePerSecond / 10;
      playerCopy.maxScore = Math.max(playerCopy.score, playerCopy.maxScore);
      setPlayer(playerCopy);
   }

   const recalculatePlayerStats = (player: Player) => {
      let playerCopy = {...player};
      playerCopy.buildings = playerCopy.buildings.map((building) => {
         return {
            ...building,
            currentMultiplier: player.upgrades
               .filter((upgrade)=> upgrade.buildingId !== undefined && upgrade.buildingId == building.index)
               .reduce((a, v) => v.perSecondModifier !== undefined ?  a = a * v.perSecondModifier : a, 1)
         }
      });
      let buildingCpsBonus = playerCopy.buildings
      .map(building => {
            return building.bonusPerSecond !== undefined ? 
               building.amount * building.bonusPerSecond * building.currentMultiplier
             : 0;
         }
      ).reduce((a,v)=> a = a + v, 0);
      let buildingsClickBonus = playerCopy.buildings
         .map(building => {
               return building.bonusPerSecond !== undefined ? 
                  building.amount * building.bonusPerSecond  * building.currentMultiplier
               : 0;
            }
         ).reduce((a,v)=> a = a + v, 0) * 0.1;
      let upgradeClickPowerMultiplier = playerCopy.upgrades
         .reduce((a,v)=> v.clickModifier !== undefined ? a * v.clickModifier : a, 1)
      
      playerCopy.baseScorePerSecond = buildingCpsBonus;
      playerCopy.baseClickPower = (1 + buildingsClickBonus) * upgradeClickPowerMultiplier;
      setPlayer(playerCopy)
   }

   useEffect(() => {
      const timer = setTimeout(handleTick, 100);
      return () => clearTimeout(timer);
   })

   return (
      <div className="Main-page">
         <MenuComponentSelector player={player} setPlayer={setPlayer}/>
         <ClickerTarget player={player} setPlayer={setPlayer}/>
         <BuildingList player={player} recalculatePlayerStats={recalculatePlayerStats}/>
         <WindowFocusHandler player={player} setPlayer={setPlayer}/>
         <BonusEggGenerator tickCounter={tickCounter} player={player} setPlayer={setPlayer}/>
      </div>
   );
}


MainPage.propTypes = {};

MainPage.defaultProps = {};

export default MainPage;
