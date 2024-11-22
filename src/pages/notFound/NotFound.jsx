import React from "react";
import PAGEFOUND from "../../assets/Images/PageFound.png";
import ELLIPSE1 from "../../assets/Images/Ellipse1.png";
import ELLIPSE2 from "../../assets/Images/Ellipse2.png";
import ELLIPSE3 from "../../assets/Images/Ellipse3.png";
import ELLIPSE4 from "../../assets/Images/Ellipse4.png";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const handleBackHome = () => {
    navigate("/admin/dashboard");
  };
  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-blue-100">
        <img
          src={ELLIPSE1}
          alt=""
          className="absolute top-0 left-0 lg:max-w-[288px] sm:max-w-[200px] max-w-[160px]"
        />
        <img
          src={ELLIPSE4}
          alt=""
          className="absolute top-0 right-0 md:block hidden"
        />
        <img
          src={ELLIPSE3}
          alt=""
          className="absolute bottom-0 left-0 md:block hidden"
        />
        <img
          src={ELLIPSE2}
          alt=""
          className="absolute bottom-0 right-0 lg:max-w-[292px] sm:max-w-[200px] max-w-[160px]"
        />

        <div className="">
          <img
            src={PAGEFOUND}
            alt="404 Error"
            className="sm:max-w-[448px] max-w-[250px] m-auto"
          />

          <div className="text-center flex justify-center items-center flex-col p-[16px]">
            <h1 className="sm:text-[22px] text-[18px] text-primary font-normal sm:mb-[20px] mb-[10px] text-center">
              Sorry Page Not Found
            </h1>
            <p className="sm:text-[22px] text-[18px] text-primary font-normal sm:mb-[21px] mb-[11px] max-w-[477px] w-full text-center">
              You May Have Mistyped The Address Or The Page May Have Moved
            </p>

            <button
              onClick={handleBackHome}
              className="sm:text-[22px] text-[18px] text-white font-normal sm:w-[207px] w-[190px] sm:h-[52px] h-[42px] bg-primary flex justify-center items-center rounded-md transition duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
