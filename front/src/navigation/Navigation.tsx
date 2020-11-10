import React, { useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import NewsList from "../Screens/NewsList";
import Article from "../Screens/Article";

const Stack = createStackNavigator();

const RootStack: React.FC<{}> = () => {
  const navigationRef = useRef(null);

  useEffect(() => {
    navigationRef.current?.navigate("NewsList");
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="NewsList"
        screenOptions={{ gestureEnabled: false }}
      >
        <Stack.Screen
          name="NewsList"
          component={NewsList}
          options={{ title: "News" }}
        />
        <Stack.Screen name="Article" component={Article} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
