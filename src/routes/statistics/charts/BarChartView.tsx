import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Bar, CartesianChart } from 'victory-native';

const DATA = (length: number = 10) =>
    Array.from({ length }, (_, index) => ({
        month: index + 1,
        listenCount: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
    }));

const BarChartView: React.FC = () => {
    const [data, setData] = useState(DATA());

    return (
        <CartesianChart data={data} xKey="month" yKeys={["listenCount"]}>
            {({ points, chartBounds }) => (
                //👇 pass a PointsArray to the Bar component, as well as options.
                <Bar
                    points={points.listenCount}
                    chartBounds={chartBounds}
                    color="red"
                    roundedCorners={{ topLeft: 10, topRight: 10 }}
                />
            )}
        </CartesianChart>
    );
};

export default BarChartView;

const styles = StyleSheet.create({
});
