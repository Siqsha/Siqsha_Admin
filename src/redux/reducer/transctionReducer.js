import {
    FETCH_USERS_TRANSCTION,
    FETCH_USERS_TRANSCTION_SUCCESS,
    FETCH_USERS_TRANSCTION_FAILURE,
} from "../action/action";

const initialState = {
    transactions: [],
    pagination: {},
    loading: false,
    error: null,
};

const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_TRANSCTION:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_USERS_TRANSCTION_SUCCESS:
            return {
                ...state,
                loading: false,
                transactions: action.payload?.data || [],
                pagination: action.payload.pagination,
            };
        case FETCH_USERS_TRANSCTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };


        default:
            return state;
    }
};

export default transactionReducer;
