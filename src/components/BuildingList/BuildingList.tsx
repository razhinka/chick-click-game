import React from 'react';
import Building from '../Building/Building.tsx';
import './BuildingList.css'
import { Player } from '../../context/player-context.tsx';

interface Props {
   player: Player,
   setPlayer: (player: Player) => void,
}

const BuildingList = (props: Props) => {
   return (
      <div className="building-list-container">
         {
            props.player.buildings.map((element, i) => (
               <Building player={props.player} setPlayer={props.setPlayer} buildingIndex={0}/>
            ))
         }
      </div>
   );
}

BuildingList.propTypes = {};

BuildingList.defaultProps = {};

export default BuildingList;
