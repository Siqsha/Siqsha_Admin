import React from "react";
import { VscClose } from "react-icons/vsc";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

function StartModel({ open, onClose }) {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        className="relative z-10"
        id="exampleModal"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-[#0000004d] transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <DialogPanel
            transition
            className="relative transform overflow-hidden bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full max-w-[1056px] data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="flex justify-between items-center sm:p-[21px_33px] p-[11px] border-b border-b-[#ACACAC]">
              <h1 className="sm:text-[22px] text-[14px] font-normal text-black">
                Get Started Now!
              </h1>
              <VscClose
                data-twe-target="#exampleModal"
                className="w-[24px] h-[24px] text-black cursor-pointer"
                onClick={onClose}
              />
            </div>
            <div className="sm:p-[33px] p-[11px_11px_33px_11px]">
              <p className="text-[28px] text-secondary2 font-normal">
                Please log in and subscribe to chat with a teacher, join a
                class, and enjoy your journey
              </p>
              <div className="flex sm:justify-end justify-center sm:gap-[22px] gap-[12px] mt-[31px]">
                <button
                  type="button"
                  className="border-[2px] border-[#002060] text-primary hover:bg-primary w-full max-w-[139px] sm:h-[71px] h-[33px] flex items-center justify-center sm:text-[22px] text-[14px] font-bold hover:text-white rounded-[4px]"
                >
                  Done
                </button>
              </div>
            </div>
          </DialogPanel>
          {/* </div> */}
        </div>
      </Dialog>
    </>
  );
}

export default StartModel;
