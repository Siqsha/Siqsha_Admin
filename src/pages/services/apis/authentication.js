import { handleApiRequest } from "../../../utils/handleApiRequest";

export const login = (formData) => handleApiRequest("POST", "/login", formData, true);
