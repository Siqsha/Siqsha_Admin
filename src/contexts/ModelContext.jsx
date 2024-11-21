import React, { createContext, useContext, useState } from "react";
import MessageModal from "../model/MessageModal";

const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    open: false,
    success: false,
    message: "",
  });
  const [modalCloseCallback, setModalCloseCallback] = useState(null);

  const showModal = (response, closeCallback = null) => {
    setModalState({
      success: response?.success ?? false,
      message: response?.message ?? "An error occurred.",
      open: true,
    });
    setModalCloseCallback(() => closeCallback);
  };

  const hideModal = () => {
    setModalState((prev) => ({ ...prev, open: false }));
    if (modalCloseCallback) {
      modalCloseCallback();
    }
  };

  const modalElement = (
    <MessageModal
      open={modalState.open}
      setOpen={(isOpen) => {
        if (!isOpen) hideModal();
      }}
      title={modalState.success ? "All Set!" : "Oops! Something Went Wrong"}
      message={modalState.message}
      isSuccess={modalState.success}
    />
  );

  return (
    <ModalContext.Provider value={{ showModal }}>
      {children}
      {modalElement}
    </ModalContext.Provider>
  );
};
