import React, { useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import CommonPart from "../../../components/CommonPart";
import google from "../../../assets/Images/google_logo.png";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { login, loginWithGoogle } from "../../services/apis/authentication";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import TextInput from "../../../components/common/TextInput";
import Button from "../../../components/common/Button";
import { useModal } from "../../../contexts/ModelContext";

const text = "Very Good work are waiting for you Login Now !!!";

function Login() {
  const navigate = useNavigate();
  const { showModal } = useModal();
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

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("userEmail", user.email);
      const formData = {
        email: user.email,
        displayName: user.displayName || "",
        picture: user.photoURL || "",
        uid: user.uid,
      };

      const data = await loginWithGoogle(formData);
      showModal(data);
      if (data) {
        if (data.success) {
          localStorage.setItem("authToken", data.token);
        }

        const navigateToDashboard = () => {
          if (data.success) {
            navigate("/admin/dashboard");
          }
        };

        showModal(data, navigateToDashboard);
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

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

        showModal(response, navigateToDashboard);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="md:flex h-full min-h-screen bg-gray1">
      <CommonPart text={text} />
      <div className="md:mx-auto py-[50px] px-[27px] md:w-1/2 h-screen overflow-auto">
        <div className="flex justify-center items-center  lg:max-w-[450px] xl:max-w-[642px] w-full m-auto ">
          <div className="w-full bg-white shadow-[0px_0px_12px_#5c5ca133]">
            <div className="px-[20px] md:px-[20px] lg:px-[26px] xl:px-[56px] py-[34px]">
              <h1 className="sm:text-[38px] text-[26px] font-bold text-center pb-[18px]">
                Welcome
              </h1>
              <div className="border-primary border-[2px] flex justify-center items-center w-full gap-[10px]">
                <img src={google} alt="" className="w-[42px] h-[42px]" />
                <button
                  onClick={googleLogin}
                  className="lg:text-[13px] md:text-[16px] text-[14px] text-black text-center py-[15px] whitespace-nowrap"
                >
                  Login with Google
                </button>
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, resetForm }) => (
                  <Form>
                    <div className="flex items-center my-4 gap-2">
                      <div className="flex-grow border-t border-gray-300"></div>
                      <span className="text-[10px] xl:text-[16px] text-gray1 font-medium text-center mt-[0px]">
                        OR LOGIN WITH EMAIL
                      </span>
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

                    <div className="pt-[38px] flex items-center justify-between w-full gap-[5px]">
                      <div className="flex items-center gap-[10px]">
                        <input
                          type="checkbox"
                          className="w-[22px] h-[22px] rounded-[4px] bg-primary flex justify-center items-center accent-primary "
                        />
                        <p className="text-gray1 text-[12px] md:text-[16px] whitespace-nowrap">
                          Remember me
                        </p>
                      </div>
                      <p className="text-red text-[12px] md:text-[16px] whitespace-nowrap">
                        <Link to="/forgot-password">Forgot Password ?</Link>
                      </p>
                    </div>

                    <div className="md:pt-[59.22px] pt-[27px]">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        text="Login"
                        className="bg-primary text-white hover:bg-[#466cb7] w-full"
                      />
                    </div>
                    <div className="pt-[19.78px]">
                      <Button
                        onClick={() => resetForm()}
                        text="Cancel"
                        className="border-primary border-[2px] text-primary w-full"
                      />
                    </div>
                  </Form>
                )}
              </Formik>

              <div className="pt-[33px] text-center">
                <p className="text-[14px] md:text-[16px] lg:text-[18px] text-gray1 pb-[8px]">
                  New user?
                  <span className="text-[14px] md:text-[16px] lg:text-[18px] text-primary">
                    <Link to="/signup">&nbsp; Create account</Link>
                  </span>
                </p>
                <p className="text-[14px] md:text-[16px] lg:text-[18px] text-gray1">
                  Existing user?
                  <span className="text-[14px] md:text-[16px] lg:text-[18px] text-primary">
                    <Link to="/reactive-account">
                      {" "}
                      &nbsp;Reactivate account
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;