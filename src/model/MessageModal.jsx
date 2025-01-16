import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import CHECK from "../assets/Images/check.png";
import ERROR from "../assets/Images/Error.webp";
import React from "react";
import Button from "../components/common/Button";

function MessageModal({
  open,
  setOpen,
  title = "All Set!",
  message,
  isSuccess = true,
  buttonText = "Done",
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-[#0000004d] transition-opacity duration-300 ease-out"
        />

        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-[90%] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="bg-white sm:p-[40px] p-[24px]">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <div className="flex justify-center">
                  <img
                    src={isSuccess ? CHECK : ERROR}
                    alt="Status icon"
                    className="w-full max-w-[75px]"
                  />
                </div>
                <DialogTitle
                  as="h3"
                  className={`text-[24px] font-bold text-primary mb-[32px] mt-[25px] text-center`}
                >
                  {title}
                </DialogTitle>
                <div className="mt-2">
                  <p className="sm:text-[24px] text-[18px] font-normal text-gray-500 mb-[52px] text-center">
                    {message}
                  </p>
                </div>
                <div className="flex justify-center">
                  <Button
                    onClick={() => setOpen(false)}
                    text={buttonText}
                    className={`text-[20px] font-bold text-white max-w-[174px] w-full h-[45px] bg-primary rounded-lg`}
                  />
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

export default MessageModal;
