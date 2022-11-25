import cors from 'cors';
import express from 'express';
import expressify from 'uwebsockets-express';

import { monitor } from '@colyseus/monitor';
import { uWebSocketsTransport } from '@colyseus/uwebsockets-transport';

import { Server } from 'colyseus';
import { GameRoom } from './room/room';

const port = Number(process.env.PORT || 1447);

const transport = new uWebSocketsTransport();

const app = expressify(transport.app);

app.use(cors());
app.use(express.json());

const colyseusServer = new Server({
  transport,
});

// register room handlers
colyseusServer.define('my-room', GameRoom, { name: 'Test', mald: 'nice' });

// register monitor after room handlers
app.use('/colyseus', monitor());

colyseusServer.listen(port);
console.log(`Listening on ws://localhost:${port}`);
