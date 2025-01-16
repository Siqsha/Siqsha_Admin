import { FETCH_CATEGORY_FAILURE, FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, FETCH_LANGUAGE_FAILURE, FETCH_LANGUAGE_REQUEST, FETCH_LANGUAGE_SUCCESS, FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from "../action/action";

export const fetchLanguageRequest = () => ({ type: FETCH_LANGUAGE_REQUEST });
export const fetchLanguageSuccess = (languages) => ({ type: FETCH_LANGUAGE_SUCCESS, payload: languages });
export const fetchLanguageFailure = (error) => ({ type: FETCH_LANGUAGE_FAILURE, payload: error });

export const fetchCategoryRequest = () => ({ type: FETCH_CATEGORY_REQUEST });
export const fetchCategorySuccess = (categories) => ({ type: FETCH_CATEGORY_SUCCESS, payload: categories });
export const fetchCategoryFailure = (error) => ({ type: FETCH_CATEGORY_FAILURE, payload: error });

export const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUEST });
export const fetchUsersSuccess = (users) => ({ type: FETCH_USERS_SUCCESS, payload: users });
export const fetchUsersFailure = (error) => ({ type: FETCH_USERS_FAILURE, payload: error });