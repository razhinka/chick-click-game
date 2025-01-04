import React from 'react';
import './Building.css'
import { Player } from '../../context/player-context.tsx';

interface Props {
   player: Player,
   setPlayer: (player: Player) => void,
   buildingIndex: number
}

const Building = (props: Props) => {
   const building = props.player.buildings[props.buildingIndex]

   const handleClick = () => {
      if(props.player.score >= building.price){
         let playerCopy = {...props.player};
         playerCopy.score -= building.price;
         if(building.bonusPerClick != undefined){
            playerCopy.baseClickPower += building.bonusPerClick;
         }
         if(building.bonusPerSecond != undefined){
            playerCopy.baseScorePerSecond += building.bonusPerSecond;
         }
         let buildingCopy = {...props.player.buildings[props.buildingIndex]}
         buildingCopy.amount += 1;
         buildingCopy.price = buildingCopy.price * 1.15;
         playerCopy.buildings[props.buildingIndex] = buildingCopy;
         props.setPlayer(playerCopy);
      }

   }

   return (
      <div className='building-container' onClick={handleClick}>
        <div className='building-info'>
           <h2 className='building-name'>
              {building.name} <a className='amount'>{building.amount}</a>
           </h2>
           <div className='building-bonus'>
               {building.bonusPerClick != undefined && 
                  <p>Бонус за нажатие: {building.bonusPerClick}</p>
               }
               {building.bonusPerSecond != undefined && 
                  <p>Бонус в секунду: {building.bonusPerSecond}</p>
               }
           </div>
           <div className={building.price < props.player.score ? 'building-price' : 'building-price cant-buy'}>
              Цена: {building.price.toFixed(0)} 
           </div>
        </div>
        <div className='building-icon-container'>
           <img src={building.iconPath} className='building-icon'/>
        </div>
      </div>
     );
}

Building.propTypes = {};

Building.defaultProps = {};

export default Building;
