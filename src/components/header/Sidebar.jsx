import React from "react";
import LOGO from "../../assets/Images/Logo.png";
import { NavLink } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { CgAddR } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";

function Sidebar() {
  return (
    <div>
      <aside className="h-screen bg-white  fixed left-0 top-0 p-[14px_24px] whitespace-nowrap z-10 closed shadow-[0px_0px_10px_-2px_#0000003f] w-[300px] hidden xl:block">
        <div className="mb-10 flex items-center justify-between ">
          <img src={LOGO} alt="" className="max-w-[92px] w-full" />

          <button className="xl:hidden bg-gray-200 text-gray-500 rounded leading-none p-1 btn-close-menu">
            <i data-feather="chevron-left"></i>
          </button>
        </div>

        <div className="text-gray-500 font-semibold flex flex-col gap-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `rounded-[8px] p-[17px] group hover:bg-primary ${
                isActive ? "bg-primary text-white" : "bg-white text-nevyblue"
              }`
            }
          >
            <div className="flex items-center gap-[15px] hover:text-white">
              <MdOutlineSpaceDashboard className="group-hover:text-white text-2xl" />
              <h1 className="mb-0  text-[16px] font-bold leading-[2%] group-hover:text-white">
                Dashboard
              </h1>
            </div>
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `rounded-[8px] p-[17px] group hover:bg-primary ${
                isActive ? "bg-primary text-white" : "bg-white text-nevyblue"
              }`
            }
          >
            <div className="flex items-center gap-[15px] hover:text-white">
              <FaUsers className="group-hover:text-white text-2xl" />
              <h1 className="mb-0 text-[16px] font-bold leading-[2%] group-hover:text-white">
                Users
              </h1>
            </div>
          </NavLink>

          {/* <NavLink
            to="/admin/commission"
            className={({ isActive }) =>
              `rounded-[8px] p-[17px] group hover:bg-primary ${
                isActive ? "bg-primary text-white" : "bg-white text-nevyblue"
              }`
            }
          >
            <div className="flex items-center gap-[15px] hover:text-white">
              <IoSettingsOutline className="group-hover:text-white text-2xl" />
              <h1 className="mb-0  text-[16px] font-bold leading-[2%] group-hover:text-white">
                Commission
              </h1>
            </div>
          </NavLink> */}

          <NavLink
            to="/admin/teacherlist"
            className={({ isActive }) =>
              `rounded-[8px] p-[17px] group hover:bg-primary ${
                isActive ? "bg-primary text-white" : "bg-white text-nevyblue"
              }`
            }
          >
            <div className="flex items-center gap-[15px] hover:text-white">
              <FiUsers className="group-hover:text-white text-2xl" />
              <h1 className="mb-0 text-[16px] font-bold leading-[2%] group-hover:text-white">
                Teachers
              </h1>
            </div>
          </NavLink>

          <NavLink
            to="/admin/setting"
            className={({ isActive }) =>
              `rounded-[8px] p-[17px] group hover:bg-primary ${
                isActive ? "bg-primary text-white" : "bg-white text-nevyblue"
              }`
            }
          >
            <div className="flex items-center gap-[15px] hover:text-white">
              <IoSettingsOutline className="group-hover:text-white text-2xl" />
              <h1 className="mb-0  text-[16px] font-bold leading-[2%] group-hover:text-white">
                Setting
              </h1>
            </div>
          </NavLink>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
