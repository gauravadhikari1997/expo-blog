import React, { useContext } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import BlogContext from "../context/BlogContext";

const IndexScreen = () => {
  const blogs = useContext(BlogContext);
  return (
    <View>
      <Text>IndexScreen</Text>
      <FlatList
        data={blogs}
        keyExtractor={(blog) => blog.title}
        renderItem={({ item }) => {
          return <Text>{item.title}</Text>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default IndexScreen;
