import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { CartesianChart, Line } from "victory-native"

const randomNumber = () => Math.floor(Math.random() * (50 - 25 + 1)) + 25;

const DATA = (numberPoints = 13) =>
    Array.from({ length: numberPoints }, (_, index) => ({
        day: index + 1,
        sales: randomNumber(),
    }));

const LineChartView = () => {
    const [data, setData] = useState(DATA());

    return (
        <CartesianChart data={data} xKey="day" yKeys={["sales"]}>
            {({ points }) => (
                //👇 pass a PointsArray to the Line component, as well as options.
                <Line
                    points={points.sales}
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