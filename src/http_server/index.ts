import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import * as WebSocket from 'ws';
import { regRequest, regResponse } from './models/regModels';
import { uuid } from 'uuidv4';
import { addUsetToRoom, createGame } from './models/roomModels';
import { PORT } from './models/CONSTANTS';

const rooms = [];
const users = [];

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

const wsServer = new WebSocket.Server({ port: PORT });

wsServer.on('connection', (ws) => {
    let userName = '';
    let userId = '';
    ws.on('message', (msg: regRequest) => {
        const req: regRequest = JSON.parse(msg.toString());
        if (req.type === "reg") {
            users.push(msg.data);
            const type = req.type;
            const name = req.data.name;
            userName = name;
            const response: regResponse = {
                type: type,
                data: {
                    name: name,
                    index: '',
                    error: false,
                    errorText: ''
                },
                id: 0
            };
            try {
                userId = uuid();
                ws.send(JSON.stringify(req));
            } catch (err) {
                response.data.error = true;
                response.data.errorText = err;
            }
            console.log(msg);
        } else if (req.type === "create_room") {
            const response: addUsetToRoom = {
                type: 'add_user_to_room',
                data: {
                    indexRoom: 0
                },
                id: 0
            };
            const createRoomResp: createGame = {
                type: 'create_game',
                data: {
                    idGame: 0,
                    idPlayer: userId
                },
                id: 0
            };
            try {
                ws.send(JSON.stringify(response));
                console.log(JSON.stringify(createRoomResp));
            } catch (err) {
                console.error(err);
            }
            console.log(msg.toString());
        }
    });
    
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});