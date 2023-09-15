import './App.css';
import {io} from 'socket.io-client';
import ChatList from './chat_box/ChatList';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';

const socket = io('http://localhost:3000/', {autoConnect: false});

// catches any recieved event by the client and prints it to console
socket.onAny((e, ...arge) => {
  console.log(e, arge)
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home socket={socket}/>
  },
  {
    path: '/chat',
    element: <ChatList socket={socket}/>
  }
])

function App() {


  return (
    <>
      <div>
        <title>Chat App</title>
      </div>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
