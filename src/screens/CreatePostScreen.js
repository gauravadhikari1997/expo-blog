import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

import BlogContext from "../context/BlogContext";

const CreatePostScreen = ({ navigation }) => {
  const appContext = useContext(BlogContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <View>
      <Text style={styles.label}>Enter Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(newText) => setTitle(newText)}
      />
      <Text style={styles.label}>Enter Content</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={(newText) => setContent(newText)}
      />
      <Button
        title="Add Post"
        onPress={() => {
          appContext.dispatch({
            type: "ADD_POST",
            value: { id: Math.random().toString(), title, content },
          });
          navigation.navigate("Index");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    margin: 10,
  },
  label: {
    fontSize: 20,
    margin: 10,
  },
});

export default CreatePostScreen;
