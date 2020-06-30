import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

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
    </View>
  );
};

const styles = StyleSheet.create({});

export default SinglePostScreen;
