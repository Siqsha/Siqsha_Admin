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
        console.log("data", data);
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
              className={`text-[22px] font-bold text-primary mb-[32px] text-center`}
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
                        values.languages.map((language, index) => (
                          <div key={index} className="pt-[18px]">
                            <TextInput
                              name={`languages[${index}]`}
                              type="text"
                              placeholder="Add language"
                              className="input-field"
                              component={TextInput}
                            />
                            {values.languages.length > 1 && (
                              <button
                                type="button"
                                className="text-red-600 ml-2"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        ))}

                      {!language?.language && (
                        <div className="md:pt-[59.22px] pt-[27px]">
                          <Button
                            type="button"
                            onClick={() => arrayHelpers.push("")}
                            text="Add Language"
                            className="bg-primary text-white hover:bg-[#466cb7] w-full"
                          />
                        </div>
                      )}
                    </div>
                  )}
                />
                <div className="md:pt-[59.22px] pt-[27px]">
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
