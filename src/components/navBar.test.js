import React from 'react';
import {shallow} from "enzyme";
import NavBar from "./navBar";


describe('Navbar renders correctly if the user is logged in', () => {
  
  it('should display a logout navlin if the user is logged in', () => {
    const user = { id: 1, name: 'test' };
    const wrapper = shallow(<NavBar user={user} />);
    expect(wrapper.find('.fa-sign-out')).toHaveLength(1);
  });

  it ('should not display the logout navlink if the user is not logged in', () => {
    const wrapper = shallow(<NavBar/>);
    expect(wrapper.find('.fa-sign-out')).toHaveLength(0);
    expect(wrapper.find('.fa-sign-in')).toHaveLength(1);
  })
})
