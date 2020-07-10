import React from 'react';
import { connect } from 'react-redux';

const Calories = ({ diary }) => {
    let total = 0;
    const getData = (diary) => {
        if (diary.length !== 0) {
            const total = diary
                .map((item) =>
                    Math.round(item.calories * (item.quantity / 100))
                )
                .reduce((a, b) => a + b, 0);
            return total;
        }
    };
    total = getData(diary);
    return (
        <div className="card">
            <h5>Total Calories</h5>
            <p>{total} kcal</p>
        </div>
    );
};

const mapStateToProps = (state) => ({
    diary: state.diary.diary,
});

export default connect(mapStateToProps)(Calories);
