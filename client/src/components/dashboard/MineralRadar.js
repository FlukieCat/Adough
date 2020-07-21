import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import { connect } from 'react-redux';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MineralRadar = ({ nutrition, setting: { setting, loading } }) => {
    let data = [
        {
            id: 'Ca',
            pct: 0,
        },
        {
            id: 'Fe',
            pct: 0,
        },
        {
            id: 'Mg',
            pct: 0,
        },
        {
            id: 'K',
            pct: 0,
        },
        {
            id: 'Zn',
            pct: 0,
        },
        {
            id: 'Cu',
            pct: 0,
        },
        {
            id: 'Se',
            pct: 0,
        },
    ];
    if (setting.length > 0 && nutrition)
        data = [
            {
                id: 'Ca',
                pct: loading
                    ? 0
                    : Math.min(
                          100,
                          Math.round(
                              (nutrition.calcium / setting.calcium.amount) * 100
                          )
                      ),
            },
            {
                id: 'Fe',
                pct: loading
                    ? 0
                    : Math.min(
                          100,
                          Math.round(
                              (nutrition.iron / setting.iron.amount) * 100
                          )
                      ),
            },
            {
                id: 'Mg',
                pct: loading
                    ? 0
                    : Math.min(
                          100,
                          Math.round(
                              (nutrition.magnesium / setting.magnesium.amount) *
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
                              (nutrition.potassium / setting.potassium.amount) *
                                  100
                          )
                      ),
            },
            {
                id: 'Zn',
                pct: loading
                    ? 0
                    : Math.min(
                          100,
                          Math.round(
                              (nutrition.zinc / setting.zinc.amount) * 100
                          )
                      ),
            },
            {
                id: 'Cu',
                pct: loading
                    ? 0
                    : Math.min(
                          100,
                          Math.round(
                              (nutrition.copper / setting.copper.amount) * 100
                          )
                      ),
            },
            {
                id: 'Se',
                pct: loading
                    ? 0
                    : Math.min(
                          100,
                          Math.round(
                              (nutrition.selenium / setting.selenium.amount) *
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
            colors={{ scheme: 'accent' }}
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

export default connect(mapStateToProps)(MineralRadar);
