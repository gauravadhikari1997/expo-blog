import React, { useContext } from "react";
import server from "../api/server";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import BlogContext from "../context/BlogContext";

const IndexScreen = ({ navigation }) => {
  const appContext = useContext(BlogContext);

  return (
    <View>
      <FlatList
        data={appContext.state}
        keyExtractor={(blog) => blog._id}
        renderItem={({ item }) => {
          async function handleDelete() {
            await server.delete(`/product/${item._id}`);
            appContext.dispatch({
              type: "DELETE_POST",
              value: item._id,
            });
          }

          return (
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Post", { id: item._id })}
              >
                <Text style={styles.title}>{item.name}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete}>
                <Feather
                  style={styles.icon}
                  name="trash"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <Feather style={{ paddingRight: 20 }} name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 25,
  },
});

export default IndexScreen;
