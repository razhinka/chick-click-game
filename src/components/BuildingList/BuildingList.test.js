import React from 'react';
import ReactDOM from 'react-dom';
import BuildingList from './BuildingList';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BuildingList />, div);
  ReactDOM.unmountComponentAtNode(div);
});