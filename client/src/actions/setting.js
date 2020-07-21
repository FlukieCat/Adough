import axios from 'axios';
import { LOAD_SETTING } from '../actions/types';

export const loadSetting = () => async (dispatch) => {
    try {
        const res = await axios.get(`/api/setting`);
        dispatch({
            type: LOAD_SETTING,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: LOAD_SETTING,
            payload: {},
        });
    }
};

export const saveSetting = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await axios.post(`/api/setting`, formData, config);
        dispatch({
            type: LOAD_SETTING,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: LOAD_SETTING,
            payload: {},
        });
    }
};
