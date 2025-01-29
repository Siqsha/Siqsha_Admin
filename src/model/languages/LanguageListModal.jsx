import React, { useEffect } from "react";
import CommonDialog from "../../components/common/CommonDialog";
import { DialogTitle } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import {
  deleteLanguage,
  getAllLanguage,
} from "../../pages/services/apis/languageApi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { useConfirmationModal } from "../../contexts/ConfirmationModalContext";
import { useMessageModal } from "../../contexts/MessageModalContext";
import Button from "../../components/common/Button";
import { useModal } from "../../contexts/ModalContext";
import { useSelector, useDispatch } from "react-redux";
import LanguagesSkeleton from "../../components/skeleton/LanguagesSkeleton";

function LanguageListModal({ open, setOpen }) {
  const { openModal } = useModal();
  const { showMessageModal } = useMessageModal();
  const { showConfirmationModal } = useConfirmationModal();
  const dispatch = useDispatch();
  const { languages, loading } = useSelector((state) => state.language);

  useEffect(() => {
    dispatch(getAllLanguage());
  }, [dispatch]);

  const handleAddLanguage = () => {
    openModal("AddLanguageModal");
  };

  const handleEdit = (lang) => {
    openModal("AddLanguageModal", { language: lang });
  };

  const handleDelete = (langId) => {
    showConfirmationModal(
      "Are you sure you want to delete this item?",
      async () => {
        try {
          const data = await dispatch(deleteLanguage(langId));
          showMessageModal(data);
          if (data.success) {
            dispatch(getAllLanguage());
          }
        } catch (error) {
          showMessageModal({
            success: false,
            message: "Failed to delete the item",
          });
        }
      }
    );
  };

  return (
    <CommonDialog open={open} setOpen={setOpen}>
      <div className="bg-white p-[10px] md:p-[24px]">
        <div className="flex justify-between items-center pb-1">
          <div className="flex justify-center items-center flex-grow">
            <DialogTitle
              as="h3"
              className="sm:text-[22px] text-[20px] font-bold text-primary text-center mx-auto"
            >
              Manage Languages
            </DialogTitle>
          </div>
          <button onClick={() => setOpen(false)}>
            <IoMdClose className="sm:text-3xl text-2xl" />
          </button>
        </div>

        {loading && <LanguagesSkeleton />}
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="flex flex-col divide-y divide-gray-300">
              <div className="flex py-3.5 !pl-[17px] pr-3 text-left text-lg font-semibold text-gray-900 sm:pl-0">
                <div className="flex-1">Name</div>
                <div className="relative">
                  <span className="sr-only">Edit</span>
                </div>
              </div>
              <div className="flex flex-col max-h-[470px] overflow-auto my-scroll px-3">
                {!loading &&
                  languages?.map((lang) => (
                    <div
                      key={lang._id}
                      className="flex justify-between items-center py-2 gap-3 border-b-slate-300 pb-4 border-b-[1px]"
                    >
                      <div className="flex-1 sm:text-lg text-sm font-medium text-gray-900">
                        {lang.name}
                      </div>
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleDelete(lang._id)}
                          type="button"
                          className="text-red bg-white border-red border-2 sm:w-[38px] w-[30px] sm:h-[38px] h-[30px] rounded-md flex justify-center items-center"
                        >
                          <RiDeleteBinLine className="sm:text-[20px] text-[18px] " />
                        </button>
                        <button
                          onClick={() => handleEdit(lang)}
                          type="button"
                          className="font-medium text-primary sm:w-[38px] w-[30px] sm:h-[38px] h-[30px] border-2 border-[#002060] rounded-md flex justify-center items-center gap-[10px]"
                        >
                          <FaRegEdit className="sm:text-[20px] text-[18px]" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonDialog>
  );
}

export default LanguageListModal;
