import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import React, { useReducer, useEffect } from "react";

import server from "./src/api/server";

import BlogContext from "./src/context/BlogContext";

import IndexScreen from "./src/screens/IndexScreen";
import SinglePostScreen from "./src/screens/SinglePostScreen";
import CreatePostScreen from "./src/screens/CreatePostScreen";
import EditPostScreen from "./src/screens/EditPostScreen";

const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Post: SinglePostScreen,
    Create: CreatePostScreen,
    Edit: EditPostScreen,
  },
  {
    initialRouteName: "Index",
    defaultNavigationOptions: {
      title: "Blogs",
    },
  }
);

const App = createAppContainer(navigator);

export default () => {
  useEffect(() => {
    async function getData() {
      try {
        const response = await server.get(`/product`);
        dispatch({ type: "GET_POST", value: response.data });
      } catch (e) {
        console.log("Error occured!");
      }
    }
    getData();
  }, []);

  const initialState = [];

  function ourReducer(state, action) {
    switch (action.type) {
      case "GET_POST":
        return action.value;
      case "ADD_POST":
        return [...state, action.value];
      case "DELETE_POST":
        return state.filter((item) => item._id !== action.value);
      case "EDIT_POST":
        const foundObj = action.value;
        const updatedState = state.map((item) => {
          if (item._id === foundObj._id) {
            return foundObj;
          }
          return item;
        });
        return updatedState;
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(ourReducer, initialState);

  return (
    <BlogContext.Provider value={{ state, dispatch }}>
      <App />
    </BlogContext.Provider>
  );
};
