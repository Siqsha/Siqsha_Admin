import React from "react";
import { FieldArray, Formik, Form } from "formik";
import SelectList from "./SelectList";
import { BiPlus } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { SkillLevel } from "../../constant/dataConstant";
import { updateStudentSkillMatrix } from "../../redux/studentProfileSlice";
import { useDispatch } from "react-redux";
import { updateTeacherSkillMatrix } from "../../redux/teacherProfileSlice";
import Button from "./Button";
import TextInput from "./TextInput";
import { skillMeticsValidation } from "../../utils/validationSchemas";

const SkillMatrixForm = ({
  initialValues,
  handleSubmit,
  handleTabChange,
  active,
  role,
}) => {
  const dispatch = useDispatch();

  const handleAddSkill = (values, newSkill) => {
    if (role === "student") {
      dispatch(updateStudentSkillMatrix([...values.skillMatrix, newSkill]));
    } else if (role === "teacher") {
      dispatch(updateTeacherSkillMatrix([...values.skillMatrix, newSkill]));
    }
  };

  const handleRemoveSkill = (values, index) => {
    if (role === "student") {
      dispatch(
        updateStudentSkillMatrix(
          values.skillMatrix.filter((_, i) => i !== index)
        )
      );
    } else if (role === "teacher") {
      dispatch(
        updateTeacherSkillMatrix(
          values.skillMatrix.filter((_, i) => i !== index)
        )
      );
    }
  };

  return (
    <Formik
      initialValues={{
        ...initialValues,
        skillMatrix: initialValues.skillMatrix.length
          ? initialValues.skillMatrix
          : [{ category: "", subcategory: "", skillLevel: "" }],
      }}
      onSubmit={handleSubmit}
      validationSchema={skillMeticsValidation}
    >
      {({ values, setFieldValue, errors, touched, isSubmitting }) => (
        <Form>
          <FieldArray name="skillMatrix">
            {({ push, remove }) => (
              <div className="sm:p-[30px] p-[12px]">
                <div className="px-[15px]">
                  {values.skillMatrix.map((skill, index) => (
                    <div>
                      {/* <div className="text-lightgray1 font-medium pt-[15px]">
                        {values.skillMatrix[index]?.subcategory
                          ? values.skillMatrix[index]?.subcategory
                          : `Skill ${index + 1}`}
                      </div> */}
                      <div className="mt-5" key={index}>
                        <div className="flex justify-end items-center">
                          <div className="flex justify-center items-start">
                            <div className="flex justify-end gap-3 items-center ">
                              {values.skillMatrix.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    remove(index);
                                    handleRemoveSkill(values, index);
                                  }}
                                  className="text-red bg-white border-red border-2 w-[46px] h-[46px] rounded-md flex justify-center items-center"
                                >
                                  <RiDeleteBinLine className="text-[20px]" />
                                </button>
                              )}
                              {index === values.skillMatrix.length - 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newSkill = {
                                      category: "",
                                      subcategory: "",
                                      skillLevel: "",
                                    };
                                    push(newSkill);
                                    handleAddSkill(values, newSkill);
                                  }}
                                  className="font-medium text-primary w-[45px] h-[45px] border-2 border-[#002060] rounded-md flex justify-center items-center gap-[10px]"
                                >
                                  <BiPlus className="text-[24px] w-[24px] h-[24px]" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between gap-3 items-end">
                          <div className="grid md:grid-cols-3 grid-cols-1 sm:gap-[27px] gap-[16px] w-full">
                            <TextInput
                              label="Category"
                              name={`skillMatrix.${index}.category`}
                              placeholder="Enter Category"
                              isRequired={true}
                            />
                            <div>
                              <TextInput
                                label="Subcategory"
                                name={`skillMatrix.${index}.subcategory`}
                                placeholder="Enter Subcategory"
                                isRequired={true}
                              />
                            </div>
                            <div className="relative">
                              <SelectList
                                label={`Skill Level`}
                                options={SkillLevel}
                                value={skill.skillLevel}
                                onChange={(e) => {
                                  setFieldValue(
                                    `skillMatrix.${index}.skillLevel`,
                                    e
                                  );
                                }}
                                name={`skillMatrix.${index}.skillLevel`}
                                placeholder="Select Skill Level"
                                error={
                                  errors.skillMatrix?.[index]?.skillLevel &&
                                  touched.skillMatrix?.[index]?.skillLevel
                                }
                                isRequired={true}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </FieldArray>
          <div className="flex justify-end sm:gap-[22px] gap-[12px] sm:p-[30px] p-[12px] pb-8">
            <Button
              onClick={() => handleTabChange(active, "backward")}
              text="Previous"
              className="border-primary border-[2px] text-primary sm:px-[28px] px-[16px]"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              text="Save & Next"
              className="bg-primary text-white hover:bg-[#466cb7] sm:px-[28px] px-[16px]"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SkillMatrixForm;
