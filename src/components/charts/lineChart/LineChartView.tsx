import { StyleSheet } from 'react-native'
import React from 'react'
import { CartesianChart, Line } from "victory-native"
import useLineChartData from './lineData';

const randomNumber = () => Math.floor(Math.random() * (50 - 25 + 1)) + 25;

const DATA = (numberPoints = 13) =>
    Array.from({ length: numberPoints }, (_, index) => ({
        day: index + 1,
        sales: randomNumber(),
    }));

const LineChartView = () => {
    const data = useLineChartData('http://192.168.0.104:5000');

    return (
        <CartesianChart data={data} xKey="time" yKeys={["value"]}>
            {({ points }) => (
                //👇 pass a PointsArray to the Line component, as well as options.
                <Line
                    points={points.value}
                    color="red"
                    strokeWidth={3}
                    animate={{ type: "timing", duration: 300 }}
                />
            )}
        </CartesianChart>
    )
}

export default LineChartView

const styles = StyleSheet.create({
})