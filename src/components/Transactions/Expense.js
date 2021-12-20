import React from "react";
import { View, StyleSheet } from "react-native";
import {TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import theme, { Box} from "../theme";
import { Delete } from "../../Svgs";

const Expense = ({ index,onDelete, item }) => {
 
  return (
    <>
      <TouchableWithoutFeedback
      >
        <Animated.View>
          <Box
            overflow="hidden"
            paddingHorizontal="l"
            borderBottomWidth={1}
            borderBottomColor="silver"
            height={50}
            position="relative"
          >
            <View style={[StyleSheet.absoluteFill, {}]}>
              <Animated.View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 75,
                  padding: theme.spacing.l,
                }}
              >
                <Animated.Text>{item.title}</Animated.Text>
                <Animated.Text
                  style={{
                    marginRight: -100,
                    color: item.price > 0 ? "#009BFC" : "#FF4500",
                  }}
                >
                  {item.price > 0
                    ? `$${item.price}`
                    : `- $${Math.abs(item.price)}`}
                </Animated.Text>
                <TouchableOpacity
                  onPress={() => {
                    onDelete(index);
                  }}
                >
                  <Delete />
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Box>
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Expense;
