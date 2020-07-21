import React from 'react';
import { connect } from 'react-redux';

const Calories = ({ nutrition }) => {
    return (
        <div className="card">
            <h5>Total Calories</h5>
            <p>{nutrition.calories} kcal</p>
        </div>
    );
};

const mapStateToProps = (state) => ({
    nutrition: state.diary.nutrition,
});

export default connect(mapStateToProps)(Calories);
