import React from "react";
import { useState } from "react";
import PROFILE from "../../../assets/Images/profile.png";
import { BiSearch } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import LOGOMOBILE from "../../../assets/Images/LogoMobile.png";
import { CgMenu } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CgAddR } from "react-icons/cg";

import { MdOutlineSpaceDashboard } from "react-icons/md";

function AdminNavbar({ page }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogoutUser = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <header className=" top-0 left-0 w-full z-10 bg-gray1">
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden "
        >
          <div className="fixed inset-0 z-10 bg-[#00000038]" />
          <DialogPanel className="fixed inset-y-0 left-0 z-10 top-0 overflow-y-auto bg-white p-[20px] max-w-[300px] sm:ring-1 sm:ring-gray-900/10 h-full">
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="pb-[20px]">
                  <div>
                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => setMobileMenuOpen(false)}
                        className="-m-2.5 rounded-md p-2.5 text-gray-700"
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>

                    <ul className="text-gray-500 font-semibold flex flex-col gap-2">
                      <Link
                        to="/admin/dashboard"
                        className={`rounded-[8px] p-[17px] group hover:bg-primary ${
                          page === "dashboard"
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
                        className={`rounded-[8px] p-[17px] group hover:bg-primary ${
                          page === "usersetting"
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
                        className={`rounded-[8px] p-[17px] group hover:bg-primary ${
                          page === "students"
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
                        className={`rounded-[8px] p-[17px] group hover:bg-primary ${
                          page === "teachers"
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
                        className={`rounded-[8px] p-[17px] group hover:bg-primary ${
                          page === "approval"
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
                  </div>
                  <div className="rounded-[8px] p-[17px] group hover:bg-primary ">
                    <Link href="#" className="">
                      <div className="flex items-center gap-[15px] hover:text-white">
                        <PiSignOutBold className="group-hover:text-white text-[22px]" />
                        <h1 className="mb-0 text-nevyblue text-[16px] font-bold leading-[2%] group-hover:text-white">
                          Sing out
                        </h1>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
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
              <IoNotificationsOutline className="w-[24px] h-[24px] text-gray-500" />
              <span className="absolute top-[-3px] right-[-3px] text-[7px] flex items-center justify-center w-[12px] h-[12px] font-medium text-white bg-blue-800 rounded-full">
                1
              </span>
            </div>
          </div>
          {/* <div className="relative">
            <div className="bg-gray w-[50px] h-[50px] rounded-full flex justify-center items-center">
              <img src={PROFILE} alt="" />
            </div>
          </div> */}
          <div className="lg:block hidden">
            <button
              onClick={handleLogoutUser}
              className="bg-gray lg:min-w-[50px] min-w-[42px] w-full lg:min-h-[50px] min-h-[42px] h-full rounded-full flex justify-center items-center "
            >
              <PiSignOutBold className="w-[25px] h-[25px]" />
            </button>
          </div>

          <div className="block lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <CgMenu aria-hidden="true" className="size-6" />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default AdminNavbar;
