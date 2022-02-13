import './App.css';
import Header from './components/Header';
import Form from './components/ConnectForm';
import connect from './ClientSocket';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header title="Chat Application" />
      <Form handleConnect= {connect} />
    </div>
  );
}

export default App;
