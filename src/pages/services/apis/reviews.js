import { handleApiRequest } from "../../../utils/handleApiRequest"

export const addReviews = async (formData) => {
    return await handleApiRequest("POST", "/add-answer", formData)
}

export const getAllReviews = async (page = 1, limit = 10) => {
    return await handleApiRequest("GET", `/get-all-reviews?page=${page}&limit=${limit}`);
};


