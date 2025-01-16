import React, { useState } from "react";
import * as Yup from "yup";
import CommonPart from "../../../components/CommonPart";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { login } from "../../services/apis/authentication";
import TextInput from "../../../components/common/TextInput";
import Button from "../../../components/common/Button";
import { useMessageModal } from "../../../contexts/MessageModalContext";

const text = "Very Good work are waiting for you Login Now !!!";

function Login() {
  const navigate = useNavigate();
  const { showMessageModal } = useMessageModal();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleSubmit = async (values) => {
    try {
      const formData = {
        role: "admin",
        email: values.email,
        password: values.password,
      };
      const response = await login(formData);
      if (response) {
        if (response.success) {
          localStorage.setItem("authToken", response.token);
        }

        const navigateToDashboard = () => {
          if (response.success) {
            navigate("/admin/dashboard");
          }
        };

        showMessageModal(response, navigateToDashboard);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="md:flex h-full min-h-screen ">
      <CommonPart text={text} />
      <div className="flex md:mx-auto py-[50px] px-[27px] md:w-1/2 h-screen overflow-auto">
        <div className="flex justify-center items-center  lg:max-w-[450px] xl:max-w-[642px] w-full m-auto ">
          <div className="w-full bg-white shadow-[0px_0px_12px_#5c5ca133]">
            <div className="px-[20px] md:px-[20px] lg:px-[26px] xl:px-[56px] py-[34px]">
              <h1 className="sm:text-[38px] text-[26px] font-bold text-center pb-[18px]">
                Welcome
              </h1>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, resetForm }) => (
                  <Form>
                    <div className="flex items-center my-4 ">
                      <div className="flex-grow border-t border-gray-300"></div>
                      {/* <span className="text-[10px] xl:text-[16px] text-gray1 font-medium text-center mt-[0px]">
                        OR LOGIN WITH EMAIL
                      </span> */}
                      <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <div className="pt-[18px]">
                      <TextInput
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="Username or email address"
                        isRequired={true}
                      />
                    </div>

                    <div className="pt-[18px]">
                      <TextInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        showPassword={showPassword}
                        togglePasswordVisibility={togglePasswordVisibility}
                        isRequired={true}
                      />
                    </div>

                    {/* <div className="pt-[38px] flex items-center justify-between w-full gap-[5px]">
                      <div className="flex items-center gap-[10px]">
                        <input
                          type="checkbox"
                          className="w-[22px] h-[22px] rounded-[4px] bg-primary flex justify-center items-center accent-primary "
                        />
                        <p className="text-gray1 text-[12px] md:text-[16px] whitespace-nowrap">
                          Remember me
                        </p>
                      </div>
                    </div> */}

                    <div className="md:pt-[59.22px] pt-[27px]">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        text="Login"
                        className="bg-primary text-white hover:bg-[#466cb7] w-full"
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
