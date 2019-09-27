import * as React from 'react';
import { shallow } from 'enzyme';
import DraggableArea from '../src/app/components/DraggableArea/DraggableArea';

describe('DraggableArea', () => {
    let component: any;

    beforeEach(() => {
        component = shallow(
            <DraggableArea></DraggableArea>
        );
    });

    it('renders without crashing', () => {
        expect(component).toMatchSnapshot();
    });

    it('renders the DraggableArea component', () => {
        expect(component.find('DraggableArea')).toBeTruthy();
    });
});