import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import React, { useReducer } from "react";

import BlogContext from "./src/context/BlogContext";

import IndexScreen from "./src/screens/IndexScreen";
import SinglePostScreen from "./src/screens/SinglePostScreen";
import CreatePostScreen from "./src/screens/CreatePostScreen";

const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Post: SinglePostScreen,
    Create: CreatePostScreen,
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
  const initialState = [];

  function ourReducer(state, action) {
    switch (action.type) {
      case "ADD_POST":
        return [...state, action.value];
      case "DELETE_POST":
        return state.filter((item) => item.id !== action.value);
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
