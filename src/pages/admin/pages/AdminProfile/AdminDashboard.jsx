import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";
import Button from "../../../../components/common/Button";
import TextInput from "../../../../components/common/TextInput";
import { RiDeleteBinLine } from "react-icons/ri";
import { FieldArray, Form, Formik } from "formik";
import { BiPlus } from "react-icons/bi";
import {
  addCategories,
  getAllCategories,
  updateCategories,
} from "../../../services/apis/userApi";

function AdminDashboard() {
  const [fetchedCategories, setFetchedCategories] = useState(null);
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
    console.log("Form Values:", values);

    const formData = documentId
      ? { documentId, categories: values.categories }
      : values;

    try {
      let response;
      if (!documentId) {
        response = await addCategories(formData);
      } else {
        response = await updateCategories(formData);
      }
      fetchCategory();
      console.log("Response:", response);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const fetchCategory = async () => {
    const response = await getAllCategories();
    if (response && response.categories) {
      console.log("Fetched Categories:", response.categories);
      setDocumentId(response.categories._id);
      setFetchedCategories(response.categories.categories);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <div className="!flex bg-gray1 justify-end">
        <AdminSidebar page="dashboard" />
        <div className="lg:!w-[calc(100%-300px)] w-full">
          <AdminNavbar page="Dashboard" />
          <div>Dashboard</div>
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
                      <div className="sm:p-[30px] p-[12px]">
                        <div className="px-[15px]">
                          {values.categories.map((category, index) => (
                            <div key={index}>
                              <div className="mt-5">
                                <div className="flex justify-end items-center">
                                  <div className="flex justify-center items-start">
                                    <div className="flex justify-end gap-3 items-center ">
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
                                <div className="flex justify-between gap-3 items-end">
                                  <div className="grid md:grid-cols-3 grid-cols-1 sm:gap-[27px] gap-[16px] w-full">
                                    <TextInput
                                      label="Category"
                                      name={`categories.${index}.category`}
                                      placeholder="Enter Category"
                                      isRequired={true}
                                    />
                                  </div>
                                </div>
                                <FieldArray
                                  name={`categories.${index}.subcategories`}
                                >
                                  {({ push, remove }) => (
                                    <div className="flex flex-col">
                                      {category.subcategories?.map(
                                        (subcategory, subIndex) => (
                                          <div
                                            key={subIndex}
                                            className="flex justify-between gap-3 items-end"
                                          >
                                            <div className="grid md:grid-cols-3 grid-cols-1 sm:gap-[27px] gap-[16px] w-full">
                                              <TextInput
                                                label={`Subcategory ${
                                                  subIndex + 1
                                                }`}
                                                name={`categories.${index}.subcategories.${subIndex}`}
                                                placeholder="Enter Subcategory"
                                                isRequired={true}
                                              />
                                              {category.subcategories.length >
                                                1 && (
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    remove(subIndex)
                                                  }
                                                  className="text-red bg-white border-red border-2 w-[46px] h-[46px] rounded-md flex justify-center items-center"
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
                                        className="font-medium text-primary w-[45px] h-[45px] border-2 border-[#002060] rounded-md flex justify-center items-center gap-[10px]"
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
      </div>
    </>
  );
}

export default AdminDashboard;