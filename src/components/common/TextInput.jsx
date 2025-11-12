import React from "react";
import { Field, ErrorMessage } from "formik";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const TextInput = ({
  label,
  name,
  type = "text",
  placeholder,
  readOnly = false,
  showPassword,
  togglePasswordVisibility,
  isRequired = false,
}) => {
  const handleKeyDown = (event) => {
    if (type === "number") {
      const allowedKeys = [
        "Backspace",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
        "Tab",
        "Enter",
      ];

      if (!/[0-9]/.test(event.key) && !allowedKeys.includes(event.key)) {
        event.preventDefault();
      }
    }
  };
  return (
    <div className="w-full">
      <label className="text-[16px] text-black whitespace-nowrap">
        {label}
        {isRequired && (
          <span className="text-red text-[18px] pl-1">*</span>
        )}{" "}
      </label>
      <div className="relative">
        <Field
          name={name}
          readOnly={readOnly}
          type={
            type === "password" && showPassword !== undefined
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          min={type === "number" ? 0 : undefined}
          onKeyDown={handleKeyDown}
          className={`block w-full border-[1px] border-[#abaaaa] text-black bg-white rounded-[4px] px-[16px] py-[10px] appearance-none mt-[5px] focus:outline-none `}
          placeholder={placeholder}
        />
        {type === "password" && togglePasswordVisibility && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-[16px] top-[50%] translate-y-[-50%] cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible className="w-[22px] h-[22px] text-primary" />
            ) : (
              <AiOutlineEye className="w-[22px] h-[22px] text-primary" />
            )}
          </div>
        )}
      </div>
      <ErrorMessage name={name} component="div" className="text-red text-sm" />
    </div>
  );
};

export default TextInput;
