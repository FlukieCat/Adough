import React from 'react';
import PropTypes from 'prop-types';
import DiaryItem from './DiaryItem';

const Diary = ({ diary, date }) => {
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
    date: PropTypes.object.isRequired,
};

export default Diary;
