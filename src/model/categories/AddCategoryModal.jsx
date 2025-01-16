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
      <div className="bg-white sm:p-[16px] p-[24px]">
        <div className="flex justify-between items-start">
          <div>
            <DialogTitle
              as="h3"
              className={`text-[22px] font-bold text-primary mb-[32px] text-center`}
            >
              {category?.category ? "Edit Category" : "Add Category"}
            </DialogTitle>
          </div>
          <button onClick={() => setOpen(false)}>
            <IoMdClose className="text-3xl" />
          </button>
        </div>
        <div className="p-4">
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
                      <div className="px-[15px]">
                        {values.categories.map((category, index) => (
                          <div key={index}>
                            <div className="mt-5">
                              <div className="flex justify-end items-center border-b-2 border-gray pb-2 mb-2">
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
                                    <button
                                      type="button"
                                      onClick={() =>
                                        push({
                                          category: "",
                                          subcategories: [""],
                                        })
                                      }
                                      className="font-medium text-primary w-[45px] h-[45px] border-2 border-[#002060] rounded-md flex justify-center items-center gap-[10px]"
                                    >
                                      <BiPlus className="text-[24px] w-[24px] h-[24px]" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between gap-3 items-end mb-4">
                                <div className="grid xl:grid-cols-2 grid-cols-1 sm:gap-[27px] gap-[16px] w-full">
                                  <TextInput
                                    label="Category"
                                    name={`categories.${index}.category`}
                                    placeholder="Enter Category"
                                  />
                                </div>
                              </div>
                              <FieldArray
                                name={`categories.${index}.subcategories`}
                              >
                                {({ push, remove }) => (
                                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-center">
                                    {category.subcategories?.map(
                                      (subcategory, subIndex) => (
                                        <div key={subIndex} className="flex">
                                          <div className="flex gap-4 w-full items-center">
                                            <TextInput
                                              label={`Subcategory`}
                                              name={`categories.${index}.subcategories.${subIndex}`}
                                              placeholder="Enter Subcategory"
                                            />
                                            {category.subcategories.length >
                                              1 && (
                                              <button
                                                type="button"
                                                onClick={() => remove(subIndex)}
                                                className="text-red bg-white border-red border-2 w-[46px] h-[46px] rounded-md flex justify-center items-center self-end"
                                              >
                                                <RiDeleteBinLine className="text-[20px]" />
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      )
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => push("")}
                                      className="font-medium text-primary w-[45px] h-[45px] border-2 border-[#002060] rounded-md flex justify-center items-center gap-[10px] self-end"
                                    >
                                      <BiPlus className="text-[24px] w-[24px] h-[24px]" />
                                    </button>
                                  </div>
                                )}
                              </FieldArray>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </FieldArray>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    text={category?.category ? "Update" : "Add"}
                    className="bg-primary text-white hover:bg-[#466cb7] sm:px-[28px] px-[16px]"
                  />
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
