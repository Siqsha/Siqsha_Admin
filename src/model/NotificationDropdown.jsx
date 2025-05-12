import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";
import { Tooltip } from "react-tooltip";
import { clearNotification } from "../pages/services/apis/connection";

export default function NotificationDropdown({
  notifications,
  setNotifications,
}) {
  const handleClearNotification = async () => {
    await clearNotification();
    setNotifications([]);
  };

  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton className="bg-white1 lg:min-w-[50px] min-w-[42px] w-full lg:min-h-[50px] min-h-[42px] h-full rounded-full flex justify-center items-center">
        <div className="relative">
          <IoNotificationsOutline
            data-tooltip-id="notifications"
            className="w-[24px] h-[24px]"
          />
          {notifications && notifications.length !== 0 && (
            <span className="absolute top-[-3px] right-[-3px] text-[7px] flex items-center justify-center w-[12px] h-[12px] font-medium text-white bg-red rounded-full">
              {notifications.length}
            </span>
          )}
          <Tooltip id="notifications" content="Notifications" />
        </div>
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-300"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-200"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="z-50 right-[-66px] top-[60px] absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-[400px]">
          <ul
            className="p-3 text-sm text-gray-700"
            aria-labelledby="dropdownDefaultButton"
          >
            {notifications && (
              <li className="border-b border-b-[#999999] py-2">
                <div className="flex justify-between">
                  <div className="text-base">Notification</div>
                  <div className="bg-primary text-white rounded-full text-sm p-1 size-[22px] flex justify-center items-center">
                    {notifications?.length}
                  </div>
                </div>
              </li>
            )}

            <div className="my-scroll overflow-y-auto max-h-[210px]">
              {notifications?.length > 0 ? (
                notifications.map((notification) => (
                  <li
                    key={notification._id}
                    className="border-b border-b-[#999999] py-3"
                  >
                    <div className="flex flex-col">
                      <div className="flex gap-2 items-center">
                        <FaCircleInfo className="mt-1 size-5" />
                        <div>{notification.title}</div>
                      </div>
                      <div className="ml-7">{notification.description}</div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="py-3 text-center text-gray-500">
                  No notifications available
                </li>
              )}
            </div>
            <div>
              {notifications?.length > 0 && (
                <li className="pt-2">
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-primary text-white rounded-md text-sm px-2 py-1"
                      onClick={handleClearNotification}
                    >
                      Clear All
                    </button>
                  </div>
                </li>
              )}
            </div>
          </ul>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
