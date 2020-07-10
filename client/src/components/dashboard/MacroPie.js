import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { connect } from 'react-redux';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const MacroPie = ({ diary }) => {
    const getMacroData = (diary) => {
        const carb = {
            id: 'Carb',
            label: 'Carb',
            value: 0,
            color: '#3379e4',
        };
        const protein = {
            id: 'Protein',
            label: 'Protein',
            value: 0,
            color: '#35c2bd',
        };
        const fat = {
            id: 'Fat',
            label: 'Fat',
            value: 0,
            color: '#f9a828',
        };
        if (diary.length !== 0) {
            carb.value = diary
                .map((item) => item.carb * (item.quantity / 100))
                .reduce((a, b) => a + b, 0);
            protein.value = diary
                .map((item) => item.protein * (item.quantity / 100))
                .reduce((a, b) => a + b, 0);
            fat.value = diary
                .map((item) => item.fat * (item.quantity / 100))
                .reduce((a, b) => a + b, 0);

            const total = carb.value * 4 + protein.value * 4 + fat.value * 9;
            carb.value = Math.round(((carb.value * 4) / total) * 100);
            protein.value = Math.round(((protein.value * 4) / total) * 100);
            fat.value = Math.round(((fat.value * 9) / total) * 100);
        }

        return [carb, fat, protein];
    };
    const data = getMacroData(diary);
    return (
        <ResponsivePie
            data={data}
            margin={{ top: 20, bottom: 20, left: 80, right: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={(d) => d.color}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={10}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: 'color' }}
            sliceLabel={(d) => {
                return d.value + '%';
            }}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            isInteractive={false}
        />
    );
};

const mapStateToProps = (state) => ({
    diary: state.diary.diary,
});

export default connect(mapStateToProps)(MacroPie);
