import { handleApiRequest } from "../../../utils/handleApiRequest"


export const addCoupon = async (formData) => {
    return await handleApiRequest("POST", "/add-coupon", formData)
}

export const getCoupons = async () => {
    return await handleApiRequest("GET", "/get-coupons")
}

export const updateStatus = async (formData) => {
    return await handleApiRequest("PUT", "/update-status", formData)
}