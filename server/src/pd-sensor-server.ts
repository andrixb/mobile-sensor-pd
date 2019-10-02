import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

import * as midi from 'midi';

import { Message } from './model';
import { Topic } from './topic';

export class PdSensorServer {
    public static readonly PORT:number = 1212;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;
    private midiOutputs: any = new Map();

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
    }

    private config(): void {
        this.port = process.env.PORT || PdSensorServer.PORT;
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

    private createMIDIStream(label: string): void {
        const output = new midi.Output();
        output.openVirtualPort(label);
        return output
    }

    private sendTestMIDIMessage(output: any, value: number): void {
        const MIDI_NOTE_ON = 144;
        const CHANNEL_1 = 70;
        const msg = [MIDI_NOTE_ON, CHANNEL_1, value];
        // output.sendMessage(msg);
        
        if (msg[2] > 50) {
            console.log(msg)
            output.sendMessage(msg);
        }
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', this.port);
            this.midiOutputs.set(
                socket.id, 
                this.createMIDIStream(socket.id), 
            );

            socket.on(Topic.JOIN_ROOM, (room: any) => {
                socket.join(room);
                console.log('Joined room: %s', room);
            });

            socket.on(Topic.MESSAGE, (message: Message) => {
                // console.log('Mobile Sensor Message', message);
                let value = this.defineValueToSend(message);
                const current = this.midiOutputs.get(socket.id);
                this.sendTestMIDIMessage(current, value);
                
                
                // if (room) {
                //     this.io.in(room).emit(Topic.SIGNATURE_COMPLETED, message);
                //     console.log('[SERVER](message): %s', JSON.stringify(message));
                // }
            });

            // socket.on(Topic.SIGNATURE_CANCELED, (room: any, message: Message) => {
            //     console.log('Room', room, '| Topic', Topic.SIGNATURE_CANCELED, '| Message', message)
            //     if (room) {
            //         this.io.in(room).emit(Topic.SIGNATURE_CANCELED, message);
            //         console.log('[SERVER](message): %s', JSON.stringify(message));
            //     }
            // });

            // socket.on(Topic.SEND_CONFIGURATION, (room: any, message: Message) => {
            //     console.log('Room', room, '| Topic', Topic.SEND_CONFIGURATION, '| Message', message)
            //     if (room) {
            //         this.io.in(room).emit(Topic.SEND_CONFIGURATION, message);
            //         console.log('[SERVER](message): %s', JSON.stringify(message));
            //     }
            // });


            socket.on(Topic.DEVICE_CONNECTED, (room: any, message: Message) => {
                console.log('Room', room, '| Topic', Topic.DEVICE_CONNECTED, '| Message', message)
                if (room) {
                    this.io.in(room).emit(Topic.DEVICE_CONNECTED, message);
                    console.log('[SERVER](message): %s', JSON.stringify(message));
                }
            });


            socket.on('disconnect', () => {
                // this.midiOutput.closePort();
                console.log('Client disconnected');
            });
        });
    }

    private defineValueToSend(value: any): number {
        return value.content.x * value.content.y * value.content.z;
    }

    public getApp(): express.Application {
        return this.app;
    }
}

