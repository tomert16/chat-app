import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Home({ socket, username, setUsername }) {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // localStorage.setItem('userName', userName)
        // sends username and socket Id to node server
        // socket.emit('newUser', { userName, socketId: socket.id})
        socket.auth = { username }
        navigate('/chat');
        socket.connect();
    }

  return (
    <Container>
        <form className='home-container' onSubmit={handleSubmit}>
            <h2 className="home-header">Sign in</h2>
            <label htmlFor="username">Username</label>
            <input 
                type="text" 
                className="username-input" 
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button className="submit-btn">Sign In</button>
        </form>
    </Container>
  )
}

const Container = styled.div`
    .home-container {
        /* place-content: center; */
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .home-container > * {
        margin-bottom: 10px;
    }
    .home-header {
        margin-bottom: 30px;
    }
    .username-input {
        padding: 10px;
        width: 50%;
    }
    .submit-btn {
        width: 200px;
        padding: 10px;
        font-size: 16px;
        cursor: pointer;
        background-color: #607eaa;
        color: #f9f5eb;
        outline: none;
        border: none;
        border-radius: 5px;
    }
`;

export default Home;