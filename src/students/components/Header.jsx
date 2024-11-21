import React, { useState } from "react";
import PROFILE from "../../assets/Images/profile.png";
import LOGOMOBILE from "../../assets/Images/LogoMobile.png";
import { BiSearch } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import { CgMenu } from "react-icons/cg";
import { Link } from "react-router-dom";

function Header() {

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <header className="p-[16px] lg:shadow-[0px_0px_10px_-2px_#0000003f] shadow-[0px_0px_10px_-2px_#00000040] bg-white mb-1 sticky flex items-center gap-[20px] lg:justify-end justify-between">
        <div className="lg:hidden block">
          <img src={LOGOMOBILE} alt="" className="w-[45px] h-[45px]" />
        </div>
        <div className="flex items-center gap-[20px]">
          <div className="w-full sm:min-w-[340px]">
            <div className="relative  items-center bg-white1 lg:block hidden">
              <BiSearch className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600" />

              <input
                className="w-full placeholder:text-lightgray text-black text-[16px] font-medium bg-white1 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 shadow-sm focus:shadow bg-transparent"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="bg-gray lg:min-w-[50px] min-w-[42px] w-full lg:min-h-[50px] min-h-[42px] h-full rounded-full flex justify-center items-center">
            <div className="relative">
              <IoNotificationsOutline className="w-[16px] h-[16px] text-gray-500" />
              <span className="absolute top-[-3px] right-[-3px] text-[7px] flex items-center justify-center w-[12px] h-[12px] font-medium text-white bg-blue-800 rounded-full">
                1
              </span>
            </div>
          </div>
          <div className="bg-gray lg:min-w-[50px] min-w-[42px] w-full lg:min-h-[50px] min-h-[42px] h-full rounded-full flex justify-center items-center">
            <img src={PROFILE} alt="" />
          </div>
          <div className="lg:block hidden">
            <div className="bg-gray lg:min-w-[50px] min-w-[42px] w-full lg:min-h-[50px] min-h-[42px] h-full rounded-full flex justify-center items-center ">
              <PiSignOutBold className="w-[25px] h-[25px]" />
            </div>
          </div>
          <div className="lg:hidden block"><CgMenu className="w-[25px] h-[25px]" onClick={toggleDropdown} /></div>

          {isOpen && (
            <div className="absolute right-4 top-[50px] mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-primary hover:text-white">
                  <Link href=""> Dashboard</Link>
                </li>
                <li className="px-4 py-2 hover:bg-primary hover:text-white">
                  <Link href="">Create New Course</Link>
                </li>
                <li className="px-4 py-2 hover:bg-primary hover:text-white">
                  <Link href="">My Course</Link>
                </li>
                <li className="px-4 py-2 hover:bg-primary hover:text-white">
                  <Link href="">Financial Details</Link>
                </li>
                <li className="px-4 py-2 hover:bg-primary hover:text-white">
                  <Link href="#link3">Message</Link>
                </li>
                <li className="px-4 py-2 hover:bg-primary hover:text-white">
                  <Link href="">Subscription</Link>
                </li>
                <li className="px-4 py-2 hover:bg-primary hover:text-white">
                  <Link href="#link3">Settings</Link>
                </li>
              </ul>
            </div>
          )}

        </div>

      </header>
    </div>
  );
}

export default Header;
