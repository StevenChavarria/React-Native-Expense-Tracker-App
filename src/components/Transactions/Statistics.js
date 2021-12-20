import React from "react";
import { Box, Text } from "../../components/theme";
import { useSelector } from "react-redux";
import { ImageBackground, Dimensions } from "react-native";
import { BackArrow } from "../../Svgs";
import { Backnavy } from "../../../assets/images";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackActions } from "@react-navigation/native";

import {
    PieChart
} from 'react-native-chart-kit'

const width = Dimensions.get('window').width

const pieChartConfig = {
    backgroundColor: '#26872a',
    backgroundGradientFrom: '#43a047',
    backgroundGradientTo: '#66bb6a',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16
    }
};

const Statistics = ({ navigation }) => {
    const { transactions } = useSelector((state) => state.trs);

    const sumOfExpenses = (title) => transactions.filter(i => i.title === title).reduce((a, b) => a + b.price * -1, 0);
    const TotalExpenses = (title) => transactions.filter(i => i.title != title).reduce((a, b) => a + b.price * -1, 0);

    const pieChartDataExpenses = [
        { name: 'Transportation', Expenses: sumOfExpenses("Transportation"), color: 'rgba(131, 167, 234, 1)', legendFontColor: '#bdbdbd', legendFontSize: 15 },
        { name: 'Household', Expenses: sumOfExpenses("Household"), color: '#F00', legendFontColor: '#bdbdbd', legendFontSize: 15 },
        { name: 'Health', Expenses: sumOfExpenses("Health"), color: '#ffffff', legendFontColor: '#bdbdbd', legendFontSize: 15 },
        { name: 'Other', Expenses: sumOfExpenses("Other"), color: 'rgb(0, 0, 255)', legendFontColor: '#bdbdbd', legendFontSize: 15 }
    ]

    const pieChartDataBalance = [
        { name: 'Income', balance: sumOfExpenses("Salary / Income") * -1, color: '#00618e', legendFontColor: '#bdbdbd', legendFontSize: 15 },
        { name: 'Expenses', balance: TotalExpenses("Salary / Income"), color: '#ffa600', legendFontColor: '#bdbdbd', legendFontSize: 15 },
    ]

    const onPop = () => {
        const popAction = StackActions.pop(1);
        navigation.dispatch(popAction);
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
            <Box padding="l" flex={2}>
                <Box flexDirection="row" alignItems="center" paddingTop="l">
                    <TouchableOpacity onPress={onPop}>
                        <Box>
                            <BackArrow />
                        </Box>
                    </TouchableOpacity>
                    <Text variant="title" style={{ fontSize: 30, marginLeft: 30 }}>
                        Statistics
                    </Text>
                </Box>
            </Box>
            <Text variant="title" style={{ fontSize: 20, marginBottom: 20, marginHorizontal: 5, marginTop: 30 }}>
                Expenses Pie Chart
            </Text>
            <PieChart
                data={pieChartDataExpenses}
                height={220}
                width={width}
                chartConfig={pieChartConfig}
                accessor="Expenses"
                style={{
                    flex: 10,
                    borderRadius: 16,
                }}
            />
            <Text variant="title" style={{ fontSize: 20, marginBottom: 20, marginHorizontal: 5 }}>
                Balance Pie Chart
            </Text>
            <PieChart
                data={pieChartDataBalance}
                height={220}
                width={width}
                chartConfig={pieChartConfig}
                accessor="balance"
                style={{
                    flex: 13,
                    borderRadius: 16
                }}
            />
        </ImageBackground>
    );
};
export default Statistics;