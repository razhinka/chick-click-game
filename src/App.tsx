import React, { useState } from 'react';
import './App.css';
import MainPage from './components/MainPage/MainPage.tsx';
import { defaultPlayer } from './context/player-context-entities.tsx';
import { Player } from './context/player-context.tsx';



function App() {
  const [player, setPlayer] = useState<Player>(defaultPlayer);
  
  return (
    <MainPage player={player} setPlayer={setPlayer}/>
  );
}

export default App;
