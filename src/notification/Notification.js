import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
    return (
        <ToastContainer />
    );
};

export const showSuccessNotification = (message) => {
    toast.success(message);
};

export const showErrorNotification = (message) => {
    toast.error(message);
};

export default Notification;
