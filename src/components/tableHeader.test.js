import React from 'react';
import {shallow} from "enzyme";
import TableHeader from "./common/tableHeader";

describe('trip', () => { 
    it('should render trip correctly', () => { 
        const mockColumns = [
            { path: '', label: '', key: 1 }, 
            { path: '', label: '', key: 2 }, 
            { path: '', label: '', key: 3},
        ]
        const sortColumn = {path: '', order: ''}
        
        const component = shallow(<TableHeader columns={mockColumns} sortColumn={sortColumn}/>); 
        expect(component.find('.tableHeaderTest')).toHaveLength(1);
    });
})
