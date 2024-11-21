import React, { useState } from "react";
import { BiSolidCheckCircle, BiPlus, BiTime } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import { FaUpload } from "react-icons/fa6";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import styled from "styled-components";
import { Form, Field, Formik } from "formik";
import { CheckIcon } from "@heroicons/react/20/solid";
import { IoIosArrowDown } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import DOLLAR from "../../../assets/Images/dollar.png";
import PERSONIMG from "../../../assets/Images/person.png";
import { BsCheckAll } from "react-icons/bs";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import CHECK from "../../../assets/Images/check.png";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const Tab = styled.button`
  ${({ active }) =>
    active &&
    `
    border-bottom: 3px solid #002060;
    opacity: 1;
  `}
`;
const ButtonGroup = styled.div`
  display: flex;
`;
const tabTypes = ["Personal Settings", "Skill Matrix", "Fee Structure"];

const Mobileno = [
  {
    id: 0,
    name: "+91",
    value: "",
  },
  {
    id: 1,
    name: "+91",
    value: "+91",
  },
];
const Source = [
  {
    id: 0,
    name: "Source",
    value: "",
  },
  {
    id: 1,
    name: "Teacher",
    value: "teacher",
  },
];
const Subscription = [
  {
    id: 0,
    name: "Select",
    value: "",
  },
  {
    id: 1,
    name: "Teacher",
    value: "teacher",
  },
];
const Availability = [
  {
    id: 0,
    name: "Select",
    value: "",
  },
  {
    id: 1,
    name: "Teacher",
    value: "teacher",
  },
];
const Duration = [
  {
    id: 0,
    name: "Day1",
    value: "",
  },
  {
    id: 1,
    name: "Teacher",
    value: "teacher",
  },
];
const Coupon = [
  {
    id: 0,
    name: "Select Coupon",
    value: "",
  },
  {
    id: 1,
    name: "Teacher",
    value: "teacher",
  },
];
const SkillLevel = [
  {
    id: 0,
    name: "Select SkillLevel",
    value: "",
  },
  {
    id: 1,
    name: "Teacher",
    value: "teacher",
  },
];
const Level = [
  {
    id: 0,
    name: "Select Level",
    value: "",
  },
  {
    id: 1,
    name: "Teacher",
    value: "teacher",
  },
];
const SkillLevel1 = [
  {
    id: 0,
    name: "Select SkillLevel1",
    value: "",
  },
  {
    id: 1,
    name: "Teacher",
    value: "teacher",
  },
];

