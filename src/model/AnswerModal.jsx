// import React, { useState } from "react";
// import { Dialog, DialogTitle, Button, Textarea } from "@headlessui/react";

// function AnswerModal({ open, onClose, review, onSubmit }) {
//   const [answer, setAnswer] = useState("");

//   const handleSubmit = () => {
//     if (!answer.trim()) return;
//     onSubmit(review._id, answer);
//     setAnswer("");
//     onClose();
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       className="relative z-50"
//     >
//       {/* Backdrop */}
//       <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

//       {/* Modal container */}
//       <div className="fixed inset-0 flex items-center justify-center p-4">
//         <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
//           <DialogTitle
//             as="h3"
//             className="text-2xl font-bold text-gray-900 mb-4 text-center"
//           >
//             Respond to Review
//           </DialogTitle>

//           <p className="mb-4 text-gray-600">{review?.feedback}</p>

//           <Textarea
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//             placeholder="Write your response..."
//             className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             rows={4}
//           />

//           <div className="flex justify-end gap-3">
//             <Button
//               onClick={onClose}
//               className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleSubmit}
//               className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Submit
//             </Button>
//           </div>
//         </Dialog.Panel>
//       </div>
//     </Dialog>
//   );
// }

// export default AnswerModal;

import React from "react";
import { Dialog, DialogTitle } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addReviews } from "../pages/services/apis/reviews";

function AnswerModal({ open, onClose, review, onSubmit }) {
  const validationSchema = Yup.object({
    answer: Yup.string().required("Feedback is required"),
  });

  const handleSubmitAnswer = async (values, { setSubmitting, resetForm }) => {
    try {
      const data = { reviewId: review._id, answer: values.answer };
      await addReviews(data);
      onSubmit(review._id, values.answer);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
          <DialogTitle className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Respond to Review
          </DialogTitle>

          <p className="mb-4 text-gray-600">{review?.answer}</p>

          <Formik
            initialValues={{ answer: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmitAnswer}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="answer"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Feedback
                  </label>
                  <Field
                    name="answer"
                    as="textarea"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows="4"
                    placeholder="Write down your answer here..."
                  />
                  <ErrorMessage
                    name="answer"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-800 bg-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default AnswerModal;
