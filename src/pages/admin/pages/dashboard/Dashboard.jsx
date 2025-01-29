import React from "react";
import CommonLayout from "../../../../components/common/CommonLayout";
import { useModal } from "../../../../contexts/ModalContext";
import { FaLanguage, FaListAlt } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";

function Dashboard() {
  const { openModal } = useModal();
  return (
    <>
      <CommonLayout title={"Dashboard"}>
        <div className="flex sm:justify-end justify-center gap-3">
          <button
            onClick={() => openModal("AddLanguageModal")}
            className="bg-primary py-2 px-3 flex justify-center items-center gap-2 rounded-lg"
          >
            <HiPlus className="text-2xl text-white font-bold" />
            <p className="text-white text-lg">Language</p>
          </button>
          <button
            onClick={() => openModal("AddCategoryModel")}
            className="bg-primary py-2 px-3 flex justify-center items-center gap-2 rounded-lg"
          >
            <HiPlus className="text-2xl text-white font-bold" />
            <p className="text-white text-lg">Category</p>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          <div
            className="bg-blue-500 p-8 text-white shadow-md flex gap-2 items-center justify-center cursor-pointer hover:bg-blue-600 transition"
            onClick={() => openModal("ManageLanguages")}
          >
            <div className="">
              <FaLanguage className="text-4xl" />
            </div>
            <h3 className="text-xl">Manage Languages</h3>
          </div>
          <div
            className="bg-green-500 p-8 text-white shadow-md flex gap-2 items-center justify-center cursor-pointer hover:bg-green-600 transition"
            onClick={() => openModal("CategoryList")}
          >
            <div className="">
              <FaListAlt className="text-4xl" />
            </div>
            <h3 className="text-xl">Manage Categories</h3>
          </div>
        </div>
      </CommonLayout>
    </>
  );
}

export default Dashboard;
