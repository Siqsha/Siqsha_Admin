import React from "react";
import { Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerInput = ({ label, name, isRequired = false }) => (
  <div className="w-full flex  flex-col">
    <label className="text-[16px] text-black">
      {label}
      {isRequired && <span className="text-red text-[18px] pl-1">*</span>}
    </label>
    <Field name={name}>
      {({ field, form }) => {
        const { setFieldValue } = form;
        const { value } = field;

        return (
          <DatePicker
            selected={value ? new Date(value) : null}
            onChange={(date) => setFieldValue(name, date)}
            className="block w-full border-[1px] border-secondary2 text-black bg-white rounded-[4px] px-[16px] py-[10px] appearance-none mt-[5px] focus:outline-none"
            placeholderText="Select Date"
            dateFormat="dd-MM-yyyy"
          />
        );
      }}
    </Field>
    <ErrorMessage name={name} component="div" className="text-red text-sm" />
  </div>
);

export default DatePickerInput;
