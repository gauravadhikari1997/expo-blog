import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
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
        keyExtractor={(blog) => blog.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Post", { id: item.id })}
              >
                <Text style={styles.title}>{item.title}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  appContext.dispatch({
                    type: "DELETE_POST",
                    value: item.id,
                  })
                }
              >
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
      <Button
        style={styles.button}
        title="Add new post"
        onPress={() => appContext.dispatch({ type: "ADD_POST" })}
      />
    </View>
  );
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
  button: {},
});

export default IndexScreen;
