import React, { createContext, useContext, useState } from "react";
import ConfirmationModal from "../model/ConfirmationModal";

const ConfirmationModalContext = createContext();

export const useConfirmationModal = () => {
  return useContext(ConfirmationModalContext);
};

export const ConfirmationModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    open: false,
    title: "",
    onConfirm: null,
    loading: false,
  });

  const showConfirmationModal = (title, onConfirm) => {
    setModalState({
      open: true,
      title,
      onConfirm,
      loading: false,
    });
  };

  const hideModal = () => {
    setModalState({ ...modalState, open: false });
  };

  const handleConfirm = async () => {
    setModalState((prev) => ({ ...prev, loading: true })); // Show loading state when confirming
    try {
      await modalState.onConfirm();
    } catch (error) {
      console.error(error);
    }
    setModalState({ open: false, title: "", onConfirm: null, loading: false }); // Reset after confirming
  };

  const modalElement = (
    <ConfirmationModal
      open={modalState.open}
      setOpen={hideModal}
      title={modalState.title}
      handleConfirmClick={handleConfirm}
      loader={modalState.loading}
    />
  );

  return (
    <ConfirmationModalContext.Provider value={{ showConfirmationModal }}>
      {children}
      {modalElement}
    </ConfirmationModalContext.Provider>
  );
};
