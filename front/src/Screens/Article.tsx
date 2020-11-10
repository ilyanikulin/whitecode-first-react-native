import React from "react";
import { Image, ScrollView, Text, View, StyleSheet } from "react-native";

const Article: React.FC<any> = ({ route, ...props }) => {
  const article = props.data || route.params.data;

  return (
    <ScrollView
      contentContainerStyle={{
        ...styles.content,
        ...props.style,
      }}
    >
      <View style={styles.article}>
        <Text style={styles.title}>{article?.name}</Text>
        <Image source={{ uri: article?.image }} style={styles.image} />
        <Text>{article?.content}</Text>
      </View>
    </ScrollView>
  );
};

export default Article;

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#fff",

    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    paddingTop: 82,
    paddingLeft: 20,
    paddingBottom: 82,
  },
  article: {
    maxWidth: "80%",
    alignSelf: "center",
  },
  image: {
    width: 400,
    height: 400,
    maxWidth: "80%",
    alignSelf: "center",
    marginBottom: 40,
  },
  title: {
    fontWeight: "600",
    fontSize: 24,
    textAlign: "center",
    width: "100%",
    marginBottom: 24,
  },
});
