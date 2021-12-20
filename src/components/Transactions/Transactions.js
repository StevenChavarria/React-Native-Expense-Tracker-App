import React from "react";
import { ImageBackground, SectionList, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import Animated from "react-native-reanimated";
import { Backnavy } from "../../../assets/images";
import theme, { Box, Text } from "../theme";
import { AddIcon, Delete } from "../../Svgs";
import Expense from "./Expense";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../../../store/actions/transactionActions";
import Top from "./Top";

const Transactions = ({ navigation }) => {
  const { navigate } = navigation;
  const dispatch = useDispatch();

  const active = new Animated.Value(0);

  const onNavigate = () => {
    navigate("AddTransaction");
  };

  const onDelete = (id) => {
    dispatch(deleteTransaction(id));
  };

  const { transactions } = useSelector((state) => state.trs);

  const DATA = Object.values(
    transactions.reduce((acc, item) => {
      if (!acc[item.addedtime])
        acc[item.addedtime] = {
          title: item.addedtime,
          data: [],
          price: item.price,
        };

      acc[item.addedtime].data.push(item);
      return acc;
    }, {})
  );

 
  const renderHeader = ({ section: { data } }) => {
    return (
      <Box
        paddingHorizontal="m"
        backgroundColor="white"
        flexDirection="row"
        justifyContent="space-between"
        borderBottomWidth={1}
        borderBottomColor="blue"
        paddingBottom="s"
        paddingTop="s"
        marginTop="m"
        borderTopRightRadius="m"
        borderTopLeftRadius="m"
      >
        <Text color="silver1">
          {moment(data[0].addedtime, "x").format("DD MMM YYYY")}
        </Text>
      </Box>
    );
  };

  const renderFooter = () => {
    return (
      <Box
        paddingHorizontal="m"
        backgroundColor="white"
        flexDirection="row"
        justifyContent="space-between"
        borderBottomWidth={1}
        borderBottomColor="blue"
        paddingBottom="s"
        borderBottomRightRadius="m"
        borderBottomLeftRadius="m"
      ></Box>
    );
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
      <Top />
      <Box
        flex={1}
        paddingLeft="l"
        paddingRight="l"
        paddingBottom="m"
        paddingTop="m"
      >
        <SectionList
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => {
            const index = item.id;

            return (
              <Animated.View
                style={{ borderRadius: 20, backgroundColor: "red" }}
              >
                <Box
                  overflow="hidden"
                  borderBottomWidth={1}
                  borderBottomColor="silver"
                  height={50}
                  position="relative"
                  backgrjoundColor="white"
                >
                  <Animated.View
                    style={{
                      fontSize: 12,
                      color: "white",
                      fontWeight: "900",
                      position: "absolute",
                      height: 50,
                      width: "14%",
                      right: -20,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      backgroundColor: "white",
                    }}
                  >
                    <Text>
                      <Delete />
                    </Text>
                  </Animated.View>
                  <Animated.View style={{ backgroundColor: "white" }}>
                    <Expense
                      onTap={() => {
                        active.setValue(index);
                      }}
                      {...{ index, onDelete, item }}
                    >
                      <Box
                        overflow="hidden"
                        paddingHorizontal="m"
                        borderBottomWidth={1}
                        borderBottomColor="silver"
                        height={50}
                        position="relative"
                        backgroundColor="white"
                      >
                        <View style={[StyleSheet.absoluteFill, {}]}>
                          <Animated.View
                            style={{
                              justifyContent: "space-between",
                              flexDirection: "row",
                              alignItems: "center",
                              height: 50,
                              paddingHorizontal: theme.spacing.m,
                            }}
                          ></Animated.View>
                        </View>
                      </Box>
                    </Expense>
                  </Animated.View>
                </Box>
              </Animated.View>
            );
          }}
          renderSectionHeader={renderHeader}
          renderSectionFooter={renderFooter}
          sections={DATA}
        />
      </Box>
      <Box style={{ position: "absolute", right: 20, bottom: 50, zIndex: 4 }}>
        <TouchableOpacity onPress={onNavigate}>
          <AddIcon />
        </TouchableOpacity>
      </Box>
    </ImageBackground>
  );
};

export default Transactions;
