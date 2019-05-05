import React from 'react';
import { mount } from 'enzyme';
import { Table } from './index';
import TableHeader from './lib/TableHeader';
import TableBody from './lib/TableBody';

let wrapper, instance;

const entries = [
    {
      createdDate: '1/28/2019 8:53:23',
      name: 'Brooke',
      surname: 'Salas',
      email: 'salas@test.com',
      number: '14546463435'
    },
    {
      createdDate: '5/4/2019 22:00:18',
      name: 'Hector Test 2',
      surname: 'Sanchez',
      email: 'hola+test2@hectorsanchez.mx',
      number: '1212121212'
    },
    {
      createdDate: '5/4/2019 23:06:06',
      name: 'Hector',
      surname: 'Sanchez',
      email: 'hola+test3@hectorsanchez.mx',
      number: '5529558831'
    }
]

describe("<Table />", () => {

    beforeEach(() => {
        wrapper = mount(<Table data={entries}/>);
        instance = wrapper.instance();
    });

    test('Component mounts with props', () => {
        const tableHeader = wrapper.find(TableHeader);
        const tableBody = wrapper.find(TableBody);
        const rows = tableBody.find('.row');

        expect(tableHeader).toHaveLength(1)
        expect(tableBody).toHaveLength(1)
        expect(rows).toHaveLength(3)
    });
    
});