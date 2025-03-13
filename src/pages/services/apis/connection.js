import { handleApiRequest } from "../../../utils/handleApiRequest";

export const allNotifications = () => handleApiRequest("GET", "/all-notifications")

export const clearNotification = () => handleApiRequest("PUT", "/clear-notification")