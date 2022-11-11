import cors from 'cors';
import express from 'express';
import { createServer } from 'http';

import { monitor } from '@colyseus/monitor';
import { Server } from 'colyseus';
import { GameRoom } from './room/room';

const port = Number(process.env.PORT || 1447);
const app = express();

app.use(cors());
app.use(express.json());

const server = createServer(app);
const colyseusServer = new Server({ server });

// register room handlers
colyseusServer.define('my-room', GameRoom, { name: 'Test', mald: 'nice' });

// register monitor after room handlers
app.use('/colyseus', monitor());

colyseusServer.listen(port);
console.log(`Listening on ws://localhost:${port}`);
