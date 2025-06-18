import React, {useMemo} from 'react';
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

   const visibleBuildings = useMemo(() => 
    player.buildings.filter(b => 
      b.visibleAt === undefined || b.visibleAt < player.stats.maxScore
    ), [player.buildings, player.stats.maxScore]);

   return (
      <div className="building-list-container">
         <UpgradeList player={player} recalculatePlayerStats={recalculatePlayerStats}/>
         {
            visibleBuildings.map((element, i) => (
               <Building key={i} 
               player={player}
               buildingIndex={i}
               recalculatePlayerStats={recalculatePlayerStats} />
            ))
         }
      </div>
   );
}

export default BuildingList;
