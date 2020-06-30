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
      <Text>{blog.title}</Text>
      <Text>{blog.content}</Text>
    </View>
  );
};

SinglePostScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
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

const styles = StyleSheet.create({});

export default SinglePostScreen;
