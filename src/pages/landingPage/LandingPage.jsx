import React, { useState } from "react";
import LOGO from "../../assets/Images/Logo.png";
import LOGOFOOTER from "../../assets/Images/Logofooter.png";
import { Link } from "react-router-dom";
import ABOUTIMG from "../../assets/Images/aboutImage.png";
import DANCEIMG from "../../assets/Images/Danceimg.png";
import MUSICIMG from "../../assets/Images/MusicImg.png";
import CALLIMG from "../../assets/Images/Calling.svg";
import MESSAGE from "../../assets/Images/Message.svg";
import LOCATION from "../../assets/Images/Location.svg";
import ARTSIMG from "../../assets/Images/ArtsImg.png";
import { FaStar } from "react-icons/fa";
import { BsCameraVideo } from "react-icons/bs";
import { TbClockHour3 } from "react-icons/tb";
import { GrDownload } from "react-icons/gr";
import { BiSearch } from "react-icons/bi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getUserRole, isAuthenticated } from "../router/ProtectedRoute";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function LandingPage() {
  const role = getUserRole();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="bg-gray1">
        <div className="xl:px-[80px] md:px-[40px] px-[20px]">
          <header className="fixed top-0 left-0 w-full z-10 bg-gray1 py-6">
            <nav
              aria-label="Global"
              className="mx-auto flex items-center justify-between xl:px-[80px] md:px-[40px] px-[20px]"
            >
              <div className="flex lg:flex-1">
                <button className="flex items-center -m-1.5 p-1.5">
                  <img
                    src={LOGO}
                    alt=""
                    className="w-full md:max-w-[110px] max-w-[70px]"
                  />
                </button>
              </div>
              <div className="block lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <PopoverGroup className="hidden lg:flex lg:gap-[20px] items-center">
                <ul className="flex gap-[20px] font-medium">
                  <li>
                    <Link
                      to="/"
                      className="p-2 lg:px-4 text-gray2 hover:text-primary font-medium text-[18px]"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="p-2 lg:px-4 text-gray2 hover:text-primary font-medium text-[18px] transition-colors duration-300"
                    >
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/course"
                      className="p-2 lg:px-4 text-gray2 hover:text-primary font-medium text-[18px] transition-colors duration-300"
                    >
                      Courses
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="p-2 lg:px-4 text-gray2 hover:text-primary font-medium text-[18px] transition-colors duration-300"
                    >
                      Contact us
                    </Link>
                  </li>
                </ul>
                <div className="flex gap-[22px]">
                  <div className="w-full sm:max-w-[242px]">
                    <div className="relative flex items-center bg-white1">
                      <BiSearch className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600" />
                      <input
                        className="w-full placeholder:text-lightgray text-black text-[16px] font-medium bg-white1 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 shadow-sm focus:shadow bg-transparent"
                        placeholder="Search for teachers"
                      />
                    </div>
                  </div>
                  {!isAuthenticated() ? (
                    <div className="flex gap-[8px]">
                      <Link
                        to="/login"
                        className="p-2 lg:px-4 text-center border-[2px] border-primary text-primary text-[18px] font-medium rounded-full flex justify-center items-center w-[125px] h-[42px] hover:bg-primary hover:text-white"
                      >
                        Log in
                      </Link>
                      <Link
                        to="/signup"
                        className="p-2 lg:px-4 text-center border-[2px] border-primary text-primary text-[18px] font-medium rounded-full flex justify-center items-center w-[125px] h-[42px] hover:bg-primary hover:text-white"
                      >
                        Sign up
                      </Link>
                    </div>
                  ) : (
                    <div className="flex gap-[8px]">
                      <Link
                        to={`/admin/dashboard`}
                        className="p-2 lg:px-4 text-center border-[2px] border-primary text-primary text-[18px] font-medium rounded-full flex justify-center items-center w-[125px] h-[42px] hover:bg-primary hover:text-white"
                      >
                        Dashboard
                      </Link>
                    </div>
                  )}
                </div>
              </PopoverGroup>
            </nav>
            <Dialog
              open={mobileMenuOpen}
              onClose={setMobileMenuOpen}
              className="lg:hidden"
            >
              <div className="fixed inset-0 z-10 bg-[#00000042]" />
              <DialogPanel className="fixed inset-y-0 left-0 z-10 top-0 w-[300px] overflow-y-auto bg-white p-[20px] sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 h-full">
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
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="pb-[20px]">
                      <ul className="py-2">
                        <li className="px-4 py-2 hover:bg-primary hover:text-white">
                          <Link to="/"> Home</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-primary hover:text-white">
                          <Link to="#">About us</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-primary hover:text-white">
                          <Link to="/course"> Courses</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-primary hover:text-white">
                          <Link href="">Contact us</Link>
                        </li>
                      </ul>
                      <div className="flex gap-[22px] lg:flex-row flex-col">
                        <div className="w-full sm:max-w-[242px]">
                          <div className="relative flex items-center bg-white1">
                            <BiSearch className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600" />
                            <input
                              className="w-full placeholder:text-lightgray text-black text-[16px] font-medium bg-white1 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 shadow-sm focus:shadow bg-transparent"
                              placeholder="Search for teachers"
                            />
                          </div>
                        </div>
                        {!isAuthenticated() ? (
                          <div className="flex gap-[8px]">
                            <Link
                              to="/login"
                              className="p-2 lg:px-4 text-center border-[2px] border-primary text-primary text-[18px] font-medium rounded-full flex justify-center items-center w-[125px] h-[42px] hover:bg-primary hover:text-white"
                            >
                              Log in
                            </Link>
                            <Link
                              to="/signup"
                              className="p-2 lg:px-4 text-center border-[2px] border-primary text-primary text-[18px] font-medium rounded-full flex justify-center items-center w-[125px] h-[42px] hover:bg-primary hover:text-white"
                            >
                              Sign up
                            </Link>
                          </div>
                        ) : (
                          <div className="flex gap-[8px]">
                            <Link
                              to={`${role}/profile`}
                              className="p-2 lg:px-4 text-center border-[2px] border-primary text-primary text-[18px] font-medium rounded-full flex justify-center items-center w-[125px] h-[42px] hover:bg-primary hover:text-white"
                            >
                              Dashboard
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </Dialog>
          </header>
        </div>
        <div className="relative">
          <div className="xl:px-[80px] md:px-[40px] px-[20px]">
            <div className="lg:gap-[10px] xl:gap-16 items-center mx-auto lg:grid lg:grid-cols-2 pt-[170px]">
              <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400 relative">
                <h2 className="text-black1 font-black xl:text-[46px] md:text-[40px] md:pt-10 pt-[30px] sm:text-[35px] text-[25px] md:leading-[50px] sm:leading-[38px] leading-[30px] md:whitespace-nowrap">
                  Learn Anything, Anywhere
                </h2>
                <p className="md:mt-[16px] !mt-[25px] text-lightgray lg:max-w-[654px] max-w-[654px] w-full text-[14px] sm:text-[16px] font-normal">
                  At Siqsha, we’re passionate about revolutionizing learning and
                  skill-sharing. Our platform connects learners and instructors
                  from around the world, offering a wide range of subjects—from
                  languages and coding to creative arts, fitness, and therapy.
                  With innovative technology, we provide an engaging and
                  accessible environment where curiosity thrives, and growth is
                  encouraged. Join us on this exciting journey as we break down
                  barriers and inspire individuals to learn, grow, and share
                  knowledge with one another!
                </p>
              </div>
              <div className="flex justify-center sm:pt- pt-[20px]">
                <img src={ABOUTIMG} alt="" className="max-w-[550px] w-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="xl:px-[80px] md:px-[40px] px-[20px]">
          {" "}
          <section className="px-3">
            <h2 className="font-bold md:text-[46px] lg:text-[37px] text-[30px] text-black1 text-center py-[30px]">
              Trading Courses
            </h2>
            <div className="slider-container">
              <Slider {...settings}>
                <div>
                  <div className="relative bg-white">
                    <div className=" rounded shadow-[0px_4px_25px_#00000019] p-[13px]">
                      <img
                        className="w-full"
                        src={DANCEIMG}
                        alt="Sunset in the mountains"
                      />
                      <div className="flex justify-between items-center pt-[14px] gap-2 flex-wrap">
                        <div className="text-gray3 text-[16px] font-medium ">
                          Dance Course
                        </div>
                        <div className="flex justify-between items-center gap-1">
                          <FaStar className="text-yellow" />
                          <FaStar className="text-yellow" />
                          <FaStar className="text-yellow" />
                          <FaStar className="text-yellow" />
                          <FaStar className="text-lightyellow" />
                        </div>
                      </div>
                      <p className="mb-0 md:text-[20px] text-[17px] font-medium text-black pt-2">
                        Dance Foundations for Beginners
                      </p>
                      <h1 className="text-[20px] font-semibold text-primary">
                        $99
                      </h1>
                      <div className="flex justify-between items-center py-[25px] gap-2 flex-wrap">
                        <div className="flex justify-between items-center gap-[6px]">
                          <div>
                            <TbClockHour3 />
                          </div>
                          <h1 className="text-[16px] font-medium text-gray3">
                            22hr 30min
                          </h1>
                        </div>
                        <div className="flex justify-between items-center gap-[6px]">
                          <div>
                            <BsCameraVideo />
                          </div>
                          <h1 className="text-[16px] font-medium text-gray3">
                            34 Courses
                          </h1>
                        </div>
                        <div className="flex justify-between items-center gap-[6px]">
                          <div>
                            <GrDownload />
                          </div>
                          <h1 className="text-[16px] font-medium text-gray3">
                            250 Sales
                          </h1>
                        </div>
                      </div>
                      <div className="bg-primary rounded-full md:max-w-[206px] lg:max-w-[190px] max-w-[150px] w-full lg:max-h-[55px] max-h-[40px] h-full flex justify-center items-center mx-auto absolute bottom-[-25px] left-0 right-0">
                        <button className="text-white md:text-[20px] text-[16px] font-medium">
                          Join Course
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="relative bg-white">
                    <div className="rounded shadow-[0px_4px_25px_#00000019] p-[13px]">
                      <img
                        className="w-full"
                        src={MUSICIMG}
                        alt="Sunset in the mountains"
                      />
                      <div className="flex justify-between items-center pt-[14px] gap-2 flex-wrap">
                        <div className="text-gray3 text-[16px] font-medium ">
                          Dance Course
                        </div>
                        <div className="flex justify-between items-center gap-1">
                          <FaStar className="text-yellow" />
                          <FaStar className="text-yellow" />
                          <FaStar className="text-yellow" />
                          <FaStar className="text-yellow" />
                          <FaStar className="text-lightyellow" />
                        </div>
                      </div>
                      <p className="mb-0 md:text-[20px] text-[17px] font-medium text-black pt-2 whitespace-nowrap">
                        Mastering Music Theory & Practice
                      </p>
                      <h1 className="text-[20px] font-semibold text-primary">
                        $99
                      </h1>
                      <div className="flex justify-between items-center py-[25px] gap-2 flex-wrap">
                        <div className="flex justify-between items-center gap-[6px]">
                          <div>
                            <TbClockHour3 />
                          </div>
                          <h1 className="text-[16px] font-medium text-gray3">
                            22hr 30min
                          </h1>
                        </div>
                        <div className="flex justify-between items-center gap-[6px]">
                          <div>
                            <BsCameraVideo />
                          </div>
                          <h1 className="text-[16px] font-medium text-gray3">
                            34 Courses
                          </h1>
                        </div>
                        <div className="flex justify-between items-center gap-[6px]">
                          <div>
                            <GrDownload />
                          </div>
                          <h1 className="text-[16px] font-medium text-gray3">
                            250 Sales
                          </h1>
                        </div>
                      </div>
                      <div className="bg-primary rounded-full md:max-w-[206px] lg:max-w-[190px] max-w-[150px] w-full lg:max-h-[55px] max-h-[40px] h-full flex justify-center items-center mx-auto absolute bottom-[-25px] left-0 right-0">
                        <button className="text-white md:text-[20px] text-[16px] font-medium">
                          Join Course
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="relative bg-white">
                    <div className="rounded shadow-[0px_4px_25px_#00000019] p-[13px]">
                      <img
                        className="w-full"
                        src={ARTSIMG}
                        alt="Sunset in the mountains"
                      />
                      <div className="flex justify-between items-center pt-[14px] gap-2 flex-wrap">
                        <div className="text-gray3 text-[16px] font-medium ">
                          Dance Course
                        </div>
                        <div className="flex justify-between items-center gap-1">
                          <FaStar className="text-yellow" />
                          <FaStar className="text-yellow" />
                          <FaStar className="text-yellow" />
                          <FaStar className="text-yellow" />
                          <FaStar className="text-lightyellow" />
                        </div>
                      </div>
                      <p className="mb-0 md:text-[20px] text-[17px] font-medium text-black pt-2">
                        Fine Arts: A Creative Journey
                      </p>
                      <h1 className="text-[20px] font-semibold text-primary">
                        $99
                      </h1>
                      <div className="flex justify-between items-center py-[25px] gap-2 flex-wrap">
                        <div className="flex justify-between items-center gap-[6px]">
                          <div>
                            <TbClockHour3 />
                          </div>
                          <h1 className="text-[16px] font-medium text-gray3">
                            22hr 30min
                          </h1>
                        </div>
                        <div className="flex justify-between items-center gap-[6px]">
                          <div>
                            <BsCameraVideo />
                          </div>
                          <h1 className="text-[16px] font-medium text-gray3">
                            34 Courses
                          </h1>
                        </div>
                        <div className="flex justify-between items-center gap-[6px]">
                          <div>
                            <GrDownload />
                          </div>
                          <h1 className="text-[16px] font-medium text-gray3">
                            250 Sales
                          </h1>
                        </div>
                      </div>
                      <div className="bg-primary rounded-full md:max-w-[206px] lg:max-w-[190px] max-w-[150px] w-full lg:max-h-[55px] max-h-[40px] h-full flex justify-center items-center mx-auto absolute bottom-[-25px] left-0 right-0">
                        <button className="text-white md:text-[20px] text-[16px] font-medium">
                          Join Course
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </section>
        </div>
        <footer className="mt-[40px]">
          <div className="bg-cover w-full footerbg ">
            <div className="p-3">
              <div className="lg:p-[150px_80px_29px_80px] pt-[29px]">
                <div className="flex flex-wrap gap-3 justify-between px-6">
                  <div>
                    <img src={LOGOFOOTER} alt="" />
                    <p className="mb-0 text-[16px] mt-[14px] font-normal text-white max-w-[272px] w-full">
                      Learn  Anything, Anywhere.
                    </p>
                  </div>
                  <div className="">
                    <h1 className="text-[24px] font-medium text-white mb-[28px]">
                      Company
                    </h1>
                    <ul>
                      <a href="#">
                        <li className="text-[16px] font-normal text-white mb-[20px]">
                          About Us
                        </li>
                      </a>
                      <a href="#">
                        {" "}
                        <li className="text-[16px] font-normal text-white mb-[20px]">
                          Popular Course
                        </li>
                      </a>
                      <a href="#">
                        {" "}
                        <li className="text-[16px] font-normal text-white">
                          Service
                        </li>
                      </a>
                    </ul>
                  </div>
                  <div className="">
                    <h1 className="text-[24px] font-medium text-white mb-[28px]">
                      Support
                    </h1>
                    <ul>
                      <a href="#">
                        {" "}
                        <li className="text-[16px] font-normal text-white mb-[20px]">
                          FAQ
                        </li>
                      </a>
                      <a href="#">
                        <li className="text-[16px] font-normal text-white">
                          Privacy
                        </li>
                      </a>
                    </ul>
                  </div>
                  <div className="">
                    <h1 className="text-[24px] font-medium text-white mb-[28px]">
                      Contact Info
                    </h1>
                    <ul>
                      <li className="text-[16px] font-normal text-white mb-[20px] flex gap-[13px]">
                        <span>
                          <img src={CALLIMG} alt="" />
                        </span>
                        +0913-705-3875
                      </li>
                      <li className="text-[16px] font-normal text-white mb-[20px] flex gap-[13px]">
                        <span>
                          <img src={MESSAGE} alt="" />
                        </span>
                        ElizabethJ@jourrapide.com
                      </li>
                      <li className="text-[16px] font-normal text-white mb-[20px] flex gap-[13px]">
                        <span>
                          <img src={LOCATION} alt="" />
                        </span>
                        4808 Skinner Hollow Road Days Creek, OR 97429
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className=" py-[22px] border-t border-[#D9D9D9]">
              <p className="mb-0 text-[16px] font-normal text-white text-center">
                © Copyright 2020 Lorem Inc. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default LandingPage;
