import React from 'react';
import ColorsArea from '../../components/ColorsArea/ColorsArea'

import './App.style.scss';

export interface AppProps {
}

export class App extends React.Component<AppProps, any> {
    render() {
        return (
            <main className="app__container">
                <ColorsArea />           
            </main>
        );
    }
}

export default App;
