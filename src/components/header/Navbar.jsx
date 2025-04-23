import React, { useEffect } from "react";
import { useState } from "react";
import { PiSignOutBold } from "react-icons/pi";
import LOGOMOBILE from "../../assets/Images/LogoMobile.png";
import { CgMenu } from "react-icons/cg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MdOutlineRateReview, MdOutlineSpaceDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { HiOutlineCreditCard, HiOutlineUserGroup } from "react-icons/hi";
import NotificationDropdown from "../../model/NotificationDropdown";
import { allNotifications } from "../../pages/services/apis/connection";
import { socket } from "../../utils/socketUtils";
import { getUserProfile } from "../../pages/services/apis/userApi";
import { BsFileEarmarkCheck } from "react-icons/bs";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";

function Navbar() {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      if (response.success) {
        setAdminId(response.user._id);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchNotifications = async () => {
    const data = await allNotifications();
    setNotifications(data.notifications);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Handle user status updates
  useEffect(() => {
    const handleConnect = () => {
      if (adminId) {
        socket.emit("join", adminId);
      }
    };
    const handleNewNotification = async () => {
      fetchNotifications();
    };

    const handleDisconnect = () => {
      console.log("Socket disconnected");
    };
    socket.on("connect", handleConnect);
    socket.on("newCommissionRequest", handleNewNotification);
    socket.on("newAdApprovalRequest", handleNewNotification);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("newCommissionRequest", handleNewNotification);
      socket.off("newAdApprovalRequest", handleNewNotification);
      socket.off("disconnect", handleDisconnect);
    };
  }, [adminId]);

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
          className="xl:hidden "
        >
          <div className="relative">
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 border border-primary rounded-full p-1 fixed top-3 z-50 left-[270px]"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>
          <div className="fixed inset-0 z-[40] bg-[#00000038]" />
          <DialogPanel className="fixed inset-y-0 left-0 z-[50] top-0 overflow-y-auto bg-white p-[20px] max-w-[264px] w-full sm:ring-1 sm:ring-gray-900/10 h-full ">
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="pb-[20px]">
                  <div className="flex flex-col h-[95svh] justify-between pt-7">
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
                          <HiOutlineUserGroup className="group-hover:text-white" />
                          <h1 className="mb-0 text-[16px] font-bold leading-[2%] group-hover:text-white">
                            Users
                          </h1>
                        </div>
                      </NavLink>

                      <NavLink
                        to="/admin/myapproval"
                        className={({ isActive }) =>
                          `rounded-[8px] p-[17px] group hover:bg-primary ${
                            isActive
                              ? "bg-primary text-white"
                              : "bg-white text-nevyblue"
                          }`
                        }
                      >
                        <div className="flex items-center gap-[15px] hover:text-white">
                          <BsFileEarmarkCheck className="group-hover:text-white" />
                          <h1 className="mb-0 text-[16px] font-bold leading-[2%] group-hover:text-white">
                            My Approvals
                          </h1>
                        </div>
                      </NavLink>

                      <NavLink
                        to="/admin/coupon"
                        className={({ isActive }) =>
                          `rounded-[8px] p-[17px] group hover:bg-primary ${
                            isActive
                              ? "bg-primary text-white"
                              : "bg-white text-nevyblue"
                          }`
                        }
                      >
                        <div className="flex items-center gap-[15px] hover:text-white ">
                          <HiOutlineCreditCard className="text-[20px] group-hover:text-white" />
                          <h1 className="mb-0 text-[16px] font-bold leading-[2%] group-hover:text-white">
                            Coupon Management
                          </h1>
                        </div>
                      </NavLink>

                      {/* <NavLink
                        to="/admin/admanagement"
                        className={({ isActive }) =>
                          `rounded-[8px] p-[17px] group hover:bg-primary ${
                            isActive
                              ? "bg-primary text-white"
                              : "bg-white text-nevyblue"
                          }`
                        }
                      >
                        <div className="flex items-center gap-[15px] hover:text-white">
                          
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            fill="currentColor"
                            className="group-hover:text-white mi-solid mi-window-dock-undock"
                            viewBox="0 0 24 24"
                          >
                            <path d="M7 4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h14c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm13 10H8V7h12zm-4 4H4V8H3c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1z" />
                          </svg>
                          <h1 className="mb-0 text-[16px] font-bold leading-[2%] group-hover:text-white">
                            Ad Management
                          </h1>
                        </div>
                      </NavLink> */}

                      {/* <NavLink
                        to="/admin/commission"
                        className={({ isActive }) =>
                          `rounded-[8px] p-[17px] group hover:bg-primary ${
                            isActive
                              ? "bg-primary text-white"
                              : "bg-white text-nevyblue"
                          }`
                        }
                      >
                        <div className="flex items-center gap-[15px] hover:text-white">
                          <HiOutlineCreditCard className="group-hover:text-white" />
                          <h1 className="mb-0 text-[16px] font-bold leading-[2%] group-hover:text-white">
                            Commission
                          </h1>
                        </div>
                      </NavLink> */}

                      {/* <NavLink
                        to="/admin/teacherlist"
                        className={({ isActive }) =>
                          `rounded-[8px] p-[17px] group hover:bg-primary ${
                            isActive
                              ? "bg-primary text-white"
                              : "bg-white text-nevyblue"
                          }`
                        }
                      >
                        <div className="flex items-center gap-[15px] hover:text-white">
                          <FiUsers className="group-hover:text-white" />
                          <h1 className="mb-0 text-[16px] font-bold leading-[2%] group-hover:text-white">
                            Teachers
                          </h1>
                        </div>
                      </NavLink> */}

                      <NavLink
                        to="/admin/review"
                        className={({ isActive }) =>
                          `rounded-[8px] p-[17px] group hover:bg-primary ${
                            isActive
                              ? "bg-primary text-white"
                              : "bg-white text-nevyblue"
                          }`
                        }
                      >
                        <div className="flex items-center gap-[15px] hover:text-white">
                          <MdOutlineRateReview className="group-hover:text-white" />
                          <h1 className="mb-0 text-[16px] font-bold leading-[2%] group-hover:text-white">
                            Feedback
                          </h1>
                        </div>
                      </NavLink>

                      <NavLink
                        to="/admin/financial"
                        className={({ isActive }) =>
                          `rounded-[8px] p-[17px] group hover:bg-primary ${
                            isActive
                              ? "bg-primary text-white"
                              : "bg-white text-nevyblue"
                          }`
                        }
                      >
                        <div className="flex items-center gap-[15px] hover:text-white">
                          <FaHandHoldingDollar className="group-hover:text-white" />
                          <h1 className="mb-0 text-[16px] font-bold leading-[2%] group-hover:text-white">
                            Financial
                          </h1>
                        </div>
                      </NavLink>

                      <NavLink
                        to="/admin/invoice"
                        className={({ isActive }) =>
                          `rounded-[8px] p-[17px] group hover:bg-primary ${
                            isActive
                              ? "bg-primary text-white"
                              : "bg-white text-nevyblue"
                          }`
                        }
                      >
                        <div className="flex items-center gap-[15px] hover:text-white">
                          <LiaFileInvoiceDollarSolid className="group-hover:text-white" />
                          <h1 className="mb-0 text-[16px] font-bold leading-[2%] group-hover:text-white">
                            Invoice
                          </h1>
                        </div>
                      </NavLink>

                      <NavLink
                        to="/admin/setting"
                        className={({ isActive }) =>
                          `rounded-[8px] p-[17px] group hover:bg-primary ${
                            isActive
                              ? "bg-primary text-white"
                              : "bg-white text-nevyblue"
                          }`
                        }
                      >
                        <div className="flex items-center gap-[15px] hover:text-white">
                          <IoSettingsOutline className="group-hover:text-white" />
                          <h1 className="mb-0 text-[16px] font-bold leading-[2%] group-hover:text-white">
                            Setting
                          </h1>
                        </div>
                      </NavLink>
                    </div>
                    <div>
                      <button
                        onClick={handleLogoutUser}
                        className="rounded-[6px] p-[17px] group hover:bg-primary cursor-pointer w-full"
                      >
                        <div className="rounded-[6px] group hover:bg-primary">
                          <div className="flex items-center gap-[15px] hover:text-white">
                            <PiSignOutBold className="group-hover:text-white text-[22px]" />
                            <h1 className="mb-0 text-nevyblue text-[16px] font-bold leading-[2%] group-hover:text-white">
                              Sign out
                            </h1>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
      <header className="p-[16px] lg:shadow-[0px_0px_10px_-2px_#0000003f] shadow-[0px_0px_10px_-2px_#00000040] bg-white mb-1 sticky flex items-center gap-[20px] xl:justify-end justify-between">
        <div className="xl:hidden block">
          <img src={LOGOMOBILE} alt="" className="w-[45px] h-[45px]" />
        </div>
        <div className="flex items-center gap-4">
          <div className="relative inline-block ">
            <NotificationDropdown
              notifications={notifications}
              setNotifications={setNotifications}
            />
          </div>
          <div className="flex items-center gap-[20px]">
            <div className="xl:block hidden">
              <button
                onClick={handleLogoutUser}
                className="bg-gray lg:min-w-[50px] min-w-[42px] w-full lg:min-h-[50px] min-h-[42px] h-full rounded-full flex justify-center items-center "
              >
                <PiSignOutBold className="w-[25px] h-[25px]" />
              </button>
            </div>

            <div className="block xl:hidden">
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
        </div>
      </header>
    </div>
  );
}

export default Navbar;
