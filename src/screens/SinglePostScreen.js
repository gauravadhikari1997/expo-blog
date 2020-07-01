import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import server from "../api/server";

import { EvilIcons } from "@expo/vector-icons";

const SinglePostScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const [blog, setBlog] = useState({});

  useEffect(() => {
    async function getData() {
      try {
        const response = await server.get(`/product/${id}`);
        setBlog(response.data.product[0]);
      } catch (e) {
        console.log("Error occured!");
      }
    }
    getData();

    const listener = navigation.addListener("didFocus", () => {
      getData();
    });

    return () => listener.remove();
  }, []);

  if (!id) {
    return null;
  }
  return (
    <View>
      <Text style={styles.title}>{blog.name}</Text>
      <Text style={styles.content}>{blog.description}</Text>
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
