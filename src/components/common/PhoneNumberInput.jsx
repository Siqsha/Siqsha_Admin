import React from "react";
import { ErrorMessage } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneNumberInput = ({
  label,
  name,
  value,
  onChange,
  placeholder = "Enter phone number",
  country = "us",
  error,
  isRequired,
}) => {
  return (
    <div className="w-full">
      <label className="text-[16px] font-normal text-black">
        {label}
        {isRequired && (
          <span className="text-red text-[18px] pl-1">*</span>
        )}{" "}
      </label>
      <div className="flex w-full border-0 border-gray-300 rounded-[4px] mt-[5px]">
        <PhoneInput
          country={country}
          value={value}
          onChange={(phone) => onChange(name, phone)}
          placeholder={placeholder}
          inputStyle={{
            width: "100%",
            height: "42px",
            padding: "12px 16px 12px 50px",
            borderRadius: "4px",
            border: "1px solid #d1d5db",
          }}
          dropdownStyle={{
            borderRadius: "4px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
          searchPlaceholder="Search for a country"
          enableSearch={true}
        />
      </div>
      {error && (
        <ErrorMessage
          name={name}
          component="div"
          className="text-red text-sm mt-1"
        />
      )}
    </div>
  );
};

export default PhoneNumberInput;
