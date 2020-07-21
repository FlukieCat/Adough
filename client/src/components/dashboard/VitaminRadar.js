import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import { connect } from 'react-redux';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const VitaminRadar = ({ nutrition, setting: { setting, loading } }) => {
    let data = [
        {
            id: 'A',
            pct: 0,
        },
        {
            id: 'E',
            pct: 0,
        },
        {
            id: 'C',
            pct: 0,
        },
        {
            id: 'D',
            pct: 0,
        },
        {
            id: 'B6',
            pct: 0,
        },
        {
            id: 'B12',
            pct: 0,
        },
        {
            id: 'K',
            pct: 0,
        },
    ];
    if (setting.length > 0 && nutrition)
        data = [
            {
                id: 'A',
                pct: loading
                    ? 0
                    : Math.min(
                          100,
                          Math.round(
                              (nutrition.vitaminA / setting.vitaminA.amount) *
                                  100
                          )
                      ),
            },
            {
                id: 'E',
                pct: loading
                    ? 0
                    : Math.min(
                          100,
                          Math.round(
                              (nutrition.vitaminE / setting.vitaminE.amount) *
                                  100
                          )
                      ),
            },
            {
                id: 'C',
                pct: loading
                    ? 0
                    : Math.min(
                          100,
                          Math.round(
                              (nutrition.vitaminC / setting.vitaminC.amount) *
                                  100
                          )
                      ),
            },
            {
                id: 'D',
                pct: loading
                    ? 0
                    : Math.min(
                          100,
                          Math.round(
                              (nutrition.vitaminD / setting.vitaminD.amount) *
                                  100
                          )
                      ),
            },
            {
                id: 'B6',
                pct: loading
                    ? 0
                    : Math.min(
                          100,
                          Math.round(
                              (nutrition.vitaminB6 / setting.vitaminB6.amount) *
                                  100
                          )
                      ),
            },
            {
                id: 'B12',
                pct: loading
                    ? 0
                    : Math.min(
                          100,
                          Math.round(
                              (nutrition.vitaminB12 /
                                  setting.vitaminB12.amount) *
                                  100
                          )
                      ),
            },
            {
                id: 'K',
                pct: loading
                    ? 0
                    : Math.min(
                          100,
                          Math.round(
                              (nutrition.vitaminK / setting.vitaminK.amount) *
                                  100
                          )
                      ),
            },
        ];
    return (
        <ResponsiveRadar
            data={data}
            indexBy="id"
            keys={['pct']}
            maxValue={100}
            margin={{ top: 20, bottom: 20, left: 50, right: 50 }}
            curve="linearClosed"
            borderWidth={2}
            borderColor={{ from: 'color' }}
            gridLevels={3}
            gridShape="circular"
            gridLabelOffset={10}
            enableDots={true}
            dotSize={5}
            dotColor={{ theme: 'background' }}
            dotBorderWidth={2}
            dotBorderColor={{ from: 'color' }}
            enableDotLabel={false}
            dotLabel="value"
            dotLabelYOffset={-120}
            colors={{ scheme: 'paired' }}
            fillOpacity={0.25}
            blendMode="multiply"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            isInteractive={true}
        />
    );
};

const mapStateToProps = (state) => ({
    nutrition: state.diary.nutrition,
    setting: state.setting,
});

export default connect(mapStateToProps)(VitaminRadar);
