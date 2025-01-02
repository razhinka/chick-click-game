import React from 'react';
import chick from '../../img/chick.png'
import BuildingList from '../BuildingList/BuildingList';

const MainPage = () => (
   <div className="App">
      <header className="App-header">
        <img src={chick} className="App-logo" alt="logo" />
        <BuildingList Player={getOrCreatePlayer()}>
         </BuildingList>
      </header>

    </div>
);


const getOrCreatePlayer = () => {
   return {
      name: "SomeName",
      score: 0,
      totalScore: 0,
      buildings: []
   }
}

MainPage.propTypes = {};

MainPage.defaultProps = {};

export default MainPage;
