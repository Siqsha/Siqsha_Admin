import { fetchCategoryFailure, fetchCategoryRequest, fetchCategorySuccess } from "../../../redux/actionCreator/actionCreator";
import { handleApiRequest } from "../../../utils/handleApiRequest"

export const getAllCategories = (status, forceRefresh = false) => {
    return async (dispatch, getState) => {
        const { categories } = getState().categories;
        if (categories.length > 0 && !forceRefresh) {
            return;
        }
        dispatch(fetchCategoryRequest());
        try {
            const data = await handleApiRequest("GET", `/all-category?status=${status}`);
            dispatch(fetchCategorySuccess(data.categories));
        } catch (error) {
            dispatch(fetchCategoryFailure(error.message));
        }
    };
};

export const addCategories = (formData) => {
    return async (dispatch) => {
        try {
            const data = await handleApiRequest("POST", "/setup-category", formData);
            dispatch(getAllCategories("active", true));
            return data;
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };
};

export const updateCategory = (id, formData) => {
    return async (dispatch) => {
        try {
            const data = await handleApiRequest("PUT", `/update-category/${id}`, formData);
            dispatch(getAllCategories("active", true));
            return data;
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };
};

export const deleteCategory = (id) => {
    return async (dispatch) => {
        try {
            const data = await handleApiRequest("DELETE", `/delete-category/${id}`);
            dispatch(getAllCategories("active", true));
            return data;
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };
};

export const approveCategory = (id) => {
    return async (dispatch) => {
        try {
            const data = await handleApiRequest("PUT", `/approve-category/${id}`);
            dispatch(getAllCategories("active", true));
            return data;
        } catch (error) {
            console.error("Error approving category:", error);
        }
    };
};
