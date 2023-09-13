const express = require('express');
const app = express();
const { createServer } = require('node:http')
const { join } = require('node:path');
const { Server } = require('socket.io');


//cors middleware
const cors = require('cors');
app.use(cors());

const server = createServer(app);
const PORT = process.env.PORT || 3000;
// socket.io defaults
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
})

io.on('connection', (socket) => {
    console.log('connected', `User ${socket.id} connected`);

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