import React, { useState } from "react";
import CommonDialog from "../../components/common/CommonDialog";
import { DialogTitle } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { BiPlus } from "react-icons/bi";
import Button from "../../components/common/Button";
import { RiDeleteBinLine } from "react-icons/ri";
import TextInput from "../../components/common/TextInput";
import { FieldArray, Form, Formik } from "formik";
import { categoryValidationSchema } from "../../utils/validationSchemas";
import {
  addCategories,
  updateCategory,
} from "../../pages/services/apis/categoryApi";
import { useMessageModal } from "../../contexts/MessageModalContext";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function AddCategoryModal({ open, setOpen, category = {} }) {
  const dispatch = useDispatch();
  const { showMessageModal } = useMessageModal();
  const [initialValues, setInitialValues] = useState({
    categories: [
      {
        category: "",
        subcategories: [""],
      },
    ],
  });

  // Function to add a new category with an empty subcategory
  const addCategory = () => {
    setInitialValues((prevState) => ({
      ...prevState,
      categories: [
        ...prevState.categories,
        {
          category: "",
          subcategories: [""],
        },
      ],
    }));
  };

  useEffect(() => {
    if (category?.category) {
      setInitialValues({
        categories: [
          {
            category: category.category.category,
            subcategories: category.category.subcategories,
          },
        ],
      });
    }
  }, [category]);

  const handleSubmit = async (values) => {
    let data;
    if (category?.category) {
      data = await dispatch(
        updateCategory(category.category._id, {
          categories: values.categories,
        })
      );
    } else {
      data = await dispatch(addCategories({ categories: values.categories }));
    }
    showMessageModal(data);

    if (data.success) {
      setOpen(false);
    }
  };

  return (
    <CommonDialog open={open} setOpen={setOpen}>
      <div className="bg-white p-[10px] sm:p-[16px] md:p-[24px] ">
        <div className="flex justify-between items-center pb-20">
          <div className="flex justify-center items-center flex-grow">
            <DialogTitle
              as="h3"
              className="sm:text-[22px] text-[20px] font-bold text-primary text-center mx-auto"
            >
              Add Category
            </DialogTitle>
          </div>
          <button onClick={() => setOpen(false)}>
            <IoMdClose className="sm:text-3xl text-2xl" />
          </button>
        </div>
        <div className="sm:p-4 h-full max-h-[632px] overflow-auto my-scroll">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={categoryValidationSchema}
            enableReinitialize={true}
          >
            {({ values, isSubmitting }) => {
              return (
                <Form>
                  <FieldArray name="categories">
                    {({ push, remove }) => (
                      <>
                        <div className="absolute top-20 z-50 ml-2">
                          <button
                            type="button"
                            onClick={() => {
                              push({
                                category: "",
                                subcategories: [""],
                              });
                            }}
                            className="font-medium text-primary w-[90px] h-[45px] border-2 border-[#002060] rounded-md flex justify-center items-center gap-[8px] bg-white"
                          >
                            <BiPlus className="text-[24px] w-[24px] h-[24px]" />
                            <span>Add</span>
                          </button>
                        </div>
                        <div className="px-[8px] sm:px-[15px]">
                          {values.categories.map((category, index) => (
                            <div key={index}>
                              <div>
                                <div className="flex justify-end items-center mt-6">
                                  <div className="flex justify-center items-start">
                                    <div className="flex justify-end gap-3 items-center">
                                      {values.categories.length > 1 && (
                                        <button
                                          type="button"
                                          onClick={() => remove(index)}
                                          className="text-red bg-white border-red border-2 w-[46px] h-[46px] rounded-md flex justify-center items-center"
                                        >
                                          <RiDeleteBinLine className="text-[20px]" />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-between gap-3 items-end mb-4">
                                  <div className="grid w-full">
                                    <TextInput
                                      label="Category"
                                      name={`categories.${index}.category`}
                                      placeholder="Enter Category"
                                    />
                                  </div>
                                </div>
                                <label className="text-[16px] text-black">
                                  Subcategory
                                </label>
                                <FieldArray
                                  name={`categories.${index}.subcategories`}
                                >
                                  {({ push, remove }) => (
                                    <div className="">
                                      {category.subcategories?.map(
                                        (subcategory, subIndex) => (
                                          <div key={subIndex} className="flex">
                                            <div className="flex gap-3 sm:gap-4 flex-col sm:flex-row w-full sm:items-center mb-4">
                                              <TextInput
                                                // label={`Subcategory`}

                                                name={`categories.${index}.subcategories.${subIndex}`}
                                                placeholder="Enter Subcategory"
                                              />
                                              <div className="flex gap-2 justify-end items-end mt-1 mb-4 sm:mb-0">
                                                {subIndex ===
                                                  category.subcategories
                                                    .length -
                                                    1 && (
                                                  <button
                                                    type="button"
                                                    onClick={() => push("")}
                                                    className="font-medium text-primary w-[45px] h-[45px] border-2 border-[#002060] rounded-md flex justify-center items-center gap-[10px] self-end"
                                                  >
                                                    <BiPlus className="text-[24px] w-[24px] h-[24px]" />
                                                  </button>
                                                )}
                                                {category.subcategories.length >
                                                  1 && (
                                                  <button
                                                    type="button"
                                                    onClick={() =>
                                                      remove(subIndex)
                                                    }
                                                    className="text-red bg-white border-red border-2 w-[45px] h-[45px]  rounded-md flex justify-center items-center self-end"
                                                  >
                                                    <RiDeleteBinLine className="text-[20px]" />
                                                  </button>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}
                                </FieldArray>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </FieldArray>
                  <div className="flex justify-center items-center">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      text={category?.category ? "Update" : "Add"}
                      className="bg-primary text-white hover:bg-[#466cb7] sm:px-[28px] px-[16px] mt-2 ml-[16px] w-full"
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </CommonDialog>
  );
}

export default AddCategoryModal;
