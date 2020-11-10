import { Text, StyleSheet, View, Image } from "react-native";
import React, { createContext, useRef } from "react";
import NotificationPopup from "react-native-push-notification-popup";

export const NotificationsContext = createContext(null);

export default ({ children }) => {
  const popup = useRef(null);

  const addNotification = (notification: {
    title: string;
    image: string;
    onPress: () => void;
  }) => {
    popup.current.show({
      onPress: notification.onPress,
      appTitle: notification.title,
      appIconSource: notification.image,
      notification,
    });
  };

  return (
    <NotificationsContext.Provider value={addNotification}>
      <View style={[styles.container]}>
        <NotificationPopup
          ref={(ref) => (popup.current = ref)}
          renderPopupContent={(opts) => {
            return (
              <View style={styles.popup}>
                <Text style={styles.popupText}>{opts.appTitle}</Text>
                <Image
                  source={{ uri: opts?.appIconSource }}
                  style={styles.popupImage}
                />
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          height: "100%",
          position: "absolute",
          width: "100%",
          zIndex: 1,
        }}
      >
        {children}
      </View>
    </NotificationsContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    zIndex: 2,
    top: 10,
  },
  popupWrapper: {
    width: "100%",
  },
  popup: {
    width: "100%",
    maxWidth: 600,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    opacity: 1,
    borderRadius: 6,
    textAlign: "center",
    padding: 10,
    maxHeight: 60,
    backgroundColor: "rgb(238,238,238)",
    borderColor: "rgb(220,220,220)",
    borderWidth: 1,
    marginBottom: 5,
    marginRight: 3,
    marginLeft: 3,
  },
  popupText: {
    color: "#565656",
  },
  popupImage: {
    width: 40,
    height: 40,
  },
});
