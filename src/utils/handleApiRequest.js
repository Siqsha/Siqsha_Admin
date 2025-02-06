import { authInstance, axiosInstance } from "../config/apiClient";

export const handleApiRequest = async (method, endpoint, data = {}, useAuthInstance = false) => {
    const instance = useAuthInstance ? authInstance : axiosInstance;

    try {
        const response = await instance.request({
            method,
            url: endpoint,
            data,
        });

        console.log('response', response.data)
        const isSuccess = ["post", "put", "delete"].includes(method.toLowerCase());
        return { ...response.data, success: isSuccess };
    } catch (error) {
        return {
            message: error.response.data.message || "An error occurred",
            warning: error.response.data.warning || false,
            success: false,
        };
    }
};
