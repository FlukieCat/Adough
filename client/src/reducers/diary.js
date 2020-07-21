import {
    SUGGEST_RESULT,
    CLEAR_SUGGESTION,
    GET_DIARY,
    ADD_FOOD,
    ADD_FOOD_GUEST,
    DELETE_FOOD,
    DELETE_FOOD_GUEST,
    UPDATE_NUTRITION,
} from '../actions/types';

const initialState = {
    suggestions: [],
    diary: [],
    nutrition: {
        calories: 0,
        protein: 0,
        carb: 0,
        fat: 0,
        fiber: 0,
        calcium: 0,
        iron: 0,
        magnesium: 0,
        potassium: 0,
        sodium: 0,
        zinc: 0,
        copper: 0,
        selenium: 0,
        vitaminA: 0,
        vitaminE: 0,
        vitaminD: 0,
        vitaminC: 0,
        vitaminB6: 0,
        vitaminB12: 0,
        vitaminK: 0,
    },
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
        case UPDATE_NUTRITION:
            return {
                ...state,
                nutrition: {
                    calories: Math.round(
                        state.diary
                            .map(
                                (item) => item.calories * (item.quantity / 100)
                            )
                            .reduce((a, b) => a + b, 0)
                    ),
                    protein: Math.round(
                        state.diary
                            .map((item) => item.protein * (item.quantity / 100))
                            .reduce((a, b) => a + b, 0)
                    ),
                    carb: Math.round(
                        state.diary
                            .map((item) => item.carb * (item.quantity / 100))
                            .reduce((a, b) => a + b, 0)
                    ),
                    fat: Math.round(
                        state.diary
                            .map((item) => item.fat * (item.quantity / 100))
                            .reduce((a, b) => a + b, 0)
                    ),
                    fiber: Math.round(
                        state.diary
                            .map((item) => item.fiber * (item.quantity / 100))
                            .reduce((a, b) => a + b, 0)
                    ),
                    calcium: Math.round(
                        state.diary
                            .map((item) => item.calcium * (item.quantity / 100))
                            .reduce((a, b) => a + b, 0)
                    ),
                    iron: Math.round(
                        state.diary
                            .map((item) => item.iron * (item.quantity / 100))
                            .reduce((a, b) => a + b, 0)
                    ),
                    magnesium: Math.round(
                        state.diary
                            .map(
                                (item) => item.magnesium * (item.quantity / 100)
                            )
                            .reduce((a, b) => a + b, 0)
                    ),
                    potassium: Math.round(
                        state.diary
                            .map(
                                (item) => item.potassium * (item.quantity / 100)
                            )
                            .reduce((a, b) => a + b, 0)
                    ),
                    sodium: Math.round(
                        state.diary
                            .map((item) => item.sodium * (item.quantity / 100))
                            .reduce((a, b) => a + b, 0)
                    ),
                    zinc: Math.round(
                        state.diary
                            .map((item) => item.zinc * (item.quantity / 100))
                            .reduce((a, b) => a + b, 0)
                    ),
                    copper: Math.round(
                        state.diary
                            .map((item) => item.copper * (item.quantity / 100))
                            .reduce((a, b) => a + b, 0)
                    ),
                    selenium: Math.round(
                        state.diary
                            .map(
                                (item) => item.selenium * (item.quantity / 100)
                            )
                            .reduce((a, b) => a + b, 0)
                    ),
                    vitaminA: Math.round(
                        state.diary
                            .map(
                                (item) => item.vitaminA * (item.quantity / 100)
                            )
                            .reduce((a, b) => a + b, 0)
                    ),
                    vitaminE: Math.round(
                        state.diary
                            .map(
                                (item) => item.vitaminE * (item.quantity / 100)
                            )
                            .reduce((a, b) => a + b, 0)
                    ),
                    vitaminD: Math.round(
                        state.diary
                            .map(
                                (item) => item.vitaminD * (item.quantity / 100)
                            )
                            .reduce((a, b) => a + b, 0)
                    ),
                    vitaminC: Math.round(
                        state.diary
                            .map(
                                (item) => item.vitaminC * (item.quantity / 100)
                            )
                            .reduce((a, b) => a + b, 0)
                    ),
                    vitaminB6: Math.round(
                        state.diary
                            .map(
                                (item) => item.vitaminB6 * (item.quantity / 100)
                            )
                            .reduce((a, b) => a + b, 0)
                    ),
                    vitaminB12: Math.round(
                        state.diary
                            .map(
                                (item) =>
                                    item.vitaminB12 * (item.quantity / 100)
                            )
                            .reduce((a, b) => a + b, 0)
                    ),
                    vitaminK: Math.round(
                        state.diary
                            .map(
                                (item) => item.vitaminK * (item.quantity / 100)
                            )
                            .reduce((a, b) => a + b, 0)
                    ),
                },
            };
        default:
            return state;
    }
}
