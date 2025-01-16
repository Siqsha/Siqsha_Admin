import React from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

const CommonDialog = ({ open, setOpen, children }) => {
  return (
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
          className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-[90%] sm:max-w-[700px]  data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in`}
        >
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CommonDialog;
