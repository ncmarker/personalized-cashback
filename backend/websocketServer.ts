import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ host: '0.0.0.0', port: 8081 });

wss.on('listening', () => {
    const port = (wss.address() as any).port;
    console.log(`WebSocket running on port: ${port}`);
});

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.send(JSON.stringify({ message: 'Connected to WebSocket server' }));

    ws.on('message', (data) => {
        console.log(`Websocket received message: ${data}`);
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

export default wss;
