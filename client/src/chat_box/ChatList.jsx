import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChatBox from './ChatBox';
import ChatHeader from './ChatHeader';

function ChatList({socket, username}) {
  const [toggleList, setToggleList] = useState(false);
  const [selectedChat, setSelectedChat] = useState();
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
    user.self = user.username === username
  }

  useEffect(() => {
    socket.on('users', (receivedUsers) => {
      const updatedUsers = receivedUsers.map((user) => {
        // determine if the user is the current user
        user.self = user.userID === socket.id;
        // initialize reactive properties for the user
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
  },[socket, users]);

  // const handleOpenMessage = (userId) => {
  //   setOpenMessage((prevState) => ({
  //     // spreads the previous state, makes a copy of it 
  //     ...prevState,
  //     // sets the userId as the key property in the state object
  //     /// then, checks if the userId already exists in the previous state
  //     /// if it exists it closes that chat
  //     [userId]: !prevState[userId] || false
  //   }));
  // }

  const handleSelectedChat = (user) => {
    // console.log(user)
    setSelectedChat(user)
  }


  const onMessage = (content) => {
    // checks if the selectedChat exists
    if (selectedChat) {
      // emits a private message event to server
      socket.emit('private message', {
        //contains the message content 
        content,
        // specifies the reccipient's user id
        to: selectedChat.userId
      });
      // pushes any messages of that selectedChat
      selectedChat.messages.push({
        content,
        //indicates that the messages was send from the current user
        fromSelf: true,
      })
    }
  }

  socket.on('private message', ({content, from}) => {
    //create a loop to iterate over the users
    for (let i = 0; i < users.length; i++) {
      // store each user in a variable
      const user = users[i];
      // check to see if the user matches the user who sent the message
      if (user.userId === from) {
        // push the messages that correspond to that user
        user.messages.push({
          content,
          fromSelf: false,
        })
        if (user !== selectedChat) {
          user.hasNewMessages = true;
        }
        break;
      }
    }
  });

  //checks the connection status of a user
  socket.on('connection', () => {
    users.forEach((user) => {
      if(user.self) {
        user.connected = true;
      }
    });
  });

  socket.on('disconnect', () => {
    users.forEach((user) => {
      if (user.self) {
        user.connected = false;
      }
    });
  });



  return (
    <Container>
      <div className="list-container">
        <ChatHeader toggleList={toggleList} setToggleList={setToggleList}/>
        {toggleList ? <div className="list-body">
          <input 
            type="text"
            className="chat-search"
            placeholder="Search chats..."
          />
          <div className="chats-list">
            {users.map((user) => (
              <div key={user.userId} onClick={() => handleSelectedChat(user)}>
                <div>
                  {user.connected ? <i className="connected"></i> : <i className="disconnected"></i>} {user.username}
                </div>
              </div>
            ))}
          </div>
        </div> : null}
      </div>
      <div className="chat-box">
        {users.map((user) => (
          <div className="private-chats"  key={user.userId}>
            {selectedChat ? <ChatBox user={user} socket={socket} messages={messages} selectedChat={selectedChat}/> : null}
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

  .disconnected {
    height: 8px;
    width: 8px;
    border-radius: 50%;
    display: inline-block;
    background-color: #e38968;
    margin-right: 6px;
  }
  .connected {
    height: 8px;
    width: 8px;
    border-radius: 50%;
    display: inline-block;
    background-color: #86bb71;
    margin-right: 6px;
  }
`;

export default ChatList;