import React, { useRef } from "react";
import Navigation from "./src/navigation/Navigation";
import { View } from "react-native";
import WebSocketClient from "./src/services/websockets";
import Notifications from "./src/notification/Notification";

export default function App() {
  return (
    <WebSocketClient>
      <View style={{ flex: 1, position: "relative" }}>
        <Notifications>
          <Navigation />
        </Notifications>
      </View>
    </WebSocketClient>
  );
}
