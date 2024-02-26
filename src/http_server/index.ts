import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import * as WebSocket from 'ws';
import { soCerReq } from './models/models';

export const httpServer = http.createServer(function (req, res) {
    const __dirname = path.resolve(path.dirname(''));
    const file_path = __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
    fs.readFile(file_path, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
});

const wsServer = new WebSocket.Server({ port: 3000 });

wsServer.on('connection', (ws) => {
    ws.on('message', (msg) => {
        const req: soCerReq = JSON.parse(msg.toString());
        if (req.type === "reg") {
            console.log(req);
        }
    });
    
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});