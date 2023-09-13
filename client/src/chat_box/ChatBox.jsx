import React, { useState } from 'react';
import styled from 'styled-components';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';

function ChatBox() {
  const [toggleChat, setToggleChat] = useState(false);

  return (
    <Container>
        {toggleChat ? <div className="chatbox-body">
                <ChatHeader setToggleChat={setToggleChat}/>
            <div className="chatbox-main">
                <ChatFooter />
            </div>
        </div> : <ChatHeader setToggleChat={setToggleChat} closed={true} />}
    </Container>
  )
}

const Container = styled.div`
    .chatbox-body {
        border-style: solid;
        height: 55vh;
        width: 45vh;
    }
    .chatbox-main {
        position: relative;
        top: 16.5rem;
    }
`;

export default ChatBox;