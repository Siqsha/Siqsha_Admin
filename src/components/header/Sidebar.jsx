import React from "react";
import LOGO from "../../assets/Images/Logo.png";
import { NavLink } from "react-router-dom";
import { MdOutlineRateReview, MdOutlineSpaceDashboard } from "react-icons/md";
// import { CgAddR } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineCreditCard, HiOutlineUserGroup } from "react-icons/hi";
import { BsFileEarmarkCheck } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { GiReceiveMoney } from "react-icons/gi";

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
              <HiOutlineUserGroup className="group-hover:text-white text-2xl" />
              <h1 className="mb-0 text-[16px] font-bold leading-[2%] group-hover:text-white">
                Users
              </h1>
            </div>
          </NavLink>

          {/* <NavLink
            to="/admin/admanagement"
            className={({ isActive }) =>
              `rounded-[8px] p-[17px] group hover:bg-primary ${
                isActive ? "bg-primary text-white" : "bg-white text-nevyblue"
              }`
            }
          >
            <div className="flex items-center gap-[15px] hover:text-white">
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                fill="currentColor"
                className="group-hover:text-white mi-solid mi-window-dock-undock"
                viewBox="0 0 24 24"
              >
                <path d="M7 4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h14c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm13 10H8V7h12zm-4 4H4V8H3c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1z" />
              </svg>
              <h1 className="mb-0  text-[16px] font-bold leading-[2%] group-hover:text-white">
                Ad Management
              </h1>
            </div>
          </NavLink> */}

          <NavLink
            to="/admin/myapproval"
            className={({ isActive }) =>
              `rounded-[8px] p-[17px] group hover:bg-primary ${
                isActive ? "bg-primary text-white" : "bg-white text-nevyblue"
              }`
            }
          >
            <div className="flex items-center gap-[15px] hover:text-white">
              <BsFileEarmarkCheck className="group-hover:text-white text-2xl" />
              <h1 className="mb-0  text-[16px] font-bold leading-[2%] group-hover:text-white">
                My Approvals
              </h1>
            </div>
          </NavLink>

          {/* <NavLink
            to="/admin/request"
            className={({ isActive }) =>
              `rounded-[8px] p-[17px] group hover:bg-primary ${
                isActive ? "bg-primary text-white" : "bg-white text-nevyblue"
              }`
            }
          >
            <div className="flex items-center gap-[15px] hover:text-white">
              <HiOutlineCreditCard className="group-hover:text-white text-2xl" />
              <h1 className="mb-0  text-[16px] font-bold leading-[2%] group-hover:text-white">
                My Approvals
              </h1>
            </div>
          </NavLink> */}

          <NavLink
            to="/admin/coupon"
            className={({ isActive }) =>
              `rounded-[8px] p-[17px] group hover:bg-primary ${
                isActive ? "bg-primary text-white" : "bg-white text-nevyblue"
              }`
            }
          >
            <div className="flex items-center gap-[15px] hover:text-white">
              <HiOutlineCreditCard className="group-hover:text-white text-2xl" />
              <h1 className="mb-0  text-[16px] font-bold leading-[2%] group-hover:text-white">
                Coupon Management
              </h1>
            </div>
          </NavLink>

          {/* <NavLink
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
          </NavLink> */}

          <NavLink
            to="/admin/review"
            className={({ isActive }) =>
              `rounded-[8px] p-[17px] group hover:bg-primary ${
                isActive ? "bg-primary text-white" : "bg-white text-nevyblue"
              }`
            }
          >
            <div className="flex items-center gap-[15px] hover:text-white">
              <MdOutlineRateReview className="group-hover:text-white text-2xl" />
              <h1 className="mb-0 text-[16px] font-bold leading-[2%] group-hover:text-white">
                Feedback
              </h1>
            </div>
          </NavLink>

          <NavLink
            to="/admin/financial"
            className={({ isActive }) =>
              `rounded-[8px] p-[17px] group hover:bg-primary ${
                isActive ? "bg-primary text-white" : "bg-white text-nevyblue"
              }`
            }
          >
            <div className="flex items-center gap-[15px] hover:text-white">
              <FaHandHoldingDollar className="group-hover:text-white text-2xl" />
              <h1 className="mb-0 text-[16px] font-bold leading-[2%] group-hover:text-white">
                Financial
              </h1>
            </div>
          </NavLink>

          <NavLink
            to="/admin/invoice"
            className={({ isActive }) =>
              `rounded-[8px] p-[17px] group hover:bg-primary ${
                isActive ? "bg-primary text-white" : "bg-white text-nevyblue"
              }`
            }
          >
            <div className="flex items-center gap-[15px] hover:text-white">
              <LiaFileInvoiceDollarSolid className="group-hover:text-white text-2xl" />
              <h1 className="mb-0 text-[16px] font-bold leading-[2%] group-hover:text-white">
                Invoice
              </h1>
            </div>
          </NavLink>

          <NavLink
            to="/admin/commission"
            className={({ isActive }) =>
              `rounded-[8px] p-[17px] group hover:bg-primary ${
                isActive ? "bg-primary text-white" : "bg-white text-nevyblue"
              }`
            }
          >
            <div className="flex items-center gap-[15px] hover:text-white">
              <GiReceiveMoney className="group-hover:text-white text-2xl" />
              <h1 className="mb-0  text-[16px] font-bold leading-[2%] group-hover:text-white">
                Commission
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
