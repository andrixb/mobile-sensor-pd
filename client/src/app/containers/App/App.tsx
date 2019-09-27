import React from 'react';
import ColorsArea from '../../components/ColorsArea/ColorsArea'

import './App.style.scss';

export interface AppProps {
}

export interface AppState {
}

export class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
    }

    render() { 
        return (
            <main className="app__container">
                <ColorsArea />
            </main>
        );
    }
}

export default App;
