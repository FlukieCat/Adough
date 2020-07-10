import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDiary } from '../../actions/diary';
import DiaryItem from './DiaryItem';

const Diary = ({ date, diary, getDiary, isAuthenticated }) => {
    useEffect(() => {
        if (isAuthenticated) {
            getDiary(date);
        }
    }, [isAuthenticated, date, getDiary]);
    return (
        <table>
            <thead>
                <tr>
                    <th className="th-desc">Description</th>
                    <th className="th-amount">Amount</th>
                    <th className="th-calories">Calories</th>
                </tr>
            </thead>
            <tbody>
                {diary.map((item) => (
                    <DiaryItem key={item._id} content={item} date={date} />
                ))}
            </tbody>
        </table>
    );
};

Diary.propTypes = {
    diary: PropTypes.array.isRequired,
    getDiary: PropTypes.func.isRequired,
    date: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    diary: state.diary.diary,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getDiary })(Diary);
