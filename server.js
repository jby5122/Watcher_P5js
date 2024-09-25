const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const WebSocket = require('ws');

const app = express();
const PORT = 3000; //you can choose your desire port


app.use(cors());
app.use(bodyParser.json());

// Create WebSocket
const wss = new WebSocket.Server({ noServer: true });

// WebSocket connection
wss.on('connection', (ws) => {
    console.log('client connected');

    // test send to client
    ws.send(JSON.stringify({ content: 'hello from server ~' }));

    //get message
    ws.on('message', (message) => {
        console.log('message received:', message);
    });

    ws.on('close', () => {
        console.log('client disconnected');
    });
});

// let http listen to WebSocket
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});


app.post('/v1/notification/event', (req, res) => {
    console.log('received POST data:', req.body);
    // receive data from Watcher, and post to every client (http website)
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ content: req.body }));
        }
    });

    // response successfully back to watcher saying that the server got the message
    res.status(200).json({ message: 'Data received', receivedData: req.body });
});
