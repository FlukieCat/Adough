import { LOAD_SETTING } from '../actions/types';

const initialState = {
    setting: {},
    loading: true,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOAD_SETTING:
            return {
                ...state,
                setting: payload,
                loading: false,
            };
        default:
            return state;
    }
}
