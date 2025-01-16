import React, { createContext, useContext, useState } from "react";
import MessageModal from "../model/MessageModal";

const MessageModalContext = createContext();

export const useMessageModal = () => {
  return useContext(MessageModalContext);
};

export const MessageModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    open: false,
    success: false,
    message: "",
  });
  const [modalCloseCallback, setModalCloseCallback] = useState(null);

  const showMessageModal = (response, closeCallback = null) => {
    setModalState({
      success: response?.success ?? false,
      message: response?.message ?? "An error occurred.",
      open: true,
    });
    setModalCloseCallback(() => closeCallback);
  };

  const hideMessageModal = () => {
    setModalState((prev) => ({ ...prev, open: false }));
    if (modalCloseCallback) {
      modalCloseCallback();
    }
  };

  const modalElement = (
    <MessageModal
      open={modalState.open}
      setOpen={(isOpen) => {
        if (!isOpen) hideMessageModal();
      }}
      title={modalState.success ? "All Set!" : "Oops! Something Went Wrong"}
      message={modalState.message}
      isSuccess={modalState.success}
    />
  );

  return (
    <MessageModalContext.Provider value={{ showMessageModal }}>
      {children}
      {modalElement}
    </MessageModalContext.Provider>
  );
};
