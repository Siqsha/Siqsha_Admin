import React, { createContext, useContext, useState } from "react";
import LanguageListModal from "../model/languages/LanguageListModal";
import AddLanguageModal from "../model/languages/AddLanguageModal";
import CategoryListModal from "../model/categories/CategoryListModal";
import AddCategoryModal from "../model/categories/AddCategoryModal";

const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    modalName: "",
    modalProps: {},
  });

  const openModal = (modalName, modalProps = {}) => {
    setModalState({
      isOpen: true,
      modalName,
      modalProps,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      modalName: "",
      modalProps: {},
    });
  };

  const modalComponents = {
    ManageLanguages: () => (
      <LanguageListModal open={modalState.isOpen} setOpen={closeModal} />
    ),
    AddLanguageModal: (language) => (
      <AddLanguageModal
        open={modalState.isOpen}
        setOpen={closeModal}
        language={language}
      />
    ),
    CategoryList: () => (
      <CategoryListModal open={modalState.isOpen} setOpen={closeModal} />
    ),
    AddCategoryModel: (category) => (
      <AddCategoryModal
        open={modalState.isOpen}
        setOpen={closeModal}
        category={category}
      />
    ),
  };

  const ModalContent =
    modalState.isOpen && modalState.modalName
      ? React.createElement(
          modalComponents[modalState.modalName],
          modalState.modalProps
        )
      : null;

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {ModalContent}
    </ModalContext.Provider>
  );
};
