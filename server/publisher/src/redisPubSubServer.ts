import { createClient } from 'redis';
import { WebSocketServer, WebSocket } from 'ws';

const redisClient = createClient();
const wss = new WebSocketServer({ port: 8081 });

const clients: { [requestId: string]: WebSocket } = {};

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log('Received message from client:', message.toString());
    const { requestId } = JSON.parse(message.toString());
    clients[requestId] = ws;
    console.log('Client registered with requestId:', requestId);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    for (const id in clients) {
      if (clients[id] === ws) {
        delete clients[id];
        console.log('Client with requestId', id, 'removed');
      }
    }
  });
});

const subscribeToRedis = async () => {
  const subscriber = redisClient.duplicate();
  await subscriber.connect();
  console.log('Connected to Redis');

  subscriber.pSubscribe('*', (message, channel) => {
    console.log('Received message from Redis:', message, 'on channel:', channel);
    const client = clients[channel];
    if (client) {
      client.send(JSON.stringify({ result: message }));
      console.log('Sent message to client with requestId:', channel);
    } else {
      console.log('No client found for channel:', channel);
    }
  });
};

subscribeToRedis().catch((error) => {
  console.error('Error subscribing to Redis:', error);
});