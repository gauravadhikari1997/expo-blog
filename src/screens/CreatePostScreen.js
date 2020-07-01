import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

import server from "../api/server";

import BlogContext from "../context/BlogContext";

const CreatePostScreen = ({ navigation }) => {
  const appContext = useContext(BlogContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit() {
    try {
      const response = await server.post("/product", {
        name: title,
        description: content,
      });
      appContext.dispatch({
        type: "ADD_POST",
        value: response.data.product,
      });
      navigation.navigate("Index");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View>
      <Text style={styles.label}>Enter Title</Text>
      <TextInput
        autoFocus={true}
        autoCorrect={false}
        autoCapitalize="words"
        style={styles.input}
        value={title}
        onChangeText={(newText) => setTitle(newText)}
      />
      <Text style={styles.label}>Enter Content</Text>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        style={styles.input}
        value={content}
        multiline
        numberOfLines={20}
        onChangeText={(newText) => setContent(newText)}
      />
      <Button title="Add Post" onPress={handleSubmit} />
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
