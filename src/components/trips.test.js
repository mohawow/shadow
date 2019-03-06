import React from 'react';
import {shallow} from "enzyme";
import Trips from "./trips";

// jest.mock("../services/tripService", () => ({
//     getTrips: jest.fn().mockReturnValue({ data: {trips: [] }}),
//   deleteTrip: jest.fn()
// }));
// jest.mock("../services/shiftService", () => ({
//   getShifts: jest.fn().mockReturnValue({data: []}),
// }));

// import axios from "axios";
// jest.mock("axios");

// describe('trip', () => { 

//     it('should render trip correctly', () => { 
//         const component = shallow(<Trips/>); 

//         const response = { data: true };
//         axios.get.mockResolvedValue(response);
      
//         expect(component.find('.tripTest')).toHaveLength(1)
//     });
// })
