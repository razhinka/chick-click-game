import React, { ReactNode } from 'react';
import { Building, Player } from '../../../context/player-context.tsx';
import Tooltip from '../../ui/Tooltip/Tooltip.tsx';
import { formatNumber } from '../../../util/number-formatter.tsx';
import './BuildingTooltip.css';

interface Props {
   children: ReactNode,
   building: Building,
   player: Player,
}

const BuildingTooltip = (props: Props) => {
   const {children, building, player} = props;
   return (
      <Tooltip child={children} content={(
         <BuildingTooltipContent children={children} building={building} player={player}/>)} 
         className={'building-tooltip'}
      />
   );
}

const BuildingTooltipContent = (props: Props) => {
   const {building, player} = props;

   return (
      <div className='building-tooltip-content'>
         <p className='building-tooltip-header'>{building.unlocksAt == undefined || building.unlocksAt <= player.stats.maxScore ? building.name : "???"}</p>
         <div className='building-tooltip-info'>
            <p className={player.score < building.price ? 'cant-buy' : ''}>{formatNumber(building.price, player.settings.suffix)}</p>
            <p>Крутое описание строения</p>
            {building.dynamicDescriptionPart && building.dynamicDescriptionPart(player)}
         </div>
      </div>
   )
}

export default BuildingTooltip;
