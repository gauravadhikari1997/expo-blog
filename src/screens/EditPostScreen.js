import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

import BlogContext from "../context/BlogContext";

const EditPostScreen = ({ navigation }) => {
  const appContext = useContext(BlogContext);

  const id = navigation.getParam("id");
  const blog = appContext.state.find((item) => item.id === id);
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);

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
      <Button
        title="Save Changes"
        onPress={() => {
          appContext.dispatch({
            type: "EDIT_POST",
            value: { id, title, content },
          });
          navigation.navigate("Post", { id });
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

export default EditPostScreen;
