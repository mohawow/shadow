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

    // it('should call the doSubmit function when we submit the form', () => {
    //     const fakeSubmitFn = jest.fn();
    //     const wrapper = shallow(<LoginForm/>); 
    //     wrapper.doSubmit = fakeSubmitFn;
    //     wrapper.setState({data: {username: 'test', password: '1234'}});
    //     wrapper.find('.tripForm').simulate('submit', {preventDefault: () => {
    //     }});
    //     expect(fakeSubmitFn).toHaveBeenCalled();
    // })
// to find button 
});

