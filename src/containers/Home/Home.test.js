import React from 'react';
import { mount } from 'enzyme';
import { Home } from './index';

let wrapper, instance;

describe("<Home />", () => {
    beforeAll(()=>{
        window.gapi = {
            load: jest.fn(),
            client: {
                load: jest.fn(),
                init: jest.fn().mockReturnValueOnce(Promise.resolve('')),
                sheets: { 
                    spreadsheets: { 
                        values: { 
                            get: jest.fn().mockReturnValueOnce(Promise.resolve({
                                result: {
                                    values: []
                                }
                            })) 
                        } 
                    } 
                }
            }
        }
    })

    beforeEach(() => {
        wrapper = mount(<Home />);
        instance = wrapper.instance();
    });
    
    test('Component mounts with initial state', () => {
        expect(wrapper.state().entries).toHaveLength(0);
        expect(wrapper.state().error).toHaveLength(0);
        expect(wrapper.state().loading).toBe(true);
        expect(wrapper.state().autoRefresh).toBe(false);
        expect(wrapper.state().newData).toHaveLength(0);
    });

    test('componentDidMount', () => {
        expect(window.gapi.load).toHaveBeenCalled();
    });

    test('initClient()', async () => {
        const spy = jest.spyOn(instance, 'loadGAPI');

        instance.initClient();
        await expect(window.gapi.client.init).toHaveBeenCalled();
        expect(spy).toHaveBeenCalled();
    });

    test('loadGAPI()', () => {
        instance.loadGAPI();
        expect(window.gapi.client.load).toHaveBeenCalled();
    });

    test('fetchEntries() and send new candidate when new entries and autoRefresh is `true`', async () => {
        const spyGetEntries = jest.spyOn(instance, 'getEntries');
        const spyOnLoad = jest.spyOn(instance, 'onLoad');
        const spyPushNewCandidate = jest.spyOn(instance, 'pushNewCandidate');
        wrapper.setState({ autoRefresh: true, newEntries: [{}, {}] });

        instance.fetchEntries();
        await expect(window.gapi.client.sheets.spreadsheets.values.get).toHaveBeenCalled();
        expect(spyGetEntries).toHaveBeenCalled();
        expect(spyOnLoad).toHaveBeenCalled();
        expect(spyPushNewCandidate).toHaveBeenCalled();
    });

});