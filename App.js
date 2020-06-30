import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import React from "react";

import BlogContext from "./src/context/BlogContext";

import IndexScreen from "./src/screens/IndexScreen";

const navigator = createStackNavigator(
  {
    Index: IndexScreen,
  },
  {
    initialRouteName: "Index",
    defaultNavigationOptions: {
      title: "Blogs",
    },
  }
);

const DATA = [
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Third Item",
  },
];

const App = createAppContainer(navigator);
export default () => {
  return (
    <BlogContext.Provider value={DATA}>
      <App />
    </BlogContext.Provider>
  );
};
