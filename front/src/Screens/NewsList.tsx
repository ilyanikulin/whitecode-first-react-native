import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

import {
  FlatList,
  View,
  Text,
  Button,
  ScrollView,
  Platform,
  Modal as NativeModal,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";

import Modal from "modal-enhanced-react-native-web";

import Article from "./Article";
import { WebSocketClient } from "../services/websockets";
import { NotificationsContext } from "../notification/Notification";

const NewsList: React.FC<any> = (props) => {
  const wsClient = useContext(WebSocketClient);
  const addNotification = useContext(NotificationsContext);
  const [newsList, setNewsList] = useState([]);
  const [activeArticle, setActiveArticle] = useState(null);

  const openArticle = (item) => {
    Platform.OS === "web"
      ? setActiveArticle(item)
      : navigate("Article", {
          newsList,
          title: item.name,
          id: item.id,
          data: item,
        });
  };

  useEffect(() => {
    axios.get(`http://localhost:8999/news`).then(({ data }) => {
      setNewsList(data);
    });
  }, []);

  useEffect(() => {
    const handler = (message) => {
      let msg;
      try {
        msg = JSON.parse(message.data);
      } catch (e) {
        msg = message.data;
      }

      if (msg?.source === "NEWS") {
        setNewsList([...newsList, msg.data]);
        addNotification({
          title: msg.data.name,
          image: msg.data.image,
          onPress: () => {
            openArticle(msg.data);
          },
        });
      }
    };
    wsClient.onMessage(handler);
  }, [wsClient, newsList]);

  const {
    navigation: { navigate },
  } = props;

  const closeArticle = () => {
    setActiveArticle(null);
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable style={styles.item} onPress={() => openArticle(item)}>
        <Text>{item.name}</Text>
        <Image
          source={{ uri: item.image, cache: "reload" }}
          style={styles.itemImage}
        />
      </Pressable>
    );
  };
  return (
    <ScrollView contentContainerStyle={styles.list}>
      <FlatList data={newsList} renderItem={renderItem} />

      {!!activeArticle && (
        <Modal visible={!!activeArticle} onBackdropPress={closeArticle}>
          <View style={styles.article}>
            <Article
              id={activeArticle.id}
              data={activeArticle}
              style={{ color: "fff" }}
            />
            <Button title="Close" onPress={closeArticle} />
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

export default NewsList;

const styles = StyleSheet.create({
  article: {
    shadowColor: "black",
    shadowOffset: {
      width: 4,
      height: 3,
    },
    shadowRadius: 40,
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(123,123,123,0.1)",
  },
  item: {
    backgroundColor: "white",
    height: 50,
    borderBottomWidth: StyleSheet.hairlineWidth,
    // borderEndColor: "rgba(201,201,201,0.1)",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
  },
  itemImage: {
    height: 40,
    width: 40,
  },
  list: {
    position: "absolute",
    zIndex: 1000,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    paddingTop: 20,
  },
});
