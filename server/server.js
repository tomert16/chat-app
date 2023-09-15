const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const httpServer = require('http').createServer();


//cors middleware
const cors = require('cors');
app.use(cors());

// socket.io defaults
const io = require('socket.io')(httpServer, {
    cors: {
        origin: 'http://localhost:5173'
    }
})
app.get('/api', (req, res) => {
    res.json({
        message: 'Hello, world'
    });
})
// middleware to check the username and allows the connection
io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username || username.trim() === '') {
        return next(new Error('Invalid username'));
    }
    // username is attached to attribute of the socket object, to be reused later
    socket.username = username;
    next();
})

let connectedUsers = [];

io.on('connection', (socket) => {
    console.log('connected', `User ${socket.id} connected`);
    // listen when a new user joins the server
    connectedUsers.push({
        userId: socket.id,
        username: socket.username,
    })
    io.emit('users', connectedUsers);

    socket.broadcast.emit('user connected', {
        userID: socket.id,
        username: socket.username,
    });

    socket.on('message', (data) => {
        // console.log('message',  `User ${socket.id}: ${msg}`);
        io.emit('messageResponse', data);
    });

     socket.on('disconnect', () =>{
       console.log('disconnected', `User ${socket.id} disconnected`);
       // updates the list when a user is disconnected
       connectedUsers = connectedUsers.filter((user) => user.userId !== socket.id)
      //send the new list of users to the client 
      io.emit('users', connectedUsers);
      socket.disconnect();   
    })
});


httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});