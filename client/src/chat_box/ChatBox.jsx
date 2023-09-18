import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ChatFooter from './ChatFooter';
import {GrClose} from 'react-icons/gr'

function ChatBox({ user, socket, messages, selectedChat }) {
  const [exitChat, setExitChat] = useState(false);
  const lastMessageRef = useRef(null);

  // check if the current chat box belongs to the selected user
  const isChatSelected = selectedChat && selectedChat.self === false && selectedChat.userId === user.userId;

//   const handleExitChat = () => {
//       setExitChat(!exitChat);
//   }

console.log(user.connected)
//   function to automatically scroll to the bottom when a new message arrives
  useEffect(() => {
      lastMessageRef.current?.scrollIntoView( {behavior: 'smooth'} )
  }, [messages])

  

  return (
    <Container>
        <>
            {isChatSelected ? <div>
                <header className="chat-header">
                    <p>{user.username}</p>
                    <button className="exit-btn" >
                        <GrClose />
                    </button> 
                </header>
                <div className="chatbox-body" ref={lastMessageRef}>
                {messages.map((message) => 
                    message.name === localStorage.getItem('userName') ? 
                    (<div className="message-chats" key={message.id}>
                        <p className="sender-name">You</p>
                        <div className="message-sender">
                            <p>{message.text}</p>
                        </div>
                    </div>) : (<div className="message-chats" key={message.id}>
                    <p>{message.name}</p>
                    <div className="message-recipient">
                        <p>{message.text}</p>
                    </div>
                </div>)
                    )}
                {/* triggered when someone is typing */}
                <div className="message-status">
                    <p>Someone is typing...</p>
                </div>
                </div>
                <div className="chatbox-main">
                    <ChatFooter socket={socket}/>
                </div>
            </div> : null}
        </>
    </Container>
  )
}

const Container = styled.div`
    position: absolute;
    top:0;
    left: 3%;
    .chat-header {
        height: 2rem;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        border-style: solid;
        border-color: transparent;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: rgb(255, 205, 98);
    }
    .exit-btn {
        height: 2rem;
        background-color: transparent;
        border-color: transparent;
        svg{
            font-size: 1rem;
        }
    }
    .chatbox-body {
        border-style: solid;
        height: 70vh;
        width: 70vw;
        /* display: flex;
        flex-direction: column; */
        /* justify-content: flex-end; */
        overflow-y: scroll;
    }
    .chatbox-main{
        position: relative;
        bottom: 4rem;
    } 
    .message-recipient {
        background-color: #f5ccc2;
        width: 200px;
        padding: 5px;
        font-size: 15px;
        border-radius: 10px;

    }
    .message-sender {
        background-color: rgb(194, 243, 194);
        max-width: 200px;
        padding: 5px;
        border-radius: 10px;
        font-size: 15px;
        margin-left: auto;
    }
    .message-chats > p {
        font-size: 13px;
    }
    .sender-name {
        text-align: right;
    }
    .message-status {
        font-size: 13px;
        font-style: italic;
        position: absolute;
        bottom: 30%;
    }
`;

export default ChatBox;