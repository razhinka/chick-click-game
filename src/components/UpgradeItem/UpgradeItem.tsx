import React from 'react';
import './UpgradeItem.css'
import { Player, Upgrade } from '../../context/player-context.tsx';
import UpgradeTooltip from '../UpgradeTooltip/UpgradeTooltip.tsx';

interface Props {
   upgrade: Upgrade,
   player: Player,
   recalculatePlayerStats: (player: Player) => void,
}

const UpgradeItem = (props: Props) => {
   const {upgrade, player, recalculatePlayerStats} = props;

   const onClick = () => {
      if(player.score >= upgrade.price){
         let playerCopy = {...player};
         playerCopy.score -= upgrade.price;
         playerCopy.upgrades.push(upgrade);
         recalculatePlayerStats(playerCopy);
      }
   }

   return (
      <div 
         className={player.score >= upgrade.price ? 'upgrade-item-container' : 'upgrade-item-container locked'} 
         onClick={onClick}>
         <UpgradeTooltip player={player} upgrade={upgrade}>
            <img src={upgrade.iconPath} className='upgrade-item-image'/>
         </UpgradeTooltip>
      </div>
     );
}

UpgradeItem.propTypes = {};

UpgradeItem.defaultProps = {};

export default UpgradeItem;
