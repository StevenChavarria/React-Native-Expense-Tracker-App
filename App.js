import React from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@shopify/restyle";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from 'react-native-paper';

import store from "./store";
import { ExpenseNavigator } from "./src/components";
import { theme } from "./src/components";
import { NavigationContainer } from "@react-navigation/native";


const AppStack = createStackNavigator();

export default function App() {
  return (
    <Provider {...{ store }}>
      <PaperProvider>
        <ThemeProvider {...{ theme }}>
          <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}} initialRouteName="ExpenseTracker">
              <AppStack.Screen
                name="ExpenseTracker"
                component={ExpenseNavigator}
              />
            </AppStack.Navigator>
          </NavigationContainer>
          <StatusBar />
        </ThemeProvider>
      </PaperProvider>
    </Provider>
  );
}
