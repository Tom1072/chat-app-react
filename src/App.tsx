import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ConnectForm from './components/ConnectForm';
import MessageForm from './components/MessageForm';
import Messages, { Message } from './components/Messages'

const App: React.FC = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState<string>("");

  const addMessage = (name: string, message: string): void => {
    // setMessages([...messages, {name, message}])
    setMessages((current) => [...current, {name: name, message: message}])
  }

  return (
    <div className="App">
      <Header />
      {connected ? (
        <>
          <MessageForm name={name}/>
          <Messages messages={messages}/>
        </>
      ) : (
        <ConnectForm setConnected={setConnected} handleNewMessage={addMessage} setGlobalName={setName} />
      )}
    </div>
  );
}

export default App;