function Teacherprofile() {
  const [active, setActive] = useState(tabTypes[0]);
  const [selected1, setSelected1] = useState(Mobileno[0]);
  const [selected2, setSelected2] = useState(Source[0]);
  const [selected3, setSelected3] = useState(Subscription[0]);
  const [selected4, setSelected4] = useState(Availability[0]);
  const [selected5, setSelected5] = useState(Duration[0]);
  const [selected6, setSelected6] = useState(Coupon[0]);
  const [selected7, setSelected7] = useState(SkillLevel[0]);
  const [selected8, setSelected8] = useState(Level[0]);
  const [selected9, setSelected9] = useState(SkillLevel1[0]);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex bg-gray1">
        <Sidebar />
        <div className="w-full">
          <Header />
          <div className="md:p-[34px_45px] sm:p-[25px_35px] p-[14px]">
            <h1 className="text-[30px] font-medium text-nevyblue mb-[21px]">
              Settings
            </h1>

            <div></div>

            <div className="overflow-auto">
              <ButtonGroup>
                {tabTypes.map((type) => (
                  <Tab
                    key={type}
                    active={active === type}
                    onClick={() => setActive(type)}
                    className="bg-white text-primary flex justify-between items-center sm:text-[18px] text-[14px] font-medium p-[16px] w-full max-w-[245px] cursor-pointer border-0 outline-0 text-left whitespace-nowrap"
                  >
                    {type}
                    <BsCheckAll />
                  </Tab>
                ))}
              </ButtonGroup>
            </div>
            <p />

            {active === "Personal Settings" && (
              <div className="bg-white mt-1">
                <div className="flex justify-between items-center flex-wrap gap-[10px] sm:p-[30px] p-[22px_12px] border-b-[2px] border-b-[#F1F1F1]">
                  <h1 className="text-[20px] font-bold text-nevyblue">
                    Personal Settings
                  </h1>
                  <div className="flex items-center gap-[5px]">
                    <BiSolidCheckCircle className="text-secondary" />
                    <p className="text-[14px] text-secondary font-normal mb-0">
                      All Updates Saved as Draft
                    </p>
                  </div>
                </div>

                <div>
                  <div>
                    <div className="flex sm:flex-row flex-col md:p-[30px_30px_0px_30px] p-[12px] xl:gap-[108px] gap-[38px] items-start">
                      <Formik>
                        {({ values }) => (
                          <Form className="w-full">
                            <div className="">
                              <div className="flex flex-col items-center justify-center w-full relative">
                                <label
                                  for="file-upload"
                                  type="file"
                                  className="relative cursor-pointer w-[170px] h-[170px] object-cover shadow-[0px_0px_4px_00000042] rounded-[10px] overflow-hidden border-2 border-gray-300 transition bg-white"
                                >
                                  <img
                                    src={PERSONIMG}
                                    alt=""
                                    className="  rounded-[10px]"
                                  />

                                  <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                  />
                                  <button
                                    type="button"
                                    className="w-full text-[14px] font-bold text-white absolute bottom-0 py-2 flex gap-2 bg-[#000000cc] justify-center rounded-b-[10px]"
                                  >
                                    <div>
                                      <FaUpload />
                                    </div>
                                    Upload Photo
                                  </button>
                                </label>
                              </div>
                            </div>
                            <div className="w-full">
                              <div className="grid xl:grid-cols-2 grid-cols-1 gap-[20px]">
                                <div className=" w-full">
                                  <label className="text-[16px] font-normal text-black">
                                    First Name
                                  </label>
                                  <Field
                                    type="text"
                                    className="w-full p-[12px_16px] border border-gray-300 rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none mt-[5px]"
                                    placeholder="First Name"
                                  />
                                </div>
                                <div className=" w-full ">
                                  <label className="text-[16px] font-normal text-black">
                                    Last Name
                                  </label>
                                  <Field
                                    type="text"
                                    className="w-full p-[12px_16px] border border-gray-300 rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none mt-[5px]"
                                    placeholder="Last Name"
                                  />
                                </div>
                                <div className="w-full ">
                                  <label className="text-[16px] font-normal text-black">
                                    Username
                                  </label>
                                  <Field
                                    type="text"
                                    className="w-full p-[12px_16px] border border-gray-300 rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none mt-[5px]"
                                    placeholder="Username"
                                  />
                                </div>
                                <div className=" w-full ">
                                  <label className="text-[16px] font-normal text-black">
                                    Contact Number
                                  </label>
                                  <div className="flex w-full border border-gray-300 rounded-[4px] mt-[5px]">
                                    <Listbox
                                      className=""
                                      value={selected1}
                                      onChange={(e) => {
                                        setSelected1(e);
                                      }}
                                    >
                                      <div className="relative w-[76px] border-r border-[#ccc] p-[10px] ">
                                        <ListboxButton className="relative w-full placeholder:text-[14px] placeholder:text-secondary focus:outline-none">
                                          <span className="flex items-center">
                                            <span className="block truncate text-secondary">
                                              {selected1.name || "+91"}
                                            </span>
                                          </span>
                                          <span className="pointer-events-none absolute inset-y-0 ml-3 flex items-center pr-2 right-0">
                                            <IoIosArrowDown />
                                          </span>
                                        </ListboxButton>

                                        <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                          {Mobileno.map((person) => (
                                            <ListboxOption
                                              key={person.id}
                                              value={person}
                                              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-primary data-[focus]:text-white"
                                            >
                                              <div className="flex items-center">
                                                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                                  {person.name}
                                                </span>
                                              </div>

                                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                                <CheckIcon
                                                  aria-hidden="true"
                                                  className="h-5 w-5"
                                                />
                                              </span>
                                            </ListboxOption>
                                          ))}
                                        </ListboxOptions>
                                      </div>
                                    </Listbox>
                                    <div>
                                      <Field
                                        type="text"
                                        className="p-[12px_16px]  placeholder:text-[14px] placeholder:text-secondary focus:outline-none w-full"
                                        placeholder="Your Phone number"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className=" w-full">
                                  <label className="text-[16px] font-normal text-black">
                                    Source
                                  </label>
                                  <div className="flex mt-[5px]">
                                    <Listbox
                                      className=""
                                      value={selected2}
                                      onChange={(e) => {
                                        setSelected2(e);
                                      }}
                                    >
                                      <div className="relative  w-full">
                                        <ListboxButton className="relative w-full p-[12px_16px] border border-gray-300 rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none">
                                          <span className="flex items-center">
                                            <span className=" block truncate text-secondary">
                                              {selected2.name ||
                                                "Select a Source"}
                                            </span>
                                          </span>
                                          <span className="pointer-events-none absolute inset-y-0 ml-3 flex items-center pr-2 right-[10px]">
                                            <IoIosArrowDown />
                                          </span>
                                        </ListboxButton>

                                        <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                          {Source.map((person) => (
                                            <ListboxOption
                                              key={person.id}
                                              value={person}
                                              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-primary data-[focus]:text-white"
                                            >
                                              <div className="flex items-center">
                                                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                                  {person.name}
                                                </span>
                                              </div>

                                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                                <CheckIcon
                                                  aria-hidden="true"
                                                  className="h-5 w-5"
                                                />
                                              </span>
                                            </ListboxOption>
                                          ))}
                                        </ListboxOptions>
                                      </div>
                                    </Listbox>
                                  </div>
                                </div>
                                <div className="w-full ">
                                  <label className="text-[16px] font-normal text-black">
                                    Subscription
                                  </label>
                                  <div className="flex mt-[5px]">
                                    <Listbox
                                      className=""
                                      value={selected3}
                                      onChange={(e) => {
                                        setSelected3(e);
                                      }}
                                    >
                                      <div className="relative  w-full">
                                        <ListboxButton className="relative w-full p-[12px_16px] border border-gray-300 rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none">
                                          <span className="flex items-center">
                                            <span className="block truncate text-secondary">
                                              {selected3.name ||
                                                "Select a Subscription"}
                                            </span>
                                          </span>
                                          <span className="pointer-events-none absolute inset-y-0 ml-3 flex items-center pr-2 right-[10px]">
                                            <IoIosArrowDown />
                                          </span>
                                        </ListboxButton>

                                        <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                          {Subscription.map((person) => (
                                            <ListboxOption
                                              key={person.id}
                                              value={person}
                                              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-primary data-[focus]:text-white"
                                            >
                                              <div className="flex items-center">
                                                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                                  {person.name}
                                                </span>
                                              </div>

                                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                                <CheckIcon
                                                  aria-hidden="true"
                                                  className="h-5 w-5"
                                                />
                                              </span>
                                            </ListboxOption>
                                          ))}
                                        </ListboxOptions>
                                      </div>
                                    </Listbox>
                                  </div>
                                </div>
                                <div className=" w-full ">
                                  <label className="text-[16px] font-normal text-black">
                                    Availability
                                  </label>
                                  <div className="flex mt-[5px]">
                                    <Listbox
                                      className=""
                                      value={selected4}
                                      onChange={(e) => {
                                        setSelected4(e);
                                      }}
                                    >
                                      <div className="relative w-full">
                                        <ListboxButton className="relative w-full p-[12px_16px] border border-gray-300 rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none">
                                          <span className="flex items-center">
                                            <span className="block truncate text-secondary">
                                              {selected4.name ||
                                                "Select a Availability"}
                                            </span>
                                          </span>
                                          <span className="pointer-events-none absolute inset-y-0 ml-3 flex items-center pr-2 right-[10px]">
                                            <IoIosArrowDown />
                                          </span>
                                        </ListboxButton>

                                        <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                          {Availability.map((person) => (
                                            <ListboxOption
                                              key={person.id}
                                              value={person}
                                              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-primary data-[focus]:text-white"
                                            >
                                              <div className="flex items-center">
                                                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                                  {person.name}
                                                </span>
                                              </div>

                                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                                <CheckIcon
                                                  aria-hidden="true"
                                                  className="h-5 w-5"
                                                />
                                              </span>
                                            </ListboxOption>
                                          ))}
                                        </ListboxOptions>
                                      </div>
                                    </Listbox>
                                  </div>
                                </div>

                                <div className=" w-full ">
                                  <label className="text-[16px] font-normal text-black">
                                    Start Time
                                  </label>
                                  <div className="relative p-[12px_16px] border border-gray-300 rounded-[4px] mt-[5px]">
                                    <Field
                                      className="w-full  placeholder:text-[14px] placeholder:text-secondary focus:outline-none"
                                      placeholder=" HH:MM:SS"
                                    />
                                    <BiTime className="absolute right-[16px] top-[12px] w-[22px] h-[22px]" />
                                  </div>
                                </div>
                                <div className=" w-full ">
                                  <label className="text-[16px] font-normal text-black">
                                    End Time
                                  </label>
                                  <div className="relative p-[12px_16px] border border-gray-300 rounded-[4px] mt-[5px]">
                                    <Field
                                      className="w-full  placeholder:text-[14px] placeholder:text-secondary focus:outline-none"
                                      placeholder=" HH:MM:SS"
                                    />
                                    <BiTime className="absolute right-[16px] top-[12px] w-[22px] h-[22px]" />
                                  </div>
                                </div>
                                <div className=" w-full ">
                                  <label className="text-[16px] font-normal text-black">
                                    Duration
                                  </label>
                                  <div className="flex mt-[5px]">
                                    <Listbox
                                      className=""
                                      value={selected5}
                                      onChange={(e) => {
                                        setSelected5(e);
                                      }}
                                    >
                                      <div className="relative flex justify-between items-center border border-gray-300 rounded-[4px] w-full">
                                        <Field
                                          type="text"
                                          className="w-full p-[12px_16px]  placeholder:text-[14px] placeholder:text-secondary focus:outline-none"
                                          placeholder="Enter your coupon code"
                                        />
                                        <ListboxButton className="relative w-full  placeholder:text-[14px] placeholder:text-secondary focus:outline-none">
                                          <div className="flex justify-end items-center">
                                            <div className="flex items-center">
                                              <div className="block truncate text-primary text-[16px] font-medium">
                                                {selected5.name || "Day1"}
                                              </div>
                                            </div>
                                            <div className="pointer-events-none inset-y-0 ml-3 flex items-center pr-2 right-[10px]">
                                              <IoIosArrowDown />
                                            </div>
                                          </div>
                                        </ListboxButton>

                                        <ListboxOptions className="absolute z-10 mt-1  w-fit right-0 top-10 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                          {Duration.map((person) => (
                                            <ListboxOption
                                              key={person.id}
                                              value={person}
                                              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-primary data-[focus]:text-white"
                                            >
                                              <div className="flex items-center">
                                                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                                  {person.name}
                                                </span>
                                              </div>

                                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                                <CheckIcon
                                                  aria-hidden="true"
                                                  className="h-5 w-5"
                                                />
                                              </span>
                                            </ListboxOption>
                                          ))}
                                        </ListboxOptions>
                                      </div>
                                    </Listbox>
                                  </div>
                                </div>
                                <div className=" w-full ">
                                  <label className="text-[16px] font-normal text-black">
                                    Coupon Code Offered
                                  </label>
                                  <div className="flex mt-[5px]">
                                    <Listbox
                                      className=""
                                      value={selected6}
                                      onChange={(e) => {
                                        setSelected6(e);
                                      }}
                                    >
                                      <div className="relative  w-full">
                                        <ListboxButton className="relative w-full p-[12px_16px] border border-gray-300 rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none">
                                          <span className="flex items-center">
                                            <span className="block truncate">
                                              {selected6.name ||
                                                "Select a Coupon"}
                                            </span>
                                          </span>
                                          <span className="pointer-events-none absolute inset-y-0 ml-3 flex items-center pr-2 right-[10px]">
                                            <IoIosArrowDown />
                                          </span>
                                        </ListboxButton>

                                        <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                          {Coupon.map((person) => (
                                            <ListboxOption
                                              key={person.id}
                                              value={person}
                                              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-primary data-[focus]:text-white"
                                            >
                                              <div className="flex items-center">
                                                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                                  {person.name}
                                                </span>
                                              </div>

                                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                                <CheckIcon
                                                  aria-hidden="true"
                                                  className="h-5 w-5"
                                                />
                                              </span>
                                            </ListboxOption>
                                          ))}
                                        </ListboxOptions>
                                      </div>
                                    </Listbox>
                                  </div>
                                </div>
                                <div className=" w-full ">
                                  <label className="text-[16px] font-normal text-black">
                                    Coupon Code
                                  </label>
                                  <Field
                                    type="text"
                                    className="w-full p-[12px_16px] border border-gray-300 rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none mt-[5px]"
                                    placeholder="Enter your coupon code"
                                  />
                                </div>
                              </div>
                              <div className="col-span-2 mt-5">
                                <label className="text-[16px] font-normal text-black">
                                  Skills
                                </label>

                                <div className="mt-[5px]">
                                  <div className="relative border border-gray-300 rounded-[4px] flex items-center bg-white1 w-full">
                                    <Field
                                      className="w-full p-[12px_16px]  pr-[150px] placeholder:text-[14px] placeholder:text-secondary relative focus:outline-none"
                                      placeholder="Select  a Skill"
                                    />
                                    <button
                                      type="button"
                                      className="absolute right-[16px] sm:text-[16px] text-[12px] font-medium text-primary"
                                    >
                                      + Add More
                                    </button>
                                  </div>
                                </div>
                                <div className="mt-[17px] flex gap-[12px] items-center flex-wrap">
                                  <button
                                    type="button"
                                    className="text-nevyblue text-[16px] font-medium flex justify-center gap-[10px] items-center border-[1.5px] border-[#273446] rounded-[6px] w-full max-w-[103px] h-9"
                                  >
                                    Dance{" "}
                                    <MdOutlineCancel className="text-red w-[16px] h-[16px]" />
                                  </button>
                                  <button
                                    type="button"
                                    className="text-nevyblue text-[16px] font-medium flex justify-center gap-[10px] items-center border-[1.5px] border-[#273446] rounded-[6px] w-full max-w-[112px] h-9"
                                  >
                                    {" "}
                                    Singing{" "}
                                    <MdOutlineCancel className="text-red w-[16px] h-[16px]" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                  <div className="flex sm:justify-end justify-center :gap-[22px] gap-[12px] sm:p-[30px] p-[12px]">
                    <button
                      type="button"
                      className="  border-[2px] border-[#002060] text-primary hover:bg-primary w-full   max-w-[130px] h-[48px] flex items-center justify-center text-[18px] font-bold hover:text-white rounded-[4px]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className=" border-[2px] border-[#002060] text-primary hover:bg-primary   w-full max-w-[168px] h-[48px] flex items-center justify-center text-[18px] font-bold hover:text-white rounded-[4px]"
                    >
                      Save & Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {active === "Skill Matrix" && (
              <div className="bg-white mt-1">
                <div className="flex justify-between items-center flex-wrap gap-[10px] sm:p-[30px] p-[22px_12px] border-b-[2px] border-b-[#F1F1F1]">
                  <h1 className="text-[20px] font-bold text-nevyblue">
                    Skill Matrix
                  </h1>
                  <div className="flex items-center gap-[5px]">
                    <BiSolidCheckCircle className="text-secondary" />
                    <p className="text-[14px] text-secondary font-normal mb-0">
                      Skill Matrix All Updates Saved as Draft
                    </p>
                  </div>
                </div>
                <div>
                  <div className="sm:p-[30px] p-[12px]">
                    <div className="bg-lightblue p-[15px]">
                      <div className="flex gap-2 justify-between">
                        <h1 className="text-[16px] font-semibold text-lightgray1">
                          Skill 01
                        </h1>
                        <div>
                          <RiDeleteBinLine />
                        </div>
                      </div>
                      <Formik>
                        <Form>
                          <div className="grid md:grid-cols-3 grid-cols-1 gap-[27px] mt-[27px]">
                            <div>
                              <label className="text-[16px] font-normal text-black mb-[5px]">
                                Category
                              </label>
                              <Field
                                type="text"
                                className="w-full p-[0px_16px] h-[42px] border border-[#ABAAAA] rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none mt-[5px]"
                                placeholder="Enter Category"
                              />
                            </div>

                            <div>
                              <label className="text-[16px] font-normal text-black mb-[5px]">
                                Subcategory
                              </label>
                              <Field
                                type="text"
                                className="w-full p-[0px_16px] h-[42px] border border-[#ABAAAA] rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none mt-[5px]"
                                placeholder="Enter Subcategory"
                              />
                            </div>

                            <div>
                              <label className="text-[16px] font-normal text-black mb-[5px]">
                                Art Form
                              </label>
                              <Field
                                type="text"
                                className="w-full p-[0px_16px] h-[42px] border border-[#ABAAAA] rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none mt-[5px]"
                                placeholder="Enter Art Form"
                              />
                            </div>

                            <div className="">
                              <label className="text-[16px] font-normal text-black mb-[5px]">
                                Skill Level
                              </label>
                              <div className="mt-[5px]">
                                <Listbox
                                  className=""
                                  value={selected7}
                                  onChange={(e) => {
                                    setSelected7(e);
                                  }}
                                >
                                  <div className="relative w-full">
                                    <ListboxButton className="relative w-full p-[0px_16px] h-[42px] border border-[#ABAAAA] rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none bg-white">
                                      <span className="flex items-center">
                                        <span className="block truncate text-secondary">
                                          {selected7.name ||
                                            "Select a Subscription"}
                                        </span>
                                      </span>
                                      <span className="pointer-events-none absolute inset-y-0 ml-3 flex items-center pr-2 right-[10px]">
                                        <IoIosArrowDown />
                                      </span>
                                    </ListboxButton>

                                    <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                      {SkillLevel.map((person) => (
                                        <ListboxOption
                                          key={person.id}
                                          value={person}
                                          className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-primary data-[focus]:text-white"
                                        >
                                          <div className="flex items-center">
                                            <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                              {person.name}
                                            </span>
                                          </div>

                                          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                            <CheckIcon
                                              aria-hidden="true"
                                              className="h-5 w-5"
                                            />
                                          </span>
                                        </ListboxOption>
                                      ))}
                                    </ListboxOptions>
                                  </div>
                                </Listbox>
                              </div>
                            </div>
                            <div className=" ">
                              <label className="text-[16px] font-normal text-black mb-[5px]">
                                Level
                              </label>
                              <div className="mt-[5px]">
                                <Listbox
                                  className=""
                                  value={selected8}
                                  onChange={(e) => {
                                    setSelected8(e);
                                  }}
                                >
                                  <div className="relative w-full">
                                    <ListboxButton className="relative w-full p-[0px_16px] h-[42px] border border-[#ABAAAA] rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none bg-white">
                                      <span className="flex items-center">
                                        <span className="block truncate text-secondary">
                                          {selected8.name ||
                                            "Select a Subscription"}
                                        </span>
                                      </span>
                                      <span className="pointer-events-none absolute inset-y-0 ml-3 flex items-center pr-2 right-[10px]">
                                        <IoIosArrowDown />
                                      </span>
                                    </ListboxButton>

                                    <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                      {Level.map((person) => (
                                        <ListboxOption
                                          key={person.id}
                                          value={person}
                                          className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-primary data-[focus]:text-white"
                                        >
                                          <div className="flex items-center">
                                            <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                              {person.name}
                                            </span>
                                          </div>

                                          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                            <CheckIcon
                                              aria-hidden="true"
                                              className="h-5 w-5"
                                            />
                                          </span>
                                        </ListboxOption>
                                      ))}
                                    </ListboxOptions>
                                  </div>
                                </Listbox>
                              </div>
                            </div>
                          </div>
                        </Form>
                      </Formik>
                    </div>
                    <div className="sm:p-[36px_30px] p-[36px_0px] flex justify-center">
                      <button
                        type="button"
                        className="text-[16px] font-medium text-primary max-w-[287px] w-full h-[45px] border-2 border-[#002060] rounded-md flex justify-center items-center gap-[10px]"
                      >
                        <div>
                          <BiPlus className="w-[15px] h-[15px]" />
                        </div>
                        Add Skill
                      </button>
                    </div>
                  </div>
                  <div className="flex sm:justify-end justify-center sm:gap-[22px] gap-[12px] sm:p-[30px] p-[12px] pb-8">
                    <button
                      type="button"
                      className="  border-[2px] border-[#002060] text-primary hover:bg-primary w-full  max-w-[130px] h-[48px] flex items-center justify-center text-[18px] font-bold hover:text-white rounded-[4px]"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className=" border-[2px] border-[#002060] text-primary hover:bg-primary w-full max-w-[168px] h-[48px] flex items-center justify-center text-[18px] font-bold hover:text-white rounded-[4px]"
                    >
                      Save & Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {active === "Fee Structure" && (
              <div className="bg-white mt-1 ">
                <div className="flex justify-between items-center flex-wrap gap-[10px] sm:p-[30px] p-[22px_12px] border-b-[2px] border-b-[#F1F1F1]">
                  <h1 className="text-[20px] font-bold text-nevyblue">
                    Fee Structure
                  </h1>
                  <div className="flex items-center gap-[5px]">
                    <BiSolidCheckCircle className="text-secondary" />
                    <p className="text-[14px] text-secondary font-normal mb-0">
                      All Updates Saved as Draft
                    </p>
                  </div>
                </div>
                <div>
                  <div className="sm:p-[30px] p-[12px]">
                    <div className="bg-lightblue p-[15px]">
                      <div className="flex gap-2 justify-between">
                        <h1 className="text-[16px] font-semibold text-lightgray1">
                          Skill 01
                        </h1>
                        <div>
                          <RiDeleteBinLine />
                        </div>
                      </div>
                      <Formik>
                        <Form>
                          <div className="grid md:grid-cols-3 grid-cols-1 gap-[27px] mt-[27px]">
                            <div>
                              <label className="text-[16px] font-normal text-black mb-[5px]">
                                Art Form
                              </label>
                              <Field
                                type="text"
                                className="w-full p-[0px_16px] h-[42px] border border-[#ABAAAA] rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none mt-[5px]"
                                placeholder="Enter Art Form"
                              />
                            </div>

                            <div>
                              <label className="text-[16px] font-normal text-black mb-[5px]">
                                Skill Level
                              </label>
                              <div className="mt-[5px]">
                                <Listbox
                                  className=""
                                  value={selected9}
                                  onChange={(e) => {
                                    setSelected9(e);
                                  }}
                                >
                                  <div className="relative w-full">
                                    <ListboxButton className="relative w-full p-[0px_16px] h-[42px] border border-[#ABAAAA] rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none bg-white">
                                      <span className="flex items-center">
                                        <span className="block truncate text-secondary">
                                          {selected9.name ||
                                            "Select a Subscription"}
                                        </span>
                                      </span>
                                      <span className="pointer-events-none absolute inset-y-0 ml-3 flex items-center pr-2 right-[10px]">
                                        <IoIosArrowDown />
                                      </span>
                                    </ListboxButton>

                                    <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                      {SkillLevel1.map((person) => (
                                        <ListboxOption
                                          key={person.id}
                                          value={person}
                                          className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-primary data-[focus]:text-white"
                                        >
                                          <div className="flex items-center">
                                            <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                              {person.name}
                                            </span>
                                          </div>

                                          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                            <CheckIcon
                                              aria-hidden="true"
                                              className="h-5 w-5"
                                            />
                                          </span>
                                        </ListboxOption>
                                      ))}
                                    </ListboxOptions>
                                  </div>
                                </Listbox>
                              </div>
                            </div>

                            <div>
                              <label className="text-[16px] font-normal text-black mb-[5px]">
                                Fee/hr
                              </label>
                              <div className="flex justify-between items-center p-[0px_16px] h-[42px] border border-[#ABAAAA] bg-white rounded-[4px] placeholder:text-[14px] mt-[5px] placeholder:text-secondary focus:outline-none">
                                <div className="flex gap-3">
                                  {" "}
                                  <img src={DOLLAR} alt="" />
                                  <Field
                                    type="text"
                                    placeholder="Course Fee"
                                    className=" flex-grow outline-none placeholder:text-[14px] placeholder:text-secondary focus:outline-none w-full"
                                  />
                                </div>

                                <div className="text-[12px] text-black font-normal ">
                                  USD
                                </div>
                              </div>
                            </div>
                          </div>
                        </Form>
                      </Formik>
                    </div>
                  </div>
                  <div className="flex sm:justify-end justify-center sm:gap-[22px] gap-[12px] sm:p-[30px] p-[12px] pb-8">
                    <button
                      type="button"
                      className="  border-[2px] border-[#002060] text-primary hover:bg-primary w-full  max-w-[130px] h-[48px] flex items-center justify-center sm:text-[18px] text-[14px] font-bold hover:text-white rounded-[4px]"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className=" border-[2px] border-[#002060] text-primary hover:bg-primary w-full max-w-[224px] h-[48px] flex items-center justify-center sm:text-[18px] text-[14px] font-bold hover:text-white rounded-[4px]"
                      onClick={() => setOpen(true)}
                    >
                      Submit For Review
                    </button>
                  </div>
                </div>
              </div>
            )}
            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              className="relative z-10"
            >
              <DialogBackdrop
                transition
                className="fixed inset-0 bg-[#0000004d] transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
              />

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <DialogPanel
                    transition
                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full max-w-[925px] data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                  >
                    <div className="bg-white sm:p-[104px_80px_87px_80px] p-[46px_12px]">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <div className="flex justify-center">
                          <img src={CHECK} alt="" />
                        </div>
                        <DialogTitle
                          as="h3"
                          className="text-[24px] font-bold text-black mb-[32px] mt-[25px] text-center"
                        >
                          All Set!
                        </DialogTitle>
                        <div className="mt-2">
                          <p className="sm:text-[24px] text-[18px] font-normal text-secondary mb-[52px] text-center">
                            Your profile has been successfully Created.
                          </p>
                        </div>
                        <div className="flex justify-center">
                          <button className="text-[20px] font-bold text-white max-w-[174px] w-full h-[45px] bg-primary rounded-lg">
                            Done
                          </button>
                        </div>{" "}
                      </div>
                    </div>
                  </DialogPanel>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}

export default Teacherprofile;
