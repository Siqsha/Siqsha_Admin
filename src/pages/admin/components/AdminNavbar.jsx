import React from "react";
import PROFILE from "../../../assets/Images/profile.png";
import { BiSearch } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";

function AdminNavbar({ page }) {
  return (
    <div>
      <header className="p-[16px] shadow-[0px_0px_10px_-2px_#0000003f] bg-white mb-1 sticky flex items-center gap-[20px] justify-between">
        <div className="flex gap-6 items-center justify-center">
          <div className="w-full sm:max-w-[340px]">
            <div className="relative flex items-center bg-white1">
              <BiSearch className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600" />
              <input
                className="w-full placeholder:text-lightgray text-black text-[16px] font-medium bg-white1 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 shadow-sm focus:shadow bg-transparent"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="bg-gray w-[50px] h-[50px] rounded-full flex justify-center items-center">
            <div className="relative">
              <IoNotificationsOutline className="w-[16px] h-[16px] text-gray-500" />
              <span className="absolute top-[-3px] right-[-3px] text-[7px] flex items-center justify-center w-[12px] h-[12px] font-medium text-white bg-blue-800 rounded-full">
                1
              </span>
            </div>
          </div>
          <div className="bg-gray w-[50px] h-[50px] rounded-full flex justify-center items-center">
            <img src={PROFILE} alt="" />
          </div>
          <div className="bg-gray w-[50px] h-[50px] rounded-full flex justify-center items-center">
            <PiSignOutBold className="w-[25px] h-[25px]" />
          </div>
        </div>
      </header>
    </div>
  );
}

export default AdminNavbar;
