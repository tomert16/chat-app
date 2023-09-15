import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChatBox from './ChatBox';
import ChatHeader from './ChatHeader';

function ChatList({socket}) {
  const [toggleChat, setToggleChat] = useState(false);
  const [openMessage, setOpenMessage] = useState({});
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  
  // useEffect to listen to the message from the server and display it
  useEffect(() => {
    // listens to the messageResponse event from socket, and adds it to the array of messages
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  },[socket, messages]);

  // // useEffect to listen to the users event from the server and display it
  // useEffect(() => {
  //   // listens to the newUserResponse event from socket
  //   socket.on('newUserResponse', (data => setUsers(data)));
  // }, [socket, users]);
  // // handler function to open user's chat when clicked

  const initReactiveProperties = (user) => {
    user.hasNewMessages = false;
  }

  useEffect(() => {
    socket.on('users', (receivedUsers) => {
      const updatedUsers = receivedUsers.map((user) => {
        users.self = user.userID === socket.id;
        initReactiveProperties(user);
        return user;
      })
      //puts the current user first, and then sorts by username
      const sortedUsers = updatedUsers.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
      setUsers(sortedUsers);
    });
  },[socket]);

  const handleOpenMessage = (userId) => {
    setOpenMessage((prevState) => ({
      // spreads the previous state, makes a copy of it 
      ...prevState,
      // sets the userId as the key property in the state object
      /// then, checks if the userId already exists in the previous state
      /// if it exists it closes that chat
      [userId]: !prevState[userId] || false
    }));
  }

  return (
    <Container>
      <div className="list-container">
        <ChatHeader toggleChat={toggleChat} setToggleChat={setToggleChat}/>
        {toggleChat ? <div className="list-body">
          <input 
            type="text"
            className="chat-search"
            placeholder="Search chats..."
          />
          <div className="chats-list">
            {users.map((user) => (
              <p key={user.socketID} onClick={() => handleOpenMessage(user.socketID)}>{user.username}</p>
            ))}
          </div>
        </div> : null}
      </div>
      <div className="chat-box">
        {users.map((user) => (
          <div className="private-chats" key={user.id}>
            {openMessage[user.id] && <ChatBox user={user} socket={socket} messages={messages}/>}
          </div>

        ))}
      </div>
    </Container>
  )
}

const Container = styled.div`
   .list-container {
     position: absolute;
     bottom: 1%;
     right: 2%;
     background-color: rgb(230, 229, 229);
     border-radius: 10px;
   }
   .list-body {
     border-style: solid;
     height: max-content;
     border-bottom-left-radius: 10px;
     border-bottom-right-radius: 10px;
  }
  .chat-search {
    width: 90%;
  }
  .chats-list {
    margin: 5px;
    text-align: left;
    p {
      cursor: pointer;
      height: 5vh;
      border-style: solid;
    }
  }
  .chat-box {
    display: flex;
  }
  /* .private-chats {
    display: flex;
  } */
`;

export default ChatList;