import React, { useState } from 'react';
import styled from 'styled-components';

function ChatHeader({ setToggleChat, closed }) {

    const handleCloseChat = () => {
        setToggleChat(false)
    }

    const handleOpenChat = () => {
        setToggleChat(true)
    }


  return (
    <Container>
        <div className="header" >
            {closed ? <button className="btn" onClick={handleOpenChat}>^</button> : <button className="btn" onClick={handleCloseChat}>X</button>}
            <p>Name</p>
        </div>
    </Container>
  )
}

const Container = styled.div`
    .header {
        /* width: 92%; */
        padding: 10px;
        display: flex;
        justify-content: space-between;
        border-style: solid;
        border-color: transparent;
        background-color: rgb(255, 205, 98);
    }
    .btn {
        height: 2rem;
        position: relative;
        top: 1rem;
    }
`;

export default ChatHeader;