import http from "http";
import express from "express";
import cors from "cors";
import configWebSocket from "./src/websockets.js";
import routing from "./src/routing.js";

const app = express();

app.use(cors());

routing(app);

const server = http.createServer(app);

const webSocketServer = configWebSocket(server);

server.listen(8999, () => console.log("Server started"));
