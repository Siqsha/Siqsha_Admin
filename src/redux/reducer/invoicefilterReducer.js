import {
    FETCH_FILTER_INVOICE,
    FETCH_FILTER_INVOICE_SUCCESS,
    FETCH_FILTER_INVOICE_FAILURE,
} from "../action/action";

const initialState = {
    invoicefilters: {
        invoices: [],
        pagination: {},
    },
    loading: false,
    error: null,
};

const invoicefilterReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FILTER_INVOICE:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_FILTER_INVOICE_SUCCESS:
            return {
                ...state,
                loading: false,
                invoicefilters: {
                    invoices: action.payload?.data?.invoices || [],
                    pagination: action.payload?.data?.pagination || {},
                },
            };
        case FETCH_FILTER_INVOICE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default invoicefilterReducer;
