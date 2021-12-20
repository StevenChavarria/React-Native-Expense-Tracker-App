import React, { useRef, useState } from "react";
import { TextInput, ImageBackground, StyleSheet, View, useEffect } from "react-native";
import { BorderlessButton, TouchableOpacity } from "react-native-gesture-handler";
import { StackActions } from "@react-navigation/native";
import { Backnavy } from "../../../assets/images";
import { RadioButton } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';

import theme, { Box, Text } from "../../components/theme";
import { BackArrow } from "../../Svgs";
import { addTransaction } from "../../../store/actions/transactionActions";
import { useDispatch } from "react-redux";


const CategoryList = [
  {
    label: "Transportation",
    value: "Transportation",
  },
  {
    label: "Household",
    value: "Household",
  },
  {
    label: "Salary / Income",
    value: "Salary / Income",
  },
  {
    label: "Health",
    value: "Health",
  },
  {
    label: "Other",
    value: "Other",
  },
];

const Add = ({ navigation }) => {
  const dispatch = useDispatch();
  const { navigate } = navigation;
  const [price, setPrice] = useState(0);
  const [title, setTitle] = useState("");
  const [categoryType, setCategoryType] = useState('expense');
  const [showDropDown, setShowDropDown] = useState(false);

  const titleRef = useRef(null);

  const onPop = () => {
    const popAction = StackActions.pop(1);
    navigation.dispatch(popAction);
  };

  const typeOfTransaction = () => {
    if (categoryType == 'expense') {
      return price * -1;
    }
    return price;
  }


  const onSubmit = () => {
    const transaction = {
      price: typeOfTransaction(),
      title,
    };

    if (!price || !title) return alert("Details Empty");

    dispatch(addTransaction(transaction));
    setPrice("");
    setTitle("");
    navigate("Transactions");
  };

  return (
    <ImageBackground
      source={Backnavy}
      style={{
        flex: 1,
        justifyContent: "flex-end",
        position: "relative",
      }}
    >
      <Box padding="l" flex={1}>
        <Box flexDirection="row" alignItems="center" paddingTop="l">
          <TouchableOpacity onPress={onPop}>
            <Box>
              <BackArrow />
            </Box>
          </TouchableOpacity>

          <Text
            variant="title1"
            color="white"
            style={{ marginLeft: 30, fontSize: 18 }}
          >
            Add Amount
          </Text>
        </Box>

        <Box flexDirection="row" flexDirection="column" marginTop="xl">
          <Box
            justifyContent="space-between"
            flexDirection="row"
            alignItems="center"
            borderBottomWidth={2}
            paddingBottom="s"
            marginTop="m"
          >
            <Text variant="title" color="green">
              $
            </Text>

            <TextInput
              placeholderTextColor={theme.colors.primary}
              placeholder="Amount"
              keyboardType="number-pad"
              style={{
                padding: 10,
                fontSize: 30,
                width: "80%",
                color: "white"
              }}
              onChangeText={(price) => setPrice(price)}
              autoFocus={true}
              onSubmitEditing={() => titleRef.current.focus()}
            />

            <Text variant="title" color="white" style={{ fontSize: 20 }}>
              USD
            </Text>
          </Box>

          <Box marginTop="xl" borderBottomWidth={2}>
            <Text style={styles.titleStyle}>Category</Text>
            <DropDown
              label={title || "Select..."}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              setValue={setTitle}
              list={CategoryList}
            />
          </Box>


          <RadioButton.Group
            onValueChange={newValue => setCategoryType(newValue)}
            value={categoryType}
          >
            <View style={styles.radioContainer}>
              <View style={styles.inline}>
                <RadioButton.Android value="expense" color={"white"} />
                <Text style={{ color: "white" }}>Expense</Text>
              </View>
              <View style={styles.inline}>
                <RadioButton.Android value="income" color={"white"} />
                <Text style={{ color: "white" }}>Income</Text>
              </View>
            </View>
          </RadioButton.Group>

          <Box marginTop="xl">
            <BorderlessButton onPress={onSubmit}>
              <Box
                borderRadius="l"
                height={55}
                backgroundColor="primary"
                alignItems="center"
                justifyContent="center"
              >
                <Text variant="title1">Save</Text>
              </Box>
            </BorderlessButton>
          </Box>
        </Box>
      </Box>
    </ImageBackground>
  );
};

export default Add;

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  titleStyle: {
    fontSize: 18,
    color: "white",
  }
});
