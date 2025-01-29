import React from "react";

const Button = ({
  type = "button",
  onClick,
  disabled = false,
  text,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`h-[52px] sm:text-[20px] text-[20px] font-bold rounded-[6px]  ${className}`}
    >
      {disabled ? (
        <div className="flex items-center justify-center space-x-2 opacity-90">
          <div className="w-[1.5rem] h-[1.5rem] border-4 border-t-transparent border-white border-solid rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
