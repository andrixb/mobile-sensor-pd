import React from 'react';
import { connect } from 'react-redux';
import Socket from './Socket';
import ColorsArea from '../../components/ColorsArea/ColorsArea'

import './App.style.scss';

export interface IAppProps {
}

export interface IAppState {
    isConnected: boolean;
    message: { from: string, content: string };
    socket: Socket;
}

export class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);

        this.state = {
            isConnected: false,
            message: { from: '', content: ''},
            socket: new Socket(this.onChange, this.onMessage),
        };
    }

    componentDidMount() {
        this.state.socket.connect('user1', '1212');
    }

    onChange = (value: boolean) => {
        this.setState({ isConnected: value });
        console.log(this.state.isConnected);
    };

    onMessage = () => {
        this.setState({ isConnected: true });
        console.log(this.state.isConnected);
    };

    render() { 
        return (
            <main className="app__container">
                <ColorsArea />
            </main>
        );
    }
}

function mapStateToProps(state: IAppState) {
    return { };
}

export default connect(mapStateToProps, {})(App);
