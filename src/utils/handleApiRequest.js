// import { authInstance, axiosInstance } from "../config/apiClient";

// export const handleApiRequest = async (method, endpoint, data = {}, useAuthInstance = false) => {
//     const instance = useAuthInstance ? authInstance : axiosInstance;

//     try {
//         const response = await instance.request({
//             method,
//             url: endpoint,
//             data,
//         });

//         // console.log('response', response)
//         const isSuccess = ["get", "post", "put", "delete"].includes(method.toLowerCase());
//         return { ...response.data, success: isSuccess };
//     } catch (error) {
//         return {
//             message: error.response.data.message || "An error occurred",
//             warning: error.response.data.warning || false,
//             success: false,
//         };
//     }
// };

import { authInstance, axiosInstance } from "../config/apiClient";
export const handleApiRequest = async (method, endpoint, payload = {}, useAuthInstance = false) => {
    const instance = useAuthInstance ? authInstance : axiosInstance;

    try {
        const config = {
            method,
            url: endpoint,
        };

        // Handle GET differently to use query params
        if (method.toLowerCase() === "get") {
            config.params = payload;
        } else {
            config.data = payload;
        }

        const response = await instance.request(config);

        return {
            ...response.data,
            success: true,
        };
    } catch (error) {
        return {
            message: error?.response?.data?.message || "An error occurred",
            warning: error?.response?.data?.warning || false,
            success: false,
        };
    }
};
