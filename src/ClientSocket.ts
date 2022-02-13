import { Client, IMessage } from '@stomp/stompjs'
import SockJS from 'sockjs-client';
import { Message } from './components/Messages'

let client: Client;

export function connect(handleNewMessage: (name: string, message: string) => void): void {
    console.log("Connect")

    client = new Client({
        webSocketFactory: () => { return new SockJS('http://localhost:8080/gs-guide-websocket'); },
        reconnectDelay: 50000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    });

    client.onConnect = (frame) => {
        client.subscribe('/response/message', (message: IMessage) => {
            let body: Message = JSON.parse(message.body);
            console.log(body);
            handleNewMessage(body.name, body.message);
        })
    }

    client.onStompError = function (frame) {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
    };

    client.activate();
}

export function sendMessage(name: string, message: string): void {
    client.publish({
        destination: "/request/message",
        body: JSON.stringify({
            name: name,
            message: message
        })
    })
}


export function disconnect(): void {
    console.log("Disconnect")
}
