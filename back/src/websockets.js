import WebSocket from "ws";
import faker from "faker";

/**
 * Function for configuration of websockets on server
 * @param server - where will be configuration os websockets
 */
export default (server) => {
  const webSocketServer = new WebSocket.Server({ server });

  webSocketServer.on("connection", (ws) => {
    ws.on("message", (m) => {
      webSocketServer.clients.forEach((client) => client.send(m));
    });

    ws.on("error", (e) => ws.send(e));

    setTimeout(() => {
      ws.send(
        JSON.stringify({
          source: "NEWS",
          data: {
            id: 123,
            name: faker.lorem.words(),
            content: faker.lorem.paragraphs(),
            image: faker.image.imageUrl(400, 400, "people"),
          },
        })
      );
    }, 10000);

    console.log("New Connection!");

    ws.send("Hi there, I am a WebSocket server");
  });
  return webSocketServer;
};
