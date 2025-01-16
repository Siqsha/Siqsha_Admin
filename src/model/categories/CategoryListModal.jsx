import React, { useEffect, useState } from "react";
import CommonDialog from "../../components/common/CommonDialog";
import { DialogTitle } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { FaChevronDown, FaChevronRight, FaRegEdit } from "react-icons/fa";
import {
  approveCategory,
  deleteCategory,
  getAllCategories,
} from "../../pages/services/apis/categoryApi";
import Button from "../../components/common/Button";
import { useModal } from "../../contexts/ModalContext";
import { useMessageModal } from "../../contexts/MessageModalContext";
import { useConfirmationModal } from "../../contexts/ConfirmationModalContext";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const CategoryListModal = ({ open, setOpen }) => {
  const { openModal } = useModal();
  const { showMessageModal } = useMessageModal();
  const { showConfirmationModal } = useConfirmationModal();
  const [openCategory, setOpenCategory] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);

  const toggleCategory = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  useEffect(() => {
    fetchCategories();
  }, [dispatch]);

  const fetchCategories = async (status = "approved", forceRefresh) => {
    dispatch(getAllCategories(status, forceRefresh));
  };

  const handleEdit = (cat) => {
    openModal("AddCategoryModel", { category: cat });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    fetchCategories(tab === "all" ? "approved" : "pending", true);
  };

  const handleDelete = (catId) => {
    showConfirmationModal(
      "Are you sure you want to delete this item?",
      async () => {
        try {
          const data = await dispatch(deleteCategory(catId));
          showMessageModal(data);
          if (data.success) {
            fetchCategories("approved", true);
          }
        } catch (error) {
          console.error("Error deleting language:", error);
          showMessageModal({
            success: false,
            message: "Failed to delete the item",
          });
        }
      }
    );
  };

  const handleApproveCategory = async (cateId) => {
    const data = await dispatch(approveCategory(cateId));
    showMessageModal(data);
    fetchCategories("pending");
  };

  return (
    <CommonDialog open={open} setOpen={setOpen}>
      <div className="bg-white sm:p-[16px] p-[24px]">
        <div className="flex justify-between items-center mb-10">
          <div className="flex gap-16 items-center">
            <div>
              <Button
                onClick={() => openModal("AddCategoryModel")}
                className="bg-primary border-[2px] text-white sm:px-[28px] px-[16px]"
                text={"Add Category"}
              />
            </div>
            <DialogTitle
              as="h3"
              className={`text-[22px] font-bold text-primary text-center`}
            >
              Manage Category
            </DialogTitle>
          </div>
          <button onClick={() => setOpen(false)}>
            <IoMdClose className="text-3xl" />
          </button>
        </div>
        <div className="mb-8">
          <div className="mb-6 flex space-x-6 ">
            <button
              onClick={() => handleTabChange("all")}
              className={`text-lg font-semibold py-2 px-4  ${
                activeTab === "all"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 hover:text-gray-800"
              } transition-all`}
            >
              All Categories
            </button>
            <button
              onClick={() => handleTabChange("pending")}
              className={`text-lg font-semibold py-2 px-4 ${
                activeTab === "pending"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 hover:text-gray-800"
              } transition-all`}
            >
              Pending Categories
            </button>
          </div>

          <div className="space-y-4">
            {loading && <p>Loading...</p>}
            {!loading && categories.length > 0 ? (
              categories.map((category) => (
                <div key={category._id}>
                  <div
                    className="flex items-center cursor-pointer p-4 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-md transition"
                    onClick={() => toggleCategory(category._id)}
                  >
                    <div className="mr-4">
                      {openCategory === category._id ? (
                        <FaChevronDown size={20} className="text-gray-500" />
                      ) : (
                        <FaChevronRight size={20} className="text-gray-500" />
                      )}
                    </div>

                    <h2 className="text-xl font-semibold text-gray-800 capitalize flex-1">
                      {category.category}
                    </h2>

                    {category.status === "approved" ? (
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleDelete(category._id)}
                          type="button"
                          className="text-red bg-white border-red border-2 w-[38px] h-[38px] rounded-md flex justify-center items-center"
                        >
                          <RiDeleteBinLine className="text-[20px] w-[20px] h-[20px]" />
                        </button>
                        <button
                          onClick={() => handleEdit(category)}
                          type="button"
                          className="font-medium text-primary w-[38px] h-[38px] border-2 border-[#002060] rounded-md flex justify-center items-center gap-[10px]"
                        >
                          <FaRegEdit className="text-[20px] w-[20px] h-[20px]" />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="text-red-500 hover:text-red-700 font-semibold transition text-primary border-primary"
                        onClick={() => handleApproveCategory(category._id)}
                      >
                        Approve
                      </button>
                    )}
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openCategory === category._id ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="pl-8 pt-2 space-y-2">
                      {category.subcategories.map((sub, index) => (
                        <li
                          key={index}
                          className="text-gray-700 flex items-start space-x-2 font-medium"
                        >
                          <span className="capitalize">{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <p>No data found</p>
            )}
          </div>
        </div>
      </div>
    </CommonDialog>
  );
};

export default CategoryListModal;
