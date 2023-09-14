import React, { useState } from 'react';
import styled from 'styled-components';
import ChatFooter from './ChatFooter';
import {GrClose} from 'react-icons/gr'

function ChatBox({ user }) {
  const [exitChat, setExitChat] = useState(false);

  const handleExitChat = () => {
      setExitChat(!exitChat);
  }

  return (
    <Container>
        {exitChat ? null : 
        <div>
            <div className="chat-header">
                <p>{user.name}</p>
                <button className="exit-btn" onClick={handleExitChat}>
                    <GrClose />
                </button> 
            </div>
            <div className="chatbox-body">
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <div className="chatbox-main">
                    <ChatFooter />
                </div>
            </div>
        </div>}
    </Container>
  )
}

const Container = styled.div`
    
    .chat-header {
        width: 20rem;
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
        height: fit-content;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
    /* .chatbox-main {
        position: relative;
        bottom: 0;
    } */

`;

export default ChatBox;