import React from 'react';
// import uuid from 'uuid/v4';
import Draggable from './Draggable/Draggable'
import { DraggablePosition } from '../../models/DraggablePosition';
import ImageBackground from '../../../assets/bkg.jpg';

import './DraggableArea.style.scss';

declare global {
    interface Window {
        TouchEvent: Object;
    }
}

export interface DraggableAreaProps {
}

export class DraggableArea extends React.Component<DraggableAreaProps, any> {
    constructor(props: DraggableAreaProps) {
        super(props);

        this.state = {
            initPosition: new DraggablePosition(0, 0),
            isDragging: false,
        }
    }

    public mouseDownHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => this.eventStartHandler(event);
    public mouseUpHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => this.eventEndHandler(event);
    public mouseMoveHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => this.eventMoveHandler(event);

    public touchMoveHandler = (event: React.TouchEvent<HTMLDivElement>) => {
        event.preventDefault();
        this.eventMoveHandler(event);
    }

    public touchStartHandler = (event: React.TouchEvent<HTMLDivElement>) => {
        event.preventDefault();
        this.eventStartHandler(event);
    }

    public touchEndHandler = (event: React.TouchEvent<HTMLDivElement>) => {
        event.preventDefault();
        this.eventEndHandler(event);
    }

    private isTouch = (event: React.TouchEvent | React.MouseEvent): event is React.TouchEvent => {
        return window.TouchEvent ? event.nativeEvent instanceof TouchEvent : false;
    }

    private eventStartHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
        const { currentPosition, initPosition } = this.state;

        if (!this.isTouch(event)) {
            this.setState({
                initPosition: new DraggablePosition(
                    !currentPosition ? event.clientX : currentPosition.x - initPosition.x,
                    !currentPosition ? event.clientY : currentPosition.y - initPosition.y,
                ),
                currentPosition: new DraggablePosition(event.clientX - initPosition.x, event.clientY - initPosition.y),
            });
        } else {
            if (event.touches) {
                this.setState({
                    initPosition: new DraggablePosition(
                        !currentPosition ? event.touches[0].clientX : currentPosition.x - initPosition.x,
                        !currentPosition ? event.touches[0].clientY : currentPosition.y - initPosition.y,
                    ),
                    currentPosition: new DraggablePosition(event.touches[0].clientX - initPosition.x, event.touches[0].clientY - initPosition.y),
                });
            }
        }

        this.setState({
            isDragging: true,
        });
    }

    private eventEndHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
        const { currentPosition, initPosition } = this.state;

        this.setState({
            initPosition: new DraggablePosition(currentPosition.x - initPosition.x, currentPosition.y - initPosition.y),
            isDragging: false,
        });
    }

    private eventMoveHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
        let currentX;
        let currentY;

        const { initPosition } = this.state;

        const DRAGGABLE_ELEMENT_WIDTH = 120;
        const DRAGGABLE_ELEMENT_HEIGHT = 70;

        const areaWidth = event.currentTarget.getBoundingClientRect().width;
        const areaHeight = event.currentTarget.getBoundingClientRect().height;

        const rightBound = areaWidth - DRAGGABLE_ELEMENT_WIDTH;
        const bottomBound = areaHeight - DRAGGABLE_ELEMENT_HEIGHT;

        if (!this.isTouch(event)) {
            currentX = event.clientX - initPosition.x;
            currentY = event.clientY - initPosition.y;
        } else {
            currentX = event.touches[0].clientX - initPosition.x;
            currentY = event.touches[0].clientY - initPosition.y;
        }

        if (this.state.isDragging) {

            if (currentX <= 0) {
                currentX = 0;
            }

            if (currentY <= 0) {
                currentY = 0;
            }

            if (currentX >= rightBound) {
                currentX = rightBound;
            }

            if (currentY >= bottomBound) {
                currentY = bottomBound;
            }

            this.setState({
                currentPosition: new DraggablePosition(currentX, currentY),
            });
        }

    }

    render() {
        const { initPosition, currentPosition } = this.state;

        return (
            <div
                className="draggable-area__container"
                onMouseMove={this.mouseMoveHandler}
                onTouchMove={this.touchMoveHandler}
            >
                <img src={ImageBackground} alt="background image" />
                <Draggable
                    id="js-draggable"
                    initPosition={initPosition}
                    currentPosition={currentPosition}
                    mouseUpHandler={this.mouseUpHandler}
                    mouseDownHandler={this.mouseDownHandler}
                    touchStartHandler={this.touchStartHandler}
                    touchEndHandler={this.touchEndHandler}
                >
                    <p>Add (pretty much) anything here</p>
                </Draggable>
            </div>
        );
    }
}

export default DraggableArea;
