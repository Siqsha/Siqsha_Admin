import React, { useEffect, useState } from "react";
import Button from "../../../../components/common/Button";
import TextInput from "../../../../components/common/TextInput";
import { RiDeleteBinLine } from "react-icons/ri";
import { FieldArray, Form, Formik } from "formik";
import { BiPlus } from "react-icons/bi";
import { useMessageModal } from "../../../../contexts/MessageModalContext";
import CommonLayout from "../../../../components/common/CommonLayout";
import {
  addCategories,
  getAllCategories,
  updateCategory,
} from "../../../services/apis/categoryApi";

function Categories() {
  const [fetchedCategories, setFetchedCategories] = useState(null);
  const { showMessageModal } = useMessageModal();
  const [documentId, setDocumentId] = useState(null);
  const initialValues = {
    categories: [
      {
        category: "",
        subcategories: [""],
      },
    ],
  };

  const handleSubmit = async (values) => {
    const formData = documentId
      ? { documentId, categories: values.categories }
      : values;

    try {
      let response;
      if (!documentId) {
        response = await addCategories(formData);
      } else {
        response = await updateCategory(formData);
      }
      fetchCategory();
      showMessageModal(response);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const fetchCategory = async () => {
    const response = await getAllCategories();
    if (response && response.categories) {
      setDocumentId(response.categories._id);
      setFetchedCategories(response.categories.categories);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <CommonLayout title={"Categories"}>
        <div className="bg-white">
          <Formik
            initialValues={
              fetchedCategories
                ? { categories: fetchedCategories }
                : initialValues
            }
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,
              resetForm,
              setValues,
            }) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useEffect(() => {
                if (fetchedCategories) {
                  setValues({ categories: fetchedCategories });
                }
              }, [fetchedCategories, setValues]);

              return (
                <Form>
                  <FieldArray name="categories">
                    {({ push, remove }) => (
                      <div className="sm:p-[30px] !pt-0">
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
                                  <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 sm:gap-[27px] gap-[16px] w-full">
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
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 items-center">
                                      {category.subcategories?.map(
                                        (subcategory, subIndex) => (
                                          <div key={subIndex} className="flex">
                                            <div className="flex gap-4 w-full items-center">
                                              <TextInput
                                                label={`Subcategory ${
                                                  subIndex + 1
                                                }`}
                                                name={`categories.${index}.subcategories.${subIndex}`}
                                                placeholder="Enter Subcategory"
                                              />
                                              {category.subcategories.length >
                                                1 && (
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    remove(subIndex)
                                                  }
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
                      </div>
                    )}
                  </FieldArray>
                  <div className="flex justify-end sm:gap-[22px] gap-[12px] sm:p-[30px] p-[12px] pb-8">
                    <Button
                      onClick={() => resetForm()}
                      text="reset"
                      className="border-primary border-[2px] text-primary sm:px-[28px] px-[16px]"
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      text="Save"
                      className="bg-primary text-white hover:bg-[#466cb7] sm:px-[28px] px-[16px]"
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </CommonLayout>
    </>
  );
}

export default Categories;
