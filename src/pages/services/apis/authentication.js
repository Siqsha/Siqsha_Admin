import { handleApiRequest } from "../../../utils/handleApiRequest";

export const login = (formData) => handleApiRequest("POST", "/login", formData, true);

export const signup = (formData) => handleApiRequest("POST", "/signup", formData, true);

export const reactiveAccount = (email) => handleApiRequest("POST", "/reactive-account", email, true);

export const forgotPassword = (email) => handleApiRequest("POST", "/forgot-password", email, true);

export const resetPassword = (formData) => handleApiRequest("POST", "/reset-password", formData, true);

export const loginWithGoogle = (formData) => handleApiRequest("POST", "/googlelogin", formData, true);

export const updateProfile = (formData) => handleApiRequest("PUT", "/update-profile", formData);

export const setupUserRole = (formData) => handleApiRequest("PUT", "/update-role", formData);

export const verifyEmail = (formData) => handleApiRequest("POST", "/verify-email", formData);

export const sendOtp = (formData) => handleApiRequest("POST", "/send-verification-otp", formData);

export const getProfile = () => handleApiRequest("GET", "/get-profile");
