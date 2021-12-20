import React from "react";
import { useSelector } from "react-redux";
import { Box, Text } from "../theme";
import { Chart } from "../../Svgs";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';


const Top = () => {
  const { transactions } = useSelector((state) => state.trs);
  const navigation = useNavigation();
  const prices = transactions.map((transaction) => transaction.price);
  const balance = prices.reduce((prev, cur) => (prev += cur), 0);
  const expense =
    prices
      .filter((price) => price < 0)
      .reduce((prev, cur) => (prev += cur), 0) * -1;

  const income = expense + balance;

  const onNavigate = () => {
    navigation.navigate('Statistics');
  };

  return (
    <Box paddingLeft="l" paddingRight="l" style={{ paddingTop: 40, marginTop: 10 }}>
      <Box flexDirection="row" justifyContent="space-between">
        <Text variant="title" style={{ fontSize: 30 }}>
          December
        </Text>
        <TouchableOpacity onPress={onNavigate}>
          <Chart />
        </TouchableOpacity>
      </Box>
      <Box flexDirection="row" justifyContent="space-between" marginTop="m">
        <Box>
          <Text
            textAlign="center"
            variant="body"
            color="white"
          >
            Income
          </Text>
          <Text
            textAlign="center"
            textAlign="center"
            fontSize={13}
            color="green"
            fontWeight="700"
          >
            ${income}
          </Text>
        </Box>
        <Box>
          <Text
            textAlign="center"
            variant="body"
            color="white"
          >
            Expenses
          </Text>
          <Text
            textAlign="center"
            textAlign="center"
            fontSize={13}
            color="red"
            fontWeight="700"
          >
            -${expense}
          </Text>
        </Box>
        <Box>
          <Text
            textAlign="center"
            variant="body"
            color="white"
          >
            Balance
          </Text>
          <Text
            textAlign="center"
            fontWeight="700"
            fontSize={13}
            color="white"
          >
            ${balance}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Top;
