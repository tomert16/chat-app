import React, { useState } from 'react';
import styled from 'styled-components';
import { HiChevronUp, HiChevronDown } from 'react-icons/hi';

function ChatHeader({ toggleList, setToggleList }) {

    const handleListToggle = () => {
        setToggleList(!toggleList)
    }


  return (
    <Container>
        <div className="header" onClick={handleListToggle}>
            <p>Chat</p>
            {toggleList ? 
                <button className="btn" onClick={handleListToggle}>
                    <HiChevronDown />
                </button> 
                : 
                <button className="btn" onClick={handleListToggle}>
                    <HiChevronUp />
                </button>
            }
        </div>
    </Container>
  )
}

const Container = styled.div`
    .header {
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
    .btn {
        height: 2rem;
        background-color: transparent;
        border-color: transparent;
        svg{
            font-size: 2rem;
        }
    }
`;

export default ChatHeader;