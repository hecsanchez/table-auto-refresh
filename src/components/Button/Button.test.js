import React from 'react';
import ReactDOM from 'react-dom';
import Button from './';

it('renders Button', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Button />, div);
  ReactDOM.unmountComponentAtNode(div);
});
