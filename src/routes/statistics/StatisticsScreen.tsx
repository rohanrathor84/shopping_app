import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BarChartView from './charts/BarChartView'
import LineChartView from './charts/LineChartView'

const StatisticsScreen = () => {
    return (
        <View style={styles.mainContainer}>
            <BarChartView />
            <LineChartView />
        </View>
    )
}

export default StatisticsScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
})