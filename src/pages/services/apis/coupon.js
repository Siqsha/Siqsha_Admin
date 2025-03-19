import { handleApiRequest } from "../../../utils/handleApiRequest"


export const addCoupon = async (formData) => {
    return await handleApiRequest("POST", "/add-coupon", formData)
}