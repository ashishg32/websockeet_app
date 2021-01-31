const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 8082
});

wss.on('connection', ws => {
  console.log("New clieent connected!");

  ws.on('message', (message) => {
    console.log(`Data received: ${message}`)

    ws.send("Hello From the server side");
  });

  ws.on('close', () =>{
    console.log('Client has disconnected');
  });
});