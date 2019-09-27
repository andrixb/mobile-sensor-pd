import React from 'react';
import DraggableArea from '../../components/DraggableArea/DraggableArea'

import './App.style.scss';

export interface AppProps {
}

export class App extends React.Component<AppProps, any> {
    render() {
        return (
            <main className="app__container">
                <DraggableArea />           
            </main>
        );
    }
}

export default App;
