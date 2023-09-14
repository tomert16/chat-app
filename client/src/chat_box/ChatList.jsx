import React, { useState } from 'react';
import styled from 'styled-components';
import ChatBox from './ChatBox';
import ChatHeader from './ChatHeader';

function ChatList() {
  const [toggleChat, setToggleChat] = useState(false);
  const [openMessage, setOpenMessage] = useState({});

  const users = [
    {id:1, name: "User 1"},
    {id:2, name: "User 2"},
    {id:3, name: "User 3"},
    {id:4, name: "User 4"},
    {id:5, name: "User 5"},
  ]

  const handleOpenMessage = (userId) => {
    setOpenMessage((prevState) => ({
      ...prevState,
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
              <p key={user.id} onClick={() => handleOpenMessage(user.id)}>{user.name}</p>
            ))}
          </div>
        </div> : null}
      </div>
      <div className="chat-box">
        {users.map((user) => (
          <div className="private-chats">
            {openMessage[user.id] && <ChatBox user={user}/>}
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