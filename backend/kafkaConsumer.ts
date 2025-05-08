import { Kafka } from 'kafkajs';
import wss from './websocketServer.js';
import WebSocket from 'ws';

let wsClient: any;
const clients: Set<WebSocket> = new Set();

// wesocket server connection
wss.on('connection', (ws) => {
    clients.add(ws);

    console.log('CONNECTED TO WEB SOCKET');

    ws.on('close', () => {
        clients.delete(ws);
    });
});

// kafka connection
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
});

const consumer = kafka.consumer({groupId: 'transaction-inventory-group'});
const topics = ['transactions', 'inventory'];

// subsribe to topics
const run = async () => {
    await consumer.connect();
    await consumer.subscribe({topics: ['transactions', 'inventory'], fromBeginning: true});

    await consumer.run({
        eachMessage: async({ topic, partition, message }) => {
            // process incoming message 
            const msgValue = message.value?.toString();
            console.log(`Consumer received message: ${msgValue}`);

            if (!msgValue) {
                console.log("NO MSG VALUE");
                return;
            }

            try {
                const parsed = JSON.parse(msgValue);
                const payload = parsed.payload;

                console.log(`PAYLOAD: ${payload}`); 

                // detect type from attributes payload
                let type = '';
                if ('items' in payload) {
                    type = 'transaction';
                } else {
                    type = 'inventory';
                }

                // send messages to frontend 
                for (const client of clients) {
                    if (client.readyState === WebSocket.OPEN) {
                      client.send(JSON.stringify({ type, payload }));
                    }
                }
            }
            catch (err) {
                console.error("failed to parse kafka message: ", err);
            }
        },
    });
};

run().catch(console.error);
