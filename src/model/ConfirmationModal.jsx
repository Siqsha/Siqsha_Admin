import React from "react";
import Button from "../components/common/Button";
import CommonDialog from "../components/common/CommonDialog";

function ConfirmationModal({
  open,
  setOpen,
  title,
  handleConfirmClick,
  loader = false,
}) {
  return (
    <div>
      <CommonDialog open={open} setOpen={setOpen}>
        <div className="sm:p-[33px] p-[11px_11px_33px_11px]">
          <p className="text-[22px] font-normal text-center text-gray-800">
            {title}
          </p>
          <div className="flex justify-center gap-[12px] mt-[30px]">
            <Button
              onClick={() => setOpen(false)}
              text="No"
              className="bg-primary text-white hover:bg-[#466cb7] sm:px-[28px] px-[16px]"
            />
            <Button
              onClick={handleConfirmClick}
              type="button"
              text={
                loader ? (
                  <div className="flex items-center justify-center space-x-2 opacity-90">
                    <div className="w-[1.5rem] h-[1.5rem] border-4 border-t-transparent border-white border-solid rounded-full animate-spin" />
                    <span>Loading...</span>
                  </div>
                ) : (
                  "Yes"
                )
              }
              className="bg-primary text-white hover:bg-[#466cb7] sm:px-[28px] px-[16px]"
              disabled={loader}
            />
          </div>
        </div>
      </CommonDialog>
    </div>
  );
}

export default ConfirmationModal;
