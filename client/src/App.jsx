import './App.css'
import ChatBox from './chat_box/ChatBox';
import socketIO from 'socket.io-client';
import ChatList from './chat_box/ChatList';

const socket = socketIO.connect('http://localhost:3000');

function App() {


  return (
    <>
      <ChatList />
      {/* <ChatBox /> */}
    </>
  )
}

export default App;
