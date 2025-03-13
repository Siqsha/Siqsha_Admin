import { DialogTitle } from "@headlessui/react";
import React, { useState } from "react";
import CheckboxInput from "../components/common/CheckboxInput";
import TextInput from "../components/common/TextInput";
import Button from "../components/common/Button";
import { IoMdClose } from "react-icons/io";
import CommonDialog from "../components/common/CommonDialog";
import { updateAndRespondeCommission } from "../pages/services/apis/userApi";
import { CommissionSchema } from "../utils/validationSchemas";
import { Form, Formik } from "formik";

function CommissionModal({ open, setOpen, selectedUser }) {
  const [data, setData] = useState();

  const initialValues = {
    commissionType: "",
    monthly: selectedUser?.monthly || 0,
    yearly: selectedUser?.yearly || 0,
    perclass: selectedUser?.perclass || 0,
    commissionRemark: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = {
        userId: selectedUser?.user?._id,
        commissionType: values.commissionType,
        commissionCharges: {
          monthly: values.monthly,
          yearly: values.yearly,
          perclass: values.perclass,
        },
        commissionRemark: values.commissionRemark,
      };

      const response = await updateAndRespondeCommission(formData);
      if (response) {
        setData(response);
        setOpen(false);
      }
      console.log("Commission submitted", response);
    } catch (error) {
      console.error("Error submitting commission:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CommonDialog open={open} setOpen={setOpen}>
      <div className="bg-white sm:p-[24px] p-[16px]">
        <div className="flex justify-between items-center pb-4">
          <div className="flex justify-center items-center flex-grow">
            <DialogTitle
              as="h3"
              className="sm:text-[22px] text-[20px] font-bold text-primary text-center mx-auto"
            >
              Commission Setup
            </DialogTitle>
          </div>
          <button onClick={() => setOpen(false)}>
            <IoMdClose className="sm:text-3xl text-2xl" />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={CommissionSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => (
            <Form>
              <div className="mb-2 h-full max-h-[632px] overflow-auto my-scroll">
                <h3 className="text-[18px] text-[#524C4C] text-center">
                  {selectedUser?.user?.firstName} {selectedUser?.user?.lastName}{" "}
                  has chosen <strong>{selectedUser?.commission}</strong>{" "}
                  commission charges.
                </h3>

                {/* Commission Type Selection */}
                <h3 className="text-[16px] text-black mt-6">
                  Commission Method
                </h3>
                <div className="flex gap-4 flex-wrap items-center mt-2 justify-between">
                  {["monthly", "yearly", "perclass"].map((type) => (
                    <div key={type} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="commissionType"
                        value={type}
                        checked={values.commissionType === type}
                        onChange={() => setFieldValue("commissionType", type)}
                        className="accent-primary w-[20px] h-[20px] rounded-[4px]"
                      />
                      <label className="text-[14px] text-[#524C4C] capitalize">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
                {touched.commissionType && errors.commissionType && (
                  <p className="text-red text-sm mt-1">
                    {errors.commissionType}
                  </p>
                )}

                {/* Commission Charges Inputs */}
                <div className="mt-6 text-[#524C4C] ">
                  {values.commissionType === "monthly" && (
                    <TextInput
                      className="!w-full "
                      label="Monthly Commission Charge"
                      name="monthly"
                      type="text"
                      value={values.monthly}
                      onChange={handleChange}
                      error={touched.monthly && errors.monthly}
                    />
                  )}
                  {values.commissionType === "yearly" && (
                    <TextInput
                      label="Yearly Commission Charge"
                      name="yearly"
                      type="text"
                      value={values.yearly}
                      onChange={handleChange}
                      error={touched.yearly && errors.yearly}
                    />
                  )}
                  {values.commissionType === "perclass" && (
                    <TextInput
                      label="Per Class Commission Charge"
                      name="perclass"
                      type="text"
                      value={values.perclass}
                      onChange={handleChange}
                      error={touched.perclass && errors.perclass}
                    />
                  )}
                </div>

                {/* Remark */}
                <div className="mt-6 ">
                  <TextInput
                    label="Remarks"
                    name="commissionRemark"
                    type="textarea"
                    rows={3}
                    placeholder="Write your Remark here..."
                    value={values.commissionRemark}
                    onChange={handleChange}
                    error={touched.commissionRemark && errors.commissionRemark}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end">
                <div className="flex justify-end items-center">
                  <Button
                    type="button"
                    text="Cancel"
                    onClick={() => setOpen(false)}
                    className="border-primary border text-primary sm:px-[28px] px-[12px] mt-2 ml-[16px] w-full"
                  />
                  <Button
                    type="submit"
                    text="Submit"
                    className="bg-primary text-white  sm:px-[28px] px-[12px] mt-2 ml-[16px] w-full"
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </CommonDialog>
  );
}

export default CommissionModal;
