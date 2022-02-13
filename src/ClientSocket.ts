import { Client, IMessage, Message, messageCallbackType,  } from '@stomp/stompjs'
import SockJS from 'sockjs-client';

let client: Client;

const connect = (name: string): void => {
    console.log("Connect")

    client = new Client({
        webSocketFactory: () => { return new SockJS('http://localhost:8080/gs-guide-websocket'); },
        reconnectDelay: 50000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    });

    client.onConnect = (frame) => {
        client.subscribe('/topic/greetings', (message: IMessage) => {
            console.log("greetings subscribed")
            console.log(JSON.parse(message.body));
        })
        sendMessage(name);
    }
    // stompClient.connect({}, function (frame) {
    //     setConnected(true);
    //     console.log('Connected: ' + frame);
    //     stompClient.subscribe('/topic/greetings', function (greeting) {
    //         showGreeting(JSON.parse(greeting.body).content);
    //     });
    // });

    client.onStompError = function (frame) {
        // Will be invoked in case of error encountered at Broker
        // Bad login/passcode typically will cause an error
        // Complaint brokers will set `message` header with a brief message. Body may contain details.
        // Compliant brokers will terminate the connection after any error
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
    };

    client.activate();
}

const sendMessage = (message: string): void => {
    client.publish({
        destination: "/app/hello",
        body: JSON.stringify({
            name: message
        })
    })
}


const disconnect = (): void => {
    console.log("Disconnect")
}


export default connect;