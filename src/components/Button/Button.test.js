import React from 'react';
import { shallow } from 'enzyme';
import { Button } from './index';

describe("<Button />", () => {

    test('Component mounts with props', () => {
        const onClick = jest.fn();
        const wrapper = shallow(<Button color={"green"} onClick={onClick}/>);
        expect(wrapper.hasClass('button--green')).toBe(true);
    });

    test('Buttons disables when prop disabled `true`', () => {
      const onClick = jest.fn();
      const wrapper = shallow(<Button onClick={onClick} disabled={true}/>);
      expect(wrapper.hasClass('button--gray')).toBe(true);
      expect(wrapper.prop('disabled')).toBe(true);
  });
    
});