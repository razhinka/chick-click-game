import React from 'react';
import './Building.css'
import eggCurrency from '../../../assets/img/egg.png'
import { Player } from '../../../context/player-context.tsx';
import { formatNumber } from '../../../util/number-formatter.tsx';
import BuildingTooltip from '../BuildingTooltip/BuildingTooltip.tsx';

interface Props {
   player: Player,
   buildingIndex: number,
   recalculatePlayerStats: (player: Player) => void;
}

const Building = (props: Props) => {
   const { player, buildingIndex, recalculatePlayerStats } = props;
   const building = player.buildings[buildingIndex]

   const handleClick = () => {
      if (player.score >= building.price) {
         let playerCopy = { ...player };
         playerCopy.score -= building.price;
         let buildingCopy = { ...player.buildings[buildingIndex] }
         buildingCopy.amount += 1;
         buildingCopy.price = buildingCopy.price * 1.15;
         playerCopy.buildings[buildingIndex] = buildingCopy;
         recalculatePlayerStats(playerCopy);
      }
   }

   return (
      <div className='building-container' onClick={handleClick}>
         <div className='building-info'>
            <BuildingTooltip player={player} building={building}>
               <h2 className='building-name'>
                  {building.unlocksAt == undefined || building.unlocksAt <= player.stats.maxScore ? building.name : "???"} <a className='amount'>ур. {building.amount}</a>
               </h2>
            </BuildingTooltip>
            <div className='building-bonus'>
               {building.bonusPerSecond !== undefined &&
                  <p>В секунду: {formatNumber(building.bonusPerSecond * building.currentMultiplier, player.settings.suffix)}</p>
               }
            </div>
            <div className={building.price <= player.score ? 'building-price' : 'building-price cant-buy'}>
               <img src={eggCurrency} className='egg-currency' /> <p>{formatNumber(building.price, player.settings.suffix)}</p>
            </div>
         </div>
         <div className='building-icon-container'>
            <img src={building.iconPath} className={
               building.unlocksAt == undefined || building.unlocksAt <= player.stats.maxScore ? 'building-icon' : 'building-icon locked'
            } />
         </div>
      </div>
   );
}

Building.propTypes = {};

Building.defaultProps = {};

export default Building;
