import {
    FETCH_FILTER_TRANSCTION,
    FETCH_FILTER_TRANSCTION_SUCCESS,
    FETCH_FILTER_TRANSCTION_FAILURE,
} from "../action/action";

const initialState = {
    filters: [],
    pagination: {},
    loading: false,
    error: null,
};
const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FILTER_TRANSCTION:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_FILTER_TRANSCTION_SUCCESS:
            return {
                ...state,
                loading: false,
                filters: action.payload?.data || [],
                pagination: action.payload.pagination,
            };
        case FETCH_FILTER_TRANSCTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default filterReducer;


