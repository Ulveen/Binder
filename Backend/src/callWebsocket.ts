import http from 'http';
import WebSocket from 'ws';

const clients = new Map();
const inQueue: string[] = [];
const rules = new Map<string, Map<string, number>>();
const calls: string[] = [] 

function findCallPair(email: string) {
    const now = Date.now();
    for (const client of inQueue) {
        const rule = rules.get(client);
        if (client !== email && (!rule?.get(email) || (now - rule.get(email)! > 86400000))) {
            return client;
        }
    }
    return null;
}

function updateRules(email: string, client: string, now: number) {
    if (!rules.has(email)) {
        rules.set(email, new Map<string, number>());
    }
    if (!rules.has(client)) {
        rules.set(client, new Map<string, number>());
    }
    rules.get(email)!.set(client, now);
    rules.get(client)!.set(email, now);
}

function handleOnMessage(message: WebSocket.RawData, ws: WebSocket) {
    const parsed = JSON.parse(message.toString());
    const email = parsed.email;

    console.log(parsed);
    

    switch (parsed.type) {
        case 'init':
            clients.set(email, ws);
            const client = findCallPair(email);
            if (!client) {
                inQueue.push(email);
                return;
            }
            const newCallId = `${email}-${client}`;
            const payload = JSON.stringify({ newCallId });

            clients.get(client)?.send(payload);
            ws.send(payload);

            inQueue.splice(inQueue.indexOf(client), 1);

            const now = Date.now();
            updateRules(email, client, now);
            calls.push(newCallId);
            break;

        case 'next':
            const callId = calls.find(call => call.includes(email));
            const pair = callId?.split('-').find(call => call !== email);

            if (pair) {
                const payload = JSON.stringify({ type: 'next'});
                clients.get(pair)?.send(payload);
                ws.send(payload);
            }
            calls.splice(calls.indexOf(callId!), 1);
            break;
    }
}

function handleOnClose(ws: WebSocket) {
    for(const [email, client] of clients) {
        if (client === ws) {
            clients.delete(email);
            inQueue.splice(inQueue.indexOf(ws.toString()), 1);
            const callId = calls.find(call => call.includes(email));
            const pair = callId?.split('-').find(call => call !== email);
            if (pair) {
                const payload = JSON.stringify({ type: 'next'});
                clients.get(pair)?.send(payload);
            }
            break;
        }
    };
    inQueue.splice(inQueue.indexOf(ws.toString()), 1);
}

function initializeWebSocket(server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        ws.on('message', (message) => handleOnMessage(message, ws));
        ws.on('close', () => handleOnClose(ws));
    });

    return wss;
}

export default initializeWebSocket;
