import { Message, User } from '.';

export class QrMessage extends Message{
    constructor(from: User, content: string) {
        super(from, content);
    }
}
