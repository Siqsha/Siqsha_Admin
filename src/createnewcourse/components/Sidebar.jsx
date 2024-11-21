import React from "react";
import LOGO from "../../assets/Images/Logo.png";
import { Link } from "react-router-dom";
import { MdOutlineSpaceDashboard, MdOutlineMessage } from "react-icons/md";
import { CgAddR } from "react-icons/cg";
import { SlLayers } from "react-icons/sl";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { AiOutlinePayCircle } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";

function Sidebar() {
  return (
    <div>
      <aside className="h-screen bg-white fixed lg:sticky top-0 p-[14px_24px] whitespace-nowrap z-10 closed shadow-[0px_0px_10px_-2px_#0000003f] w-[300px] hidden lg:block">
        {/* <aside className="h-screen bg-white fixed lg:sticky top-0 border-r-2 p-[14px_24px] whitespace-nowrap z-10 closed shadow-xl  "> */}
        <div className="mb-10 flex items-center justify-between ">
          <img src={LOGO} alt="" className="max-w-[92px] w-full" />

          <button className="lg:hidden bg-gray-200 text-gray-500 rounded leading-none p-1 btn-close-menu">
            <i data-feather="chevron-left"></i>
          </button>
        </div>

        <ul className="text-gray-500 font-semibold flex flex-col gap-2">
          <li className="rounded-[8px] p-[17px] group hover:bg-primary ">
            <Link href="#" className="">
              <div className="flex items-center gap-[15px] hover:text-white">
                <MdOutlineSpaceDashboard className="group-hover:text-white" />
                <h1 className="mb-0 text-nevyblue text-[16px] font-bold leading-[2%] group-hover:text-white">
                  Dashboard
                </h1>
              </div>
            </Link>
          </li>

          <li className="rounded-[8px] p-[17px] group hover:bg-primary ">
            <Link href="#" className="">
              <div className="flex items-center gap-[15px] hover:text-white">
                <CgAddR className="group-hover:text-white" />
                <h1 className="mb-0 text-nevyblue text-[16px] font-bold leading-[2%] group-hover:text-white">
                  Create New Course
                </h1>
              </div>
            </Link>
          </li>
          <li className="rounded-[8px] p-[17px] group hover:bg-primary ">
            <Link href="#" className="">
              <div className="flex items-center gap-[15px] hover:text-white">
                <SlLayers className="group-hover:text-white" />
                <h1 className="mb-0 text-nevyblue text-[16px] font-bold leading-[2%] group-hover:text-white">
                  My Course
                </h1>
              </div>
            </Link>
          </li>
          <li className="rounded-[8px] p-[17px] group hover:bg-primary ">
            <Link href="#" className="">
              <div className="flex items-center gap-[15px] hover:text-white">
                <HiOutlineCreditCard className="group-hover:text-white" />
                <h1 className="mb-0 text-nevyblue text-[16px] font-bold leading-[2%] group-hover:text-white">
                  Financial Details
                </h1>
              </div>
            </Link>
          </li>
          <li className="rounded-[8px] p-[17px] group hover:bg-primary ">
            <Link href="#" className="">
              <div className="flex items-center gap-[15px] hover:text-white">
                <MdOutlineMessage className="group-hover:text-white" />
                <h1 className="mb-0 text-nevyblue text-[16px] font-bold leading-[2%] group-hover:text-white">
                  Message
                </h1>
              </div>
            </Link>
          </li>
          <li className="rounded-[8px] p-[17px] group hover:bg-primary ">
            <Link href="#" className="">
              <div className="flex items-center gap-[15px] hover:text-white">
                <AiOutlinePayCircle className="group-hover:text-white" />
                <h1 className="mb-0 text-nevyblue text-[16px] font-bold leading-[2%] group-hover:text-white">
                  Subscription
                </h1>
              </div>
            </Link>
          </li>
          <li className="rounded-[8px] p-[17px] group hover:bg-primary ">
            <Link href="#" className="">
              <div className="flex items-center gap-[15px] hover:text-white">
                <IoSettingsOutline className="group-hover:text-white" />
                <h1 className="mb-0 text-nevyblue text-[16px] font-bold leading-[2%] group-hover:text-white">
                  Settings
                </h1>
              </div>
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
