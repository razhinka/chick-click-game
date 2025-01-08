import React from 'react';
import './UpgradeList.css';
import { upgradeList } from '../../context/player-context-entities.tsx';
import { Player } from '../../context/player-context.tsx';
import UpgradeItem from '../UpgradeItem/UpgradeItem.tsx';

interface Props {
   player: Player,
   recalculatePlayerStats: (player: Player) => void,
}


const UpgradeList = (props: Props) => {
   const {player, recalculatePlayerStats} = props;
   const upgrades = upgradeList;

   return (
      <div className='upgrade-container'>
         <div className='upgrade-container-header'>Магазин улучшений</div>
            <div className='upgrade-container-list'>
               <div className='upgrade-container-empty-message' style={{
                  display: `${upgrades.filter((upgrade) => upgrade.unlockCondition == undefined || 
                     (!player.upgrades.some(existingUpgrade => existingUpgrade === upgrade) && upgrade.unlockCondition(player))).length == 0 
                     ? 'block':'none'}`
               }}>Доступных улучшений нет</div>
               {
                  upgrades.filter((upgrade) => upgrade.unlockCondition == undefined || 
                     (!player.upgrades.some(existingUpgrade => existingUpgrade === upgrade) && upgrade.unlockCondition(player)))
                     .map((upgrade) => (
                        <UpgradeItem upgrade={upgrade} player={player} recalculatePlayerStats={recalculatePlayerStats}/>
                     ))
               }
         </div>
      </div>
);
}


export default UpgradeList;
