import React, { createContext } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

class WebSocketConnection {
  private client: W3CWebSocket = null;

  constructor(public address: string) {
    this.client = new W3CWebSocket(address);
    this.client.onmessage = (m) => {
      // console.log(m);
    };
  }

  public onMessage(callback: (msg: any) => any) {
    const oldHandlers = this.client.onmessage;
    this.client.onmessage = (msg) => {
      oldHandlers && oldHandlers(msg);
      callback(msg);
    };
  }
}

export const WebSocketClient = createContext(null);

export default ({ children }) => {
  const client = new WebSocketConnection("ws://localhost:8999");

  return (
    <WebSocketClient.Provider value={client}>
      {children}
    </WebSocketClient.Provider>
  );
};
