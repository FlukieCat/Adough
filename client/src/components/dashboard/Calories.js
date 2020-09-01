import React from 'react';
import { connect } from 'react-redux';

const Calories = ({ nutrition, setting: { setting, loading } }) => {
    return (
        <div className="card">
            <h5>Calories </h5>
            <h5>Consumed:</h5>
            <p>{nutrition.calories} kcal</p>
            <h5>Remaining:</h5>
            {loading ? (
                <p> - kcal</p>
            ) : (
                <p>{setting.calories - nutrition.calories} kcal</p>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    nutrition: state.diary.nutrition,
    setting: state.setting,
});

export default connect(mapStateToProps)(Calories);
