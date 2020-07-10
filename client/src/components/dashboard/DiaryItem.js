import React, { useState, Fragment, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    addFood,
    addFoodGuest,
    deleteFood,
    getDiary,
    deleteFoodGuest,
} from '../../actions/diary';

const DiaryItem = ({
    content: { _id, fdcId, name, calories, quantity },
    date,
    isAuthenticated,
    addFood,
    addFoodGuest,
    deleteFood,
    getDiary,
    deleteFoodGuest,
}) => {
    const [amount, setAmount] = useState(quantity);
    const [isEditing, setIsEditing] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const inputRef = useRef(null);
    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus();
        }
    }, [isEditing]);
    const onBlur = () => {
        if (isAuthenticated) {
            addFood(fdcId, amount, date);
        } else {
            addFoodGuest(fdcId, amount);
        }
        setIsEditing(false);
    };
    const onDelete = () => {
        if (isAuthenticated) {
            deleteFood(_id);
            getDiary(date);
        } else {
            deleteFoodGuest(fdcId);
        }
    };
    return (
        <tr className="diary-item">
            <td className="td-desc" onClick={() => setShowDelete(!showDelete)}>
                {showDelete ? (
                    <div
                        onClick={onDelete}
                        style={{
                            color: 'red',
                            cursor: 'pointer',
                            display: 'inline-block',
                            marginRight: '1rem',
                        }}
                    >
                        <i className="fas fa-trash-alt"></i>
                    </div>
                ) : null}
                {name}
            </td>
            <td className="td-amount" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? (
                    <Fragment>
                        <input
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            onBlur={() => onBlur()}
                            style={{ width: '70%' }}
                            ref={inputRef}
                        ></input>{' '}
                        g
                    </Fragment>
                ) : (
                    <Fragment>{amount} g</Fragment>
                )}
            </td>
            <td className="td-calories">
                {Math.round(calories * (amount / 100))} kcal{' '}
            </td>
        </tr>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
    addFood,
    addFoodGuest,
    deleteFood,
    getDiary,
    deleteFoodGuest,
})(DiaryItem);
