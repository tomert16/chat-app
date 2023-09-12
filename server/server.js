const express = require('express');
const app = express();
const { createServer } = require('node:http')
const { join } = require('node:path');
const { Server } = require('socket.io');

//users object

const server = createServer(app);
const PORT = process.env.PORT || 3000;
// socket.io defaults
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
})

io.on('connection', (socket) => {
    io.emit('connected', `User ${socket.id} connected`);

    socket.on('chat message', (msg) => {
        io.emit('chat message',  `User ${socket.id}: ${msg}`);
    });
     socket.on('disconnect', (msg) =>{
       io.emit('disconnected', msg = `User ${socket.id} disconnected`);
    })
});


server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});