import axios from 'axios';
import {
    SUGGEST_RESULT,
    CLEAR_SUGGESTION,
    GET_DIARY,
    ADD_FOOD,
    ADD_FOOD_GUEST,
    DELETE_FOOD,
    DELETE_FOOD_GUEST,
} from '../actions/types';

export const suggestSearchResult = (
    description,
    history,
    fromLanding = false
) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/search/${description}`);
        dispatch({
            type: SUGGEST_RESULT,
            payload: res.data,
        });

        if (fromLanding) {
            history.push('/dashboard');
        }
    } catch (error) {
        console.error(error);
    }
};

export const clearSuggestion = () => (dispatch) => {
    dispatch({
        type: CLEAR_SUGGESTION,
    });
};

export const getDiary = (date) => async (dispatch) => {
    const d = date.toISOString().slice(0, 10);
    try {
        const res = await axios.get(`/api/diary/date/${d}`);
        dispatch({
            type: GET_DIARY,
            payload: res.data,
        });
    } catch (error) {
        console.error(error);
    }
};

export const addFood = (fdcId, quantity, date) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ quantity, date });
    try {
        await axios.post(`/api/diary/${fdcId}`, body, config);
        dispatch({
            type: ADD_FOOD,
        });
        dispatch(getDiary(date));
    } catch (error) {
        console.error(error);
    }
};

export const addFoodGuest = (fdcId, quantity) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ quantity });
    try {
        const res = await axios.post(`/api/diary/guest/${fdcId}`, body, config);
        dispatch({
            type: ADD_FOOD_GUEST,
            payload: res.data,
        });
    } catch (error) {
        console.error(error);
    }
};

export const deleteFood = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/diary/${id}`);
        dispatch({
            type: DELETE_FOOD,
        });
    } catch (error) {
        console.error(error);
    }
};

export const deleteFoodGuest = (fdcId) => (dispatch) => {
    dispatch({
        type: DELETE_FOOD_GUEST,
        payload: fdcId,
    });
};
