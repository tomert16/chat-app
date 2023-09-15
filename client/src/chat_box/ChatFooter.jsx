import React, { useState } from 'react'
import styled from 'styled-components';

function ChatFooter({socket}) {
    const [message, setMessage] = useState("")

    const handleSendMessage = (e) => {
        e.preventDefault();
        // checks if the text field is empty and if the username exists
        if (message.trim() && localStorage.getItem('userName')) {
            socket.emit('message', {
                text: message,
                name: localStorage.getItem('userName'),
                id: `${socket.id}${Math.random()}`,
                socketId: socket.id
            });
        };
        setMessage("");
    };

    console.log(localStorage)

  return (
    <Container>
        <div className="footer">
            <form className="footer-form" onSubmit={handleSendMessage}>
                <input 
                    type="text" 
                    className="footer-input" 
                    placeholder="Write message" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="submit-message">
                    Send
                </button>
            </form>
        </div>
    </Container>
  )
}

const Container = styled.div`
    .footer {
        padding: 10px;
        background-color: rgb(230, 229, 229);
        height: 5vh;
        border-style: solid;
        border-color: rgb(255, 205, 98);
        border-radius: 5px;
        border-width: 3px;
    }
    .footer-form {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .footer-input {
            border: 1px solid transparent;
            border-radius: 10px;
            width: 100%;
            height: 100%;
            outline: none;
        }
        button {
            background-color: #724f72;
            color: white;
        }
    }
`;

export default ChatFooter;