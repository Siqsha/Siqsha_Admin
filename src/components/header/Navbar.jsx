import React from "react";
import { useState } from "react";
import { PiSignOutBold } from "react-icons/pi";
import LOGOMOBILE from "../../assets/Images/LogoMobile.png";
import { CgMenu } from "react-icons/cg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MdOutlineSpaceDashboard } from "react-icons/md";

function Navbar({ page }) {
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

                    <div className="text-gray-500 font-semibold flex flex-col gap-2">
                      <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) =>
                          `rounded-[8px] p-[17px] group hover:bg-primary ${
                            isActive
                              ? "bg-primary text-white"
                              : "bg-white text-nevyblue"
                          }`
                        }
                      >
                        <div className="flex items-center gap-[15px] hover:text-white">
                          <MdOutlineSpaceDashboard className="group-hover:text-white" />
                          <h1 className="mb-0 text-[16px] font-bold leading-[2%] group-hover:text-white">
                            Dashboard
                          </h1>
                        </div>
                      </NavLink>

                      <NavLink
                        to="/admin/users"
                        className={({ isActive }) =>
                          `rounded-[8px] p-[17px] group hover:bg-primary ${
                            isActive
                              ? "bg-primary text-white"
                              : "bg-white text-nevyblue"
                          }`
                        }
                      >
                        <div className="flex items-center gap-[15px] hover:text-white">
                          <MdOutlineSpaceDashboard className="group-hover:text-white" />
                          <h1 className="mb-0 text-[16px] font-bold leading-[2%] group-hover:text-white">
                            Users
                          </h1>
                        </div>
                      </NavLink>
                    </div>
                  </div>
                  <div className="rounded-[8px] p-[17px] group hover:bg-primary ">
                    <Link href="#" className="">
                      <div className="flex items-center gap-[15px] hover:text-white">
                        <PiSignOutBold className="group-hover:text-white text-[22px]" />
                        <h1 className="mb-0 text-nevyblue text-[16px] font-bold leading-[2%] group-hover:text-white">
                          Sign out
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

export default Navbar;
