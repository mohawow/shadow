import React from 'react';
import {shallow} from "enzyme";
import LoginForm from "./loginForm";


describe('loginForm', () => { 
// rendered form
    it('should render form correctly', () => { 
        const component = shallow(<LoginForm/>); 
        expect(component.find('.tripForm')).toHaveLength(1)
    });
// to find inputs insdie the components
    it('should have two inputs for username and password', () => { 
        const component = shallow(<LoginForm/>); 
        expect(component.find('.test')).toHaveLength(2);
    }); 
});

