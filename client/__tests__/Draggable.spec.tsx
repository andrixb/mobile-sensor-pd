import * as React from 'react';
import { shallow } from 'enzyme';
import Draggable from '../src/app/components/DraggableArea/Draggable/Draggable';
import { DraggablePosition } from '../src/app/models/DraggablePosition';

describe('Draggable', () => {
    let component: any;
    const mockPropMouseDown = jest.fn();

    beforeEach(() => {
        component = shallow(
            <Draggable
                id='test-id'
                mouseDownHandler={mockPropMouseDown}
                initPosition={new DraggablePosition(0, 0)}
            ><div>test</div>
            </Draggable>
        );
    });

    it('renders without crashing', () => {
        expect(component).toMatchSnapshot();
    });

    it('renders the Draggable component', () => {
        expect(component.find('Draggable')).toBeTruthy();
    });

    it('sets the element in the top-left corner', () => {
        let element = component.find('#test-id');
        expect(element.prop('style')).toHaveProperty('left', '0');
    });

    it(('interacts with the Draggable component'), () => {
        let element = component.find('#test-id');
        element.simulate('mousedown');
        component.update();
        expect(mockPropMouseDown).toHaveBeenCalledTimes(1);
    });
});
