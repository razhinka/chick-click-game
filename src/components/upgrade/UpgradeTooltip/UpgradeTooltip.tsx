import React, { ReactNode } from 'react';
import { Upgrade, Player } from '../../../context/player-context.tsx';
import './UpgradeTooltip.css';
import { formatNumber } from '../../../util/number-formatter.tsx';
import Tooltip from '../../ui/Tooltip/Tooltip.tsx';

interface Props{
   children: ReactNode,
   upgrade: Upgrade,
   player: Player,
}

const UpgradeTooltip = (props: Props) => {
   const {children, upgrade, player} = props;

   return (
      <Tooltip child={children} content={(
         <UpgradeTooltipContent children={children} upgrade={upgrade} player={player}/>)} 
         className={'upgrade-tooltip'}
      />
   );
}

const UpgradeTooltipContent = (props: Props) => {
   const {upgrade, player} = props;
   return (
      <div className='upgrade-tooltip-content'>
         <p className='upgrade-tooltip-header'>{upgrade.name}</p>
         <div className='upgrade-tooltip-info'>
            <p className={player.score < upgrade.price ? 'cant-buy' : ''}>{formatNumber(upgrade.price)}</p>
            <p>{upgrade.description}</p>
            {upgrade.dinamicDescriptionPart !== undefined && upgrade.dinamicDescriptionPart(player)}
         </div>
      </div>
   )
}


export default UpgradeTooltip;
