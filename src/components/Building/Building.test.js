import React from 'react';
import ReactDOM from 'react-dom';
import Building from './Building';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Building />, div);
  ReactDOM.unmountComponentAtNode(div);
});