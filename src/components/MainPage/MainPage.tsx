import React from 'react';
import BuildingList from '../BuildingList/BuildingList';
import ClickerTarget from '../ClickerTarget/ClickerTarget.tsx';
import { Player } from '../../context/player-context.tsx';

interface Props {
   player: Player,
   setPlayer: (player: Player) => void,
}

const MainPage = (props: Props) => {
   return (
      <div className="App">
         <ClickerTarget player={props.player} setPlayer={props.setPlayer}/>
      </div>
   );
}


MainPage.propTypes = {};

MainPage.defaultProps = {};

export default MainPage;
