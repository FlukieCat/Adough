import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { connect } from 'react-redux';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MacroBar = ({ diary }) => {
    const getDatafromDiary = (diary) => [
        {
            id: 'Carb',
            carb: Math.round(
                diary
                    .map((item) => item.carb * (item.quantity / 100))
                    .reduce((a, b) => a + b, 0)
            ),
            carbColor: '#3379e4',
            protein: 0,
            proteinColor: '#35c2bd',
            fat: 0,
            fatColor: '#f9a828',
        },
        {
            id: 'Protein',
            carb: 0,
            carbColor: '#3379e4',
            protein: Math.round(
                diary
                    .map((item) => item.protein * (item.quantity / 100))
                    .reduce((a, b) => a + b, 0)
            ),
            proteinColor: '#35c2bd',
            fat: 0,
            fatColor: '#f9a828',
        },
        {
            id: 'Fat',
            carb: 0,
            carbColor: '#3379e4',
            protein: 0,
            proteinColor: '#35c2bd',
            fat: Math.round(
                diary
                    .map((item) => item.fat * (item.quantity / 100))
                    .reduce((a, b) => a + b, 0)
            ),
            fatColor: '#f9a828',
        },
    ];
    const data = getDatafromDiary(diary);
    return (
        <ResponsiveBar
            data={data}
            keys={['carb', 'protein', 'fat']}
            margin={{ top: 50, right: 100, bottom: 50, left: 50 }}
            padding={0.05}
            innerPadding={5}
            layout="horizontal"
            colors={['#3379e4', '#35c2bd', '#f9a828']}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 2,
                tickPadding: 1,
                tickRotation: 0,
                legend: 'grams',
                legendPosition: 'middle',
                legendOffset: 32,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            label={(d) => d.value + ' g'}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
        />
    );
};

const mapStateToProps = (state) => ({
    diary: state.diary.diary,
});

export default connect(mapStateToProps)(MacroBar);
