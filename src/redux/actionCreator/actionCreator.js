import { FETCH_CATEGORY_FAILURE, FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, FETCH_LANGUAGE_FAILURE, FETCH_LANGUAGE_REQUEST, FETCH_LANGUAGE_SUCCESS, FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, UPDATE_USER_STATUS, FETCH_USERS_TRANSCTION, FETCH_USERS_TRANSCTION_SUCCESS, FETCH_USERS_TRANSCTION_FAILURE, FETCH_FILTER_TRANSCTION, FETCH_FILTER_TRANSCTION_SUCCESS, FETCH_FILTER_TRANSCTION_FAILURE, FETCH_USERS_INVOICE, FETCH_USERS_INVOICE_SUCCESS, FETCH_USERS_INVOICE_FAILURE, FETCH_FILTER_INVOICE, FETCH_FILTER_INVOICE_SUCCESS, FETCH_FILTER_INVOICE_FAILURE } from "../action/action";

export const fetchLanguageRequest = () => ({ type: FETCH_LANGUAGE_REQUEST });
export const fetchLanguageSuccess = (languages) => ({ type: FETCH_LANGUAGE_SUCCESS, payload: languages });
export const fetchLanguageFailure = (error) => ({ type: FETCH_LANGUAGE_FAILURE, payload: error });

export const fetchCategoryRequest = () => ({ type: FETCH_CATEGORY_REQUEST });
export const fetchCategorySuccess = (categories) => ({ type: FETCH_CATEGORY_SUCCESS, payload: categories });
export const fetchCategoryFailure = (error) => ({ type: FETCH_CATEGORY_FAILURE, payload: error });

export const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUEST });
export const fetchUsersSuccess = (users) => ({ type: FETCH_USERS_SUCCESS, payload: users });
export const fetchUsersFailure = (error) => ({ type: FETCH_USERS_FAILURE, payload: error });
export const updateUserStatus = (userId, newStatus) => ({
  type: UPDATE_USER_STATUS,
  payload: { userId, newStatus },
});

export const fetchUsersTransction = () => ({ type: FETCH_USERS_TRANSCTION });
export const fetchUsersTransctionSuccess = (transactions) => ({ type: FETCH_USERS_TRANSCTION_SUCCESS, payload: transactions })
export const fetchUsersTransctionFailure = (error) => ({ type: FETCH_USERS_TRANSCTION_FAILURE, payload: error });

export const fetchFilterTransction = () => ({ type: FETCH_FILTER_TRANSCTION });
export const fetchFilterTransctionSuccess = (transactions) => ({ type: FETCH_FILTER_TRANSCTION_SUCCESS, payload: transactions })
export const fetchFilterTransctionFailure = (error) => ({ type: FETCH_FILTER_TRANSCTION_FAILURE, payload: error });

export const fetchUsersInvoice = () => ({ type: FETCH_USERS_INVOICE });
export const fetchUsersInvoiceSuccess = (transactions) => ({ type: FETCH_USERS_INVOICE_SUCCESS, payload: transactions })
export const fetchUsersInvoiceFailure = (error) => ({ type: FETCH_USERS_INVOICE_FAILURE, payload: error });

export const fetchFilterInvoice = () => ({ type: FETCH_FILTER_INVOICE });
export const fetchFilterInvoiceSuccess = (invoices) => ({ type: FETCH_FILTER_INVOICE_SUCCESS, payload: invoices })
export const fetchFilterInvoiceFailure = (error) => ({ type: FETCH_FILTER_INVOICE_FAILURE, payload: error });