import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { EvilIcons } from "@expo/vector-icons";

import BlogContext from "../context/BlogContext";

const SinglePostScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const appContext = useContext(BlogContext);

  const blog = appContext.state.find((item) => item.id === id);

  if (!id) {
    return null;
  }
  return (
    <View>
      <Text style={styles.title}>{blog.title}</Text>
      <Text style={styles.content}>{blog.content}</Text>
    </View>
  );
};

SinglePostScreen.navigationOptions = ({ navigation }) => {
  const id = navigation.getParam("id");
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Edit", { id })}>
        <EvilIcons
          style={{ paddingRight: 20 }}
          name="pencil"
          size={24}
          color="black"
        />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 25,
    borderColor: "gray",
    borderBottomWidth: 1,
    margin: 10,
  },
  content: {
    fontSize: 20,
    margin: 10,
    color: "green",
  },
});

export default SinglePostScreen;
