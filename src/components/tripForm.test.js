import React from 'react';
import {shallow} from "enzyme";
import TripForm from "./tripForm";


describe('tripForm', () => { 
    it('should render form correctly', () => { 
        const component = shallow(<TripForm/>); 
        component.instance().populateTrip = jest.fn();
        component.update()
        component.instance().populateShifts = jest.fn();
        expect(component.find('.tripForm')).toHaveLength(1)
    });
})