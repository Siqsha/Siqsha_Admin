import { handleApiRequest } from "../../../utils/handleApiRequest";

export const getAllUsers = async (role) => {
    return await handleApiRequest("GET", "/user-data/" + role, true);
};

export const getUserProfile = async (id) => {
    return await handleApiRequest("GET", "/get-profile/" + id, true);
};

export const addCategories = async (formData) => {
    return await handleApiRequest("POST", "/setup-category", formData)
}

export const updateCategories = async (formData) => {
    return await handleApiRequest("PUT", "/update-category", formData)
}

export const getAllCategories = async () => {
    return await handleApiRequest("GET", "/all-category")
}
