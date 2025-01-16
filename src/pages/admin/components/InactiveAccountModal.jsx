import React, { useState } from "react";

function InactiveAccountModal({ open, userId, setRemarks }) {
  const [isOpen, setIsOpen] = useState(open);
  const [remark, setRemark] = useState("");

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    setRemarks((prevRemarks) => {
      const remarksArray = prevRemarks || [];

      const index = remarksArray.findIndex((item) => item.id === userId.userId);

      if (index !== -1) {
        const updatedRemarks = [...remarksArray];
        updatedRemarks[index] = { ...updatedRemarks[index], remark: remark };
        return updatedRemarks;
      } else {
        return [...remarksArray, { id: userId.userId, remark }];
      }
    });

    handleClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-[#252525] bg-opacity-60 transition-opacity flex justify-center items-center lg:ml-[280px]">
        <div className="bg-white rounded-lg shadow-lg w-1/3">
          <div className="p-4 border-b">
            <h2 className="text-gray-700 font-semibold">
              Inactive Application
            </h2>
          </div>
          <div className="p-4">
            <textarea
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Write your Remarks here..."
              rows={5}
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
            <p className="mt-2 text-gray-600 text-sm">
              <strong>Note:</strong> The account will be inactive now, and a
              registration email notification will be sent to the respective
              person immediately.
            </p>
          </div>
          <div className="p-4 border-t flex justify-end space-x-2">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className={`${
                userId.status ? "bg-primary" : "!bg-red"
              } !text-white px-4 py-2 rounded hover:bg-red-700`}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default InactiveAccountModal;
