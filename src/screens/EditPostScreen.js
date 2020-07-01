import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

import server from "../api/server";

import BlogContext from "../context/BlogContext";

const EditPostScreen = ({ navigation }) => {
  const appContext = useContext(BlogContext);

  const id = navigation.getParam("id");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const response = await server.get(`/product/${id}`);
        setTitle(response.data.product[0].name);
        setContent(response.data.product[0].description);
      } catch (e) {
        console.log("Error occured!");
      }
    }
    getData();
  }, [id]);

  async function handleSubmit() {
    try {
      const response = await server.put(`/product/${id}`, {
        name: title,
        description: content,
      });
      const editedBlog = await server.get(`/product/${id}`);
      appContext.dispatch({
        type: "EDIT_POST",
        value: {
          _id: editedBlog.data.product[0]._id,
          name: editedBlog.data.product[0].name,
          description: editedBlog.data.product[0].description,
        },
      });
      navigation.pop();
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
        multiline
        numberOfLines={20}
        style={styles.input}
        value={content}
        onChangeText={(newText) => setContent(newText)}
      />
      <Button title="Save Changes" onPress={handleSubmit} />
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

export default EditPostScreen;
