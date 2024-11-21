import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { setupUserRole } from "../services/apis/authentication";
import SelectList from "../components/common/SelectList";
import { Role } from "../constant/dataConstant";
import { useModal } from "../contexts/ModelContext";

const validationSchema = Yup.object({
  role: Yup.string().required("Please select a role"),
});

function RoleModel({ open, setOpen }) {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const updateRole = async (values) => {
    const { role } = values;

    if (!role) {
      toast.error("Please select a role");
      return;
    }

    try {
      const formData = {
        role: role,
        email: localStorage.getItem("userEmail"),
      };
      const data = await setupUserRole(formData);
      if (data) {
        if (data.success) {
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("role", data.role);
        }

        const navigateToRoleBasedPage = () => {
          if (data.success) {
            if (data.user.role === "student") {
              navigate("/student/profile");
            } else if (data.user.role === "teacher") {
              navigate("/teacher/profile");
            } else if (data.user.role === "admin") {
              navigate("/admin/dashboard");
            }
          }
        };

        localStorage.removeItem("userEmail");
        showModal(data, navigateToRoleBasedPage);
        setOpen(false);
      }
    } catch (error) {
      console.error("Error setting up role:", error);
      toast.error("Error setting up role.");
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={() => {}} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-[#0000004d] transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full max-w-[600px] data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white p-[104px_80px_87px_80px]">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-[24px] font-bold text-black mb-[32px] mt-[25px] text-center"
                  >
                    Setup Role
                  </DialogTitle>

                  <Formik
                    initialValues={{ role: "" }}
                    onSubmit={updateRole}
                    validationSchema={validationSchema}
                  >
                    {({ values, setFieldValue, errors, touched }) => (
                      <Form>
                        <div className="mt-2 mb-[52px]">
                          <SelectList
                            label="Select Role"
                            options={Role}
                            value={values.role}
                            onChange={(value) => setFieldValue("role", value)}
                            name="role"
                            error={touched.role && errors.role}
                          />
                        </div>

                        <div className="flex justify-center mt-8">
                          <button
                            type="submit"
                            className="text-[20px] font-bold text-white max-w-[174px] w-full h-[45px] bg-primary rounded-lg"
                          >
                            Set
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default RoleModel;
