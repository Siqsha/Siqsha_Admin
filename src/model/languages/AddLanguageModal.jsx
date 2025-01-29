import React, { useEffect, useState } from "react";
import CommonDialog from "../../components/common/CommonDialog";
import { DialogTitle } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import TextInput from "../../components/common/TextInput";
import Button from "../../components/common/Button";
import { FieldArray, Form, Formik } from "formik";
import { languageValidationSchema } from "../../utils/validationSchemas";
import { useMessageModal } from "../../contexts/MessageModalContext";
import {
  addLanguage,
  updateLanguage,
} from "../../pages/services/apis/languageApi";
import { useDispatch } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";

function AddLanguageModal({ open, setOpen, language = {} }) {
  const dispatch = useDispatch();
  const { showMessageModal } = useMessageModal();
  const [initialValues, setInitialValues] = useState({
    languages: language?.language?.name ? [language.language.name] : [""],
  });

  useEffect(() => {
    if (language?.language?.name) {
      setInitialValues({ languages: [language.language.name] });
    }
  }, [language]);

  const handleSubmit = async (values) => {
    try {
      let data;

      if (language.language?._id) {
        data = await dispatch(
          updateLanguage(language.language._id, {
            languages: values.languages[0],
          })
        );
      } else {
        data = await dispatch(addLanguage({ languages: values.languages }));
      }
      showMessageModal(data);
      setOpen(false);
    } catch (error) {
      showMessageModal({
        message: error.message || "Something went wrong",
        success: false,
      });
    }
  };

  return (
    <CommonDialog open={open} setOpen={setOpen}>
      <div className="bg-white sm:p-[16px] p-[24px]">
        <div className="flex justify-between items-start">
          <div>
            <DialogTitle
              as="h3"
              className={`text-[22px] font-bold text-primary text-center`}
            >
              {!language?.language ? "Add Language" : "Update Language"}
            </DialogTitle>
          </div>
          <button>
            <IoMdClose onClick={() => setOpen(false)} className="text-3xl" />
          </button>
        </div>
        <div className="p-4">
          <Formik
            initialValues={initialValues}
            validationSchema={languageValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, resetForm, values }) => (
              <Form>
                <FieldArray
                  name="languages"
                  render={(arrayHelpers) => (
                    <div>
                      {values.languages &&
                        values.languages.length > 0 &&
                        values.languages.map((lang, index) => (
                          <div
                            key={index}
                            className="pt-[18px] flex items-center gap-2"
                          >
                            <TextInput
                              name={`languages[${index}]`}
                              type="text"
                              placeholder="Add language"
                              className="input-field"
                              component={TextInput}
                            />
                            <div className="flex justify-center items-center">
                              {index === values.languages.length - 1 &&
                                !language?.language?.name && (
                                  <button
                                    type="button"
                                    onClick={() => arrayHelpers.push("")}
                                    className="font-medium text-primary w-[42px] h-[42px] border-2 border-[#002060] rounded-md flex justify-center items-center gap-[10px]"
                                  >
                                    <FaPlus className="text-[20px] w-[20px] h-[20px]" />
                                  </button>
                                )}
                            </div>
                            {values.languages.length > 1 &&
                              !language?.language?.name && (
                                <button
                                  type="button"
                                  className="font-medium text-red w-[47px] h-[42px] border-2 border-red rounded-md flex justify-center items-center gap-[10px]"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  <RiDeleteBin5Line className="text-red text-2xl" />
                                </button>
                              )}
                          </div>
                        ))}
                    </div>
                  )}
                />
                <div className="pt-[20px]">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    text={!language?.language ? "Add" : "Update"}
                    className="bg-primary text-white hover:bg-[#466cb7] w-full"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </CommonDialog>
  );
}

export default AddLanguageModal;
