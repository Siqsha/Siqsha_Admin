import {
    FETCH_USERS_INVOICE,
    FETCH_USERS_INVOICE_FAILURE,
    FETCH_USERS_INVOICE_SUCCESS,
} from "../action/action";

const initialState = {
    invoices: [],
    pagination: {},
    loading: false,
    error: null,
};

const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_INVOICE:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_USERS_INVOICE_SUCCESS:
            return {
                ...state,
                loading: false,
                invoices: action.payload?.data || [],
                pagination: action.payload.pagination,
            };
        case FETCH_USERS_INVOICE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };


        default:
            return state;
    }
};

export default invoiceReducer;
