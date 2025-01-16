import { fetchLanguageFailure, fetchLanguageRequest, fetchLanguageSuccess } from "../../../redux/actionCreator/actionCreator";
import { handleApiRequest } from "../../../utils/handleApiRequest"

export const addLanguage = (newLanguage) => {
    return async (dispatch) => {
        try {
            const data = await handleApiRequest("POST", "/add-language", newLanguage);
            dispatch(getAllLanguage(true))
            return data
        } catch (error) {
            console.error("Error adding language:", error);
        }
    };
};

export const getAllLanguage = (forceRefresh = false) => {
    return async (dispatch, getState) => {
        const { languages } = getState().language;
        if (languages.length > 0 && !forceRefresh) {
            return;
        }
        dispatch(fetchLanguageRequest());
        try {
            const data = await handleApiRequest("GET", "/language");
            dispatch(fetchLanguageSuccess(data.languages));
        } catch (error) {
            dispatch(fetchLanguageFailure(error.message));
        }
    };
};

export const updateLanguage = (id, updatedLanguage) => {
    return async (dispatch) => {
        try {
            const data = await handleApiRequest("PUT", `/update-language/${id}`, updatedLanguage);
            dispatch(getAllLanguage(true));
            return data
        } catch (error) {
            console.error("Error updating language:", error);
        }
    };
};

export const deleteLanguage = (id) => {
    return async (dispatch) => {
        try {
            const data = await handleApiRequest("DELETE", `/delete-language/${id}`);
            dispatch(getAllLanguage(true));
            return data
        } catch (error) {
            console.error("Error deleting language:", error);
        }
    };
};