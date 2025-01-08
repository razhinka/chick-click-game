import React from 'react';
import { Player } from '../../context/player-context.tsx';

interface Props {
   player: Player,
   setPlayer: (player: Player) => void,
}

const MenuComponent = () => (
   <div>
      MenuComponent Component
   </div>
);

export default MenuComponent;
