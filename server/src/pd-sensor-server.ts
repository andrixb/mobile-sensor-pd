import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

import { Message } from './model';
import { Topic } from './topic';

export class PdSensorServer {
    public static readonly PORT:number = 1212;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;

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

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', this.port);

            socket.on(Topic.JOIN_ROOM, (room: any) => {
                socket.join(room);
                console.log('Joined room: %s', room);
            });

            // socket.on(Topic.SIGNATURE_COMPLETED, (room: any, message: Message) => {
            //     console.log('Room', room, '| Topic', Topic.SIGNATURE_COMPLETED, '| Message', message)
            //     if (room) {
            //         this.io.in(room).emit(Topic.SIGNATURE_COMPLETED, message);
            //         console.log('[SERVER](message): %s', JSON.stringify(message));
            //     }
            // });

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
                console.log('Client disconnected');
            });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}
