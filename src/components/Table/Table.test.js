import React from 'react';
import ReactDOM from 'react-dom';
import Table from './index';

it('renders Table', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Table />, div);
  ReactDOM.unmountComponentAtNode(div);
});
