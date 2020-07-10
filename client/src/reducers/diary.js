import {
    SUGGEST_RESULT,
    CLEAR_SUGGESTION,
    GET_DIARY,
    ADD_FOOD,
    ADD_FOOD_GUEST,
    DELETE_FOOD,
    DELETE_FOOD_GUEST,
} from '../actions/types';

const initialState = {
    suggestions: [],
    diary: [],
    loading: true,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SUGGEST_RESULT:
            return {
                ...state,
                suggestions: [...payload],
                loading: false,
            };
        case CLEAR_SUGGESTION:
            return {
                ...state,
                suggestions: [],
            };
        case GET_DIARY:
            return {
                ...state,
                diary: [...payload],
                loading: false,
            };
        case ADD_FOOD:
        case DELETE_FOOD:
            return {
                ...state,
                loading: false,
            };
        case ADD_FOOD_GUEST:
            return {
                ...state,
                diary: state.diary.find((item) => item.fdcId === payload.fdcId)
                    ? [
                          ...state.diary.filter(
                              (item) => item.fdcId !== payload.fdcId
                          ),
                          payload,
                      ]
                    : [...state.diary, payload],
                loading: false,
            };
        case DELETE_FOOD_GUEST:
            return {
                ...state,
                diary: state.diary.filter((item) => item.fdcId !== payload),
                loading: false,
            };
        default:
            return state;
    }
}
