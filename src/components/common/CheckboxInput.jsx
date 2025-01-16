import React from "react";
import { Field, ErrorMessage } from "formik";

const CheckboxInput = ({ label, name, isRequired = false }) => {
  return (
    <div className="w-full flex gap-3 items-center">
      <Field
        type="checkbox"
        name={name}
        className="w-full h-full min-w-[22px] min-h-[22px] rounded-[4px] bg-primary flex justify-center items-center accent-primary"
      />
      <label className=" whitespace-nowrap">
        {label}
        {isRequired && <span className="text-red text-[18px] pl-1">*</span>}
      </label>
      <ErrorMessage name={name} component="div" className="text-red text-sm" />
    </div>
  );
};

export default CheckboxInput;
