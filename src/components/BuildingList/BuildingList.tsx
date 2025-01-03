import React from 'react';
import PropTypes from 'prop-types';
import Building from '../Building/Building';
import { Player } from '../../context/player-context';

const BuildingList = () => (
   <Building player={player}>
      BuildingList Component
   </Building>
);

BuildingList.propTypes = {};

BuildingList.defaultProps = {player};

export default BuildingList;
