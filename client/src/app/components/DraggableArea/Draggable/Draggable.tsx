import React, { ReactNode } from 'react';
import './Draggable.style.scss';
import { DraggablePosition } from '../../../models/DraggablePosition';

export interface DraggableProps {
    id: string;
    children: ReactNode;
    initPosition: DraggablePosition;
    currentPosition?: DraggablePosition;
    mouseDownHandler?: any;
    mouseUpHandler?: any;
    touchStartHandler?: any;
    touchEndHandler?: any;
}

export const Draggable: React.FunctionComponent<DraggableProps> = ({ id, initPosition, currentPosition, mouseDownHandler, mouseUpHandler, touchStartHandler, touchEndHandler, ...props }) => {
    const style={
        left: `${currentPosition? currentPosition.x : initPosition.x}`,
        top: `${currentPosition? currentPosition.y : initPosition.y}`
    }
    
    return (
        <div
            id={id}
            key={id}
            className="draggable__container" 
            onMouseDown={mouseDownHandler}
            onMouseUp={mouseUpHandler}
            onTouchStart={touchStartHandler}
            onTouchEnd={touchEndHandler}
            style={style}
        >
            {props.children}
        </div>
    );
}

export default Draggable;
