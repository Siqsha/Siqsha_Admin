import React from "react";
import LOGO from "../../../assets/Images/Logo.png";
import { Link } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { CgAddR } from "react-icons/cg";

function AdminSidebar({ page }) {
  return (
    <div>
      <aside className="h-screen bg-white  fixed left-0 top-0 p-[14px_24px] whitespace-nowrap z-10 closed shadow-[0px_0px_10px_-2px_#0000003f] w-[300px] hidden lg:block">
        <div className="mb-10 flex items-center justify-between ">
          <img src={LOGO} alt="" className="max-w-[92px] w-full" />

          <button className="lg:hidden bg-gray-200 text-gray-500 rounded leading-none p-1 btn-close-menu">
            <i data-feather="chevron-left"></i>
          </button>
        </div>

        <ul className="text-gray-500 font-semibold flex flex-col gap-2">
          <Link
            to="/admin/dashboard"
            className={`rounded-[8px] p-[17px] group hover:bg-primary ${page === "dashboard"
                ? "bg-primary text-white"
                : "bg-white text-nevyblue"
              }`}
          >
            <Link to="/admin/dashboard" className="">
              <div className="flex items-center gap-[15px] hover:text-white">
                <MdOutlineSpaceDashboard className="group-hover:text-white" />
                <h1 className="mb-0  text-[16px] font-bold leading-[2%] group-hover:text-white">
                  Dashboard
                </h1>
              </div>
            </Link>
          </Link>

          <Link
            to="/admin/user-settings"
            className={`rounded-[8px] p-[17px] group hover:bg-primary ${page === "usersetting"
                ? "bg-primary text-white"
                : "bg-white text-nevyblue"
              }`}
          >
            <Link to="/admin/user-settings" className="">
              <div className="flex items-center gap-[15px] hover:text-white">
                <CgAddR className="group-hover:text-white" />
                <h1 className="mb-0 text-[16px] font-bold leading-[2%] group-hover:text-white">
                  User Settings
                </h1>
              </div>
            </Link>
          </Link>
          <Link
            className={`rounded-[8px] p-[17px] group hover:bg-primary ${page === "students"
                ? "bg-primary text-white"
                : "bg-white text-nevyblue"
              }`}
          >
            <Link to="/admin/students" className="">
              <div className="flex items-center gap-[15px] hover:text-white">
                <CgAddR className="group-hover:text-white" />
                <h1 className="mb-0 text-[16px] font-bold leading-[2%] group-hover:text-white">
                  Students
                </h1>
              </div>
            </Link>
          </Link>
          <Link
            to="/admin/teachers"
            className={`rounded-[8px] p-[17px] group hover:bg-primary ${page === "teachers"
                ? "bg-primary text-white"
                : "bg-white text-nevyblue"
              }`}
          >
            <Link to="/admin/teachers" className="">
              <div className="flex items-center gap-[15px] hover:text-white">
                <CgAddR className="group-hover:text-white" />
                <h1 className="mb-0 text-[16px] font-bold leading-[2%] group-hover:text-white">
                  Teachers
                </h1>
              </div>
            </Link>
          </Link>
          <Link
            to="/admin/approval"
            className={`rounded-[8px] p-[17px] group hover:bg-primary ${page === "approval"
                ? "bg-primary text-white"
                : "bg-white text-nevyblue"
              }`}
          >
            <Link to="/admin/approval" className="">
              <div className="flex items-center gap-[15px] hover:text-white">
                <CgAddR className="group-hover:text-white" />
                <h1 className="mb-0 text-[16px] font-bold leading-[2%] group-hover:text-white">
                  My Approvals
                </h1>
              </div>
            </Link>
          </Link>
        </ul>
      </aside>
    </div>
  );
}

export default AdminSidebar;
