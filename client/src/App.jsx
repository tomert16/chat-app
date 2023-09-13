import './App.css'
import ChatBox from './chat_box/ChatBox';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:3000');

function App() {


  return (
    <>
      <ChatBox />
    </>
  )
}

export default App;
