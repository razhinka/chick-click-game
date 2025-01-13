import React from 'react';
import Building from '../BuildingItem/Building.tsx';
import './BuildingList.css'
import { Player } from '../../../context/player-context.tsx';
import UpgradeList from '../../upgrade/UpgradeList/UpgradeList.tsx';

interface Props {
   player: Player,
   recalculatePlayerStats: (player: Player) => void,
}

const BuildingList = (props: Props) => {
   const {player, recalculatePlayerStats} = props;

   return (
      <div className="building-list-container">
         <UpgradeList player={player} recalculatePlayerStats={recalculatePlayerStats}/>
         {
            player.buildings
            .filter((building) =>{
               return building.visibleAt == undefined || building.visibleAt < player.maxScore;
            })
            .map((element, i) => (
               <Building key={i} 
               player={player}
               buildingIndex={i}
               recalculatePlayerStats={recalculatePlayerStats} />
            ))
         }
      </div>
   );
}

BuildingList.propTypes = {};

BuildingList.defaultProps = {};

export default BuildingList;
