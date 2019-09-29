import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import Socket from './Socket';
import ColorsArea from '../../components/ColorsArea/ColorsArea';

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
        this.state.socket.connect(uuid(), '1212');
        this.getMobilePermissions();
    }

    onChange = (value: boolean) => {
        this.setState({ isConnected: value });
    };

    onMessage = () => {
        this.setState({ isConnected: true });
    };

    getMobilePermissions = () => {
        navigator.permissions.query({ name: 'accelerometer' }).then((result: PermissionStatus) => {
            if (result.state !== 'granted') {
              return;
            }

            this.getAccelerometerValues();
          }).catch((err: any) => {
            console.log('Integration with Permissions API is not enabled, still try to start');
          });
    };

    getAccelerometerValues = () => {
        let accelerometer = new Accelerometer();
        accelerometer.addEventListener('error', (event: any) => {
            // Handle runtime errors.
            if (event.error.name === 'NotAllowedError') {
                // Branch to code for requesting permission.
            } else if (event.error.name === 'NotReadableError' ) {
                console.log('Cannot connect to the sensor.');
            }
        });
        accelerometer.addEventListener('reading', (event: any) => console.log('here', event.target));
        accelerometer.start();
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
