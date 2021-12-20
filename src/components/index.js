import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Transactions from "./Transactions/Transactions";
import Add from "./Transactions/Add";
import Statistics from "./Transactions/Statistics";

export const assets = [];

const ExpenseStack = createStackNavigator();

export const ExpenseNavigator = () => (
  <ExpenseStack.Navigator screenOptions={{headerShown: false}} initialRouteName="Transactions">
    <ExpenseStack.Screen name="Transactions" component={Transactions} />
    <ExpenseStack.Screen name="AddTransaction" component={Add} />
    <ExpenseStack.Screen name="Statistics" component={Statistics} />
  </ExpenseStack.Navigator>
);

export { default as theme } from "./theme";