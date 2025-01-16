import { FETCH_LANGUAGE_FAILURE, FETCH_LANGUAGE_REQUEST, FETCH_LANGUAGE_SUCCESS } from "../action/action";

const initialState = {
    languages: [],
    loading: false,
    error: null,
};

const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LANGUAGE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_LANGUAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                languages: action.payload,
            };
        case FETCH_LANGUAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default languageReducer;
