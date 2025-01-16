import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ErrorMessage } from "formik";

const CustomTimePicker = ({ label, name, value, onChange, isRequired }) => {
  return (
    <div className="flex flex-col">
      <label className="text-[16px] text-black ">
        {label}
        {isRequired && (
          <span className="text-red text-[18px] pl-1">*</span>
        )}{" "}
      </label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          value={value}
          onChange={onChange}
          inputProps={{
            placeholder: "HH:mm",
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="HH:mm"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #abaaaa",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #abaaaa",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #abaaaa",
                  },
                  "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #abaaaa",
                  },
                },
                "& .MuiFormHelperText-root": {
                  color: "red",
                },
              }}
            />
          )}
        />
      </LocalizationProvider>
      <ErrorMessage name={name} component="div" className="text-red text-sm" />
    </div>
  );
};

export default CustomTimePicker;
