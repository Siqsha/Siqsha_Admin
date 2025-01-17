import React from "react";
import Sidebar from "../header/Sidebar";
import Navbar from "../header/Navbar";

const CommonLayout = ({ title, children }) => {
  return (
    <>
      <div className="flex justify-end">
        <Sidebar />
        <div className="xl:!w-[calc(100%-301px)] w-full">
          <Navbar />
          <div className="md:p-[34px_45px] sm:p-[25px_35px] p-[16px] h-[calc(100%-280px)]">
            {title && (
              <h1 className="text-[30px] font-medium text-nevyblue">{title}</h1>
            )}
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommonLayout;
