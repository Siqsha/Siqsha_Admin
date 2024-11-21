import React, { useState } from "react";
import { BiSolidCheckCircle, BiPlus, BiTime, BiCheck } from "react-icons/bi";
import { MdOutlineCancel, MdOutlineCalendarMonth } from "react-icons/md";
import { FaUpload } from "react-icons/fa6";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import styled from "styled-components";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import { CheckIcon } from "@heroicons/react/20/solid";
import { IoIosArrowDown } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import PERSONIMG from "../../../assets/Images/person.png";
import { BsCheckAll, BsArrowLeft, BsArrowRight } from "react-icons/bs";
import VISACARD from "../../../assets/Images/VisaCard.png";
import VISACARD1 from "../../../assets/Images/VisaCard1.png";
import VISA from "../../../assets/Images/Visa.png";
import CARD from "../../../assets/Images/card.png";
import PAYPAL from "../../../assets/Images/PayPal.png";
import { AiOutlinePlusCircle } from "react-icons/ai";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import CHECK from "../../../assets/Images/check.png";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { PiCircleFill } from "react-icons/pi";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

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
const Interest = [
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

function Studentprofile() {
  const [active, setActive] = useState(tabTypes[0]);
  const [selected2, setSelected2] = useState(Source[0]);
  const [selected3, setSelected3] = useState(Interest[0]);
  const [selected4, setSelected4] = useState(Availability[0]);
  const [selected5, setSelected5] = useState(Duration[0]);
  const [selected7, setSelected7] = useState(SkillLevel[0]);
  const [selected8, setSelected8] = useState(Level[0]);
  const [skills, setSkills] = useState([]);
  const [preview, setPreview] = useState(PERSONIMG);
  const [open, setOpen] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    source: "",
    contactNumber: "",
    areaOfInterest: "",
    availability: "",
    duration: "",
    startTime: "",
    endTime: "",
    skill: [],
    profileImage: null,
  };

  const handleAddSkill = (values, setFieldValue) => {
    if (values.skill) {
      setSkills([...skills, values.skill]);
      setFieldValue("skill", "");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required")
      .max(50, "First name must be at most 50 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .max(50, "Last name must be at most 50 characters"),
    userName: Yup.string()
      .required("Username is required")
      .max(30, "Username must be at most 30 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    startTime: Yup.string().required("Start time is required"),
    endTime: Yup.string().required("End time is required"),
    skills: Yup.array().min(1, "At least one skill is required"),
  });

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFieldValue("profileImage", file);
    }
  };

  const images = [VISACARD, VISACARD1];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

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
                    className="bg-white text-primary flex justify-between items-center gap-[25px] sm:text-[18px] text-[14px] font-medium p-[16px] w-full max-w-[245px] cursor-pointer border-0 outline-0 text-left whitespace-nowrap"
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
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                          console.log("Form Values:", values);
                        }}
                      >
                        {({ values, setFieldValue }) => (
                          <Form className="w-full">
                            <div className="flex">
                              <div className="flex justify-start w-full relative">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer w-[170px] h-[170px] object-cover shadow-[0px_0px_4px_00000042] rounded-[10px] overflow-hidden border-2 border-gray-300 transition bg-white"
                                >
                                  <img
                                    src={preview}
                                    alt="Profile Preview"
                                    className="rounded-[10px] w-full h-full object-cover"
                                  />
                                  <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleFileChange(e, setFieldValue)
                                    }
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

                              <div className="w-full">
                                <div className="grid xl:grid-cols-2 grid-cols-1 gap-[20px]">
                                  <div className=" w-full">
                                    <label className="text-[16px] font-normal text-black">
                                      First Name
                                    </label>
                                    <Field
                                      name="firstName"
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
                                      name="lastName"
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
                                      name="userName"
                                      className="w-full p-[12px_16px] border border-gray-300 rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none mt-[5px]"
                                      placeholder="Username"
                                    />
                                  </div>
                                  <div className=" w-full ">
                                    <label className="text-[16px] font-normal text-black">
                                      Contact Number
                                    </label>
                                    <div className="flex w-full border border-gray-300 rounded-[4px] mt-[5px]">
                                      <PhoneInput
                                        country={"us"}
                                        value={values.contactNumber}
                                        onChange={(phone) =>
                                          setFieldValue("contactNumber", phone)
                                        }
                                        inputStyle={{
                                          width: "100%",
                                          padding: "12px 16px",
                                          borderRadius: "4px",
                                          border: "1px solid #ccc",
                                        }}
                                        dropdownStyle={{
                                          borderRadius: "4px",
                                          boxShadow:
                                            "0 4px 8px rgba(0, 0, 0, 0.1)",
                                        }}
                                        searchPlaceholder="Search for a country"
                                        enableSearch={true}
                                      />
                                    </div>
                                  </div>
                                  <div className="w-full ">
                                    <label className="text-[16px] font-normal text-black">
                                      Email ID
                                    </label>
                                    <Field
                                      type="text"
                                      name="email"
                                      className="w-full p-[12px_16px] border border-gray-300 rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none mt-[5px]"
                                      placeholder="user@amtex.com"
                                    />
                                  </div>
                                  <div className="w-full">
                                    <label className="text-[16px] font-normal text-black">
                                      Source
                                    </label>
                                    <div className="flex mt-[5px]">
                                      <Listbox
                                        name="source"
                                        value={selected2}
                                        onChange={(value) => {
                                          setSelected2(value);
                                          setFieldValue("source", value);
                                        }}
                                      >
                                        <div className="relative w-full">
                                          <ListboxButton className="relative w-full p-[12px_16px] border border-gray-300 rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none">
                                            <span className="flex items-center">
                                              <span className="block truncate">
                                                {selected2 && selected2.name
                                                  ? selected2.name
                                                  : "Select a Source"}
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
                                      Area Of Interest
                                    </label>
                                    <div className="flex mt-[5px]">
                                      <Listbox
                                        className=""
                                        name="areaOfInterest"
                                        value={selected3}
                                        onChange={(e) => {
                                          setSelected3(e);
                                          setFieldValue("areaOfInterest", e);
                                        }}
                                      >
                                        <div className="relative  w-full">
                                          <ListboxButton className="relative w-full p-[12px_16px] border border-gray-300 rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none">
                                            <span className="flex items-center">
                                              <span className="block truncate">
                                                {selected3.name || "Select"}
                                              </span>
                                            </span>
                                            <span className="pointer-events-none absolute inset-y-0 ml-3 flex items-center pr-2 right-[10px]">
                                              <IoIosArrowDown />
                                            </span>
                                          </ListboxButton>

                                          <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {Interest.map((person) => (
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
                                        name="availability"
                                        value={selected4}
                                        onChange={(e) => {
                                          setSelected4(e);
                                          setFieldValue("availability", e);
                                        }}
                                      >
                                        <div className="relative w-full">
                                          <ListboxButton className="relative w-full p-[12px_16px] border border-gray-300 rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none">
                                            <span className="flex items-center">
                                              <span className="block truncate">
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
                                        name="startTime"
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
                                        name="endTime"
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
                                          setFieldValue("duration", e);
                                        }}
                                      >
                                        <div className="relative flex justify-between items-center border border-gray-300 rounded-[4px] w-full">
                                          <Field
                                            name="duration"
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
                                </div>
                                <div className="col-span-2 mt-5">
                                  <label className="text-[16px] font-normal text-black">
                                    Skills
                                  </label>
                                  <div className="mt-[5px]">
                                    <div className="relative border border-gray-300 rounded-[4px] flex items-center bg-white1 w-full">
                                      <Field
                                        name="skill"
                                        className="w-full p-[12px_16px] pr-[150px] placeholder:text-[14px] placeholder:text-secondary relative focus:outline-none"
                                        placeholder="Select a Skill"
                                      />
                                      <button
                                        type="button"
                                        className="absolute right-[16px] sm:text-[16px] text-[12px] font-medium text-primary"
                                        onClick={() =>
                                          handleAddSkill(values, setFieldValue)
                                        }
                                      >
                                        + Add More
                                      </button>
                                    </div>
                                  </div>
                                  <div className="mt-[17px] flex gap-[12px] items-center flex-wrap">
                                    {skills.map((skill, index) => (
                                      <button
                                        key={index}
                                        type="button"
                                        className="text-nevyblue text-[16px] font-medium flex justify-center gap-[10px] items-center border-[1.5px] border-[#273446] rounded-[6px] h-9"
                                      >
                                        {skill}
                                        <MdOutlineCancel
                                          className="text-red w-[16px] h-[16px] cursor-pointer"
                                          onClick={() =>
                                            handleRemoveSkill(skill)
                                          }
                                        />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex sm:justify-end justify-center :gap-[22px] gap-[12px] sm:p-[30px] p-[12px]">
                              <button className="border-[2px] border-[#002060] text-primary hover:bg-primary w-full   max-w-[130px] h-[48px] flex items-center justify-center text-[18px] font-bold hover:text-white rounded-[4px]">
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className=" border-[2px] border-[#002060] text-primary hover:bg-primary   w-full max-w-[168px] h-[48px] flex items-center justify-center text-[18px] font-bold hover:text-white rounded-[4px]"
                              >
                                Save & Next
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
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
                                            "Select a  Skill Level"}
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
                                          {selected8.name || "Select a Level"}
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
                    <div className="border border-[#ABAAAA] sm:p-[22px_38px_40px_38px] p-[16px]">
                      <h1 className="text-[24px] font-semibold text-black mb-[25px]">
                        Plan
                      </h1>
                      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[36px]">
                        <div className="shadow-[0px_0px_12px_#8db3ff33] p-[21px_29px] bg-white border border-white rounded-lg hover:bg-[#8db3ff33] hover:border hover:border-[#002060]">
                          <PiCircleFill className="w-[25px] h-[25px] text-primary" />
                          <h1 className="font-medium text-[18px] text-black my-[13px]">
                            One Time Fee
                          </h1>
                          <p className="sm:text-[18px] text-[16px] font-normal text-lightgray2 mb-[14px]">
                            Pay and register for lifetime
                          </p>
                          <h2 className="text-[18px] font-normal text-primary">
                            5$
                          </h2>
                        </div>
                        <div className="shadow-[0px_0px_12px_#8db3ff33] p-[21px_29px] bg-white border border-white rounded-lg hover:bg-[#8db3ff33] hover:border hover:border-[#002060]">
                          <MdOutlineCalendarMonth className="w-[25px] h-[25px] text-primary" />
                          <h1 className="font-medium text-[18px] text-black my-[13px]">
                            Monthly
                          </h1>
                          <p className="sm:text-[18px] text-[16px] font-normal text-lightgray2 mb-[14px]">
                            Pay per Month for 5 months
                          </p>
                          <h2 className="text-[18px] font-normal text-primary">
                            1$
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="grid xl:grid-cols-2 grid-cols-1 gap-[24px]">
                      <div className="mt-[18px]">
                        <div className="border border-[#ABAAAA] sm:p-[36px] p-[16px]">
                          <h1 className="text-[24px] font-medium text-black mb-[19px]">
                            Plan
                          </h1>
                          <div>
                            <div>
                              <img
                                src={images[currentIndex]}
                                alt="Card"
                                className="w-full"
                              />
                            </div>
                            <div className="flex items-center justify-between mt-[19px]">
                              <div className="flex gap-[5px]">
                                {images.map((_, index) => (
                                  <span
                                    key={index}
                                    className={`w-3 h-3 rounded-full ${
                                      index === currentIndex
                                        ? "bg-primary"
                                        : "bg-lightblue"
                                    }`}
                                  ></span>
                                ))}
                              </div>

                              <div className="flex gap-[16px]">
                                <button
                                  onClick={prevImage}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  <BsArrowLeft className="w-[22px] h-[22px]" />
                                </button>
                                <button
                                  onClick={nextImage}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  <BsArrowRight className="w-[22px] h-[22px]" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div class="w-full mt-[40px]">
                            <label
                              for="dropzone-file"
                              class="flex items-center justify-center w-full  border-[3px] border-[#ABAAAA] h-[147px] border-dashed "
                            >
                              <div class="flex items-center justify-center gap-2">
                                <AiOutlinePlusCircle className="w-[31px] h-[31px] text-primary" />
                                <p className="text-[18px] font-normal text-black">
                                  Add new card
                                </p>
                              </div>
                              <input
                                id="dropzone-file"
                                type="file"
                                class="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="mt-[18px]">
                        <div className="border border-[#ABAAAA] sm:p-[36px_36px_132px_36px] p-[16px_16px_132px_16px]">
                          <h1 className="text-[24px] font-medium text-black mb-[13px]">
                            Payment Method
                          </h1>
                          <p className="text-[16px] font-normal text-secondary mb-[22px]">
                            Payment method:
                          </p>
                          <div>
                            <div className="w-full border-[2px] border-[#ABAAAA] p-[5px] group hover:border-[#36BF1B]">
                              <div className="flex sm:gap-[14px] gap-[12px] justify-between items-center  ">
                                <img
                                  src={VISA}
                                  alt=""
                                  className="sm:w-[60px] w-[38px] sm:h-[27px] h-[18px]"
                                />
                                <div className="flex gap-[17px]">
                                  <p className="sm:text-[14px] text-[10px] text-black font-normal mb-0 ">
                                    4855 **** **** ****
                                  </p>
                                  <p className="sm:text-[14px] text-[10px] text-black font-normal mb-0">
                                    04/24
                                  </p>
                                  <p className="sm:text-[14px] text-[10px] text-black font-normal mb-0 ">
                                    Revanth T
                                  </p>
                                </div>
                                <div className="w-[20px] h-[20px] rounded-full flex items-center justify-center group-hover:bg-[#36BF1B]">
                                  <BiCheck className=" text-white" />
                                </div>
                              </div>
                            </div>
                            <div className="w-full border-[2px] border-[#ABAAAA] p-[5px] group hover:border-[#36BF1B] mt-[25px]">
                              <div className="flex sm:gap-[14px] gap-[12px] justify-between items-center  ">
                                <img
                                  src={CARD}
                                  alt=""
                                  className="sm:w-[53px] w-[38px] sm:h-[27px] h-[23px]"
                                />
                                <div className="flex gap-[17px]">
                                  <p className="sm:text-[14px] text-[10px] text-black font-normal mb-0 ">
                                    4855 **** **** ****
                                  </p>
                                  <p className="sm:text-[14px] text-[10px] text-black font-normal mb-0 ">
                                    04/24
                                  </p>
                                  <p className="sm:text-[14px] text-[10px] text-black font-normal mb-0 ">
                                    Revanth T
                                  </p>
                                </div>
                                <div className="w-[20px] h-[20px] rounded-full flex items-center justify-center group-hover:bg-[#36BF1B]">
                                  <BiCheck className=" text-white" />
                                </div>
                              </div>
                            </div>
                            <div className="w-full border-[2px] border-[#ABAAAA] p-[5px] group hover:border-[#4a5648] mt-[25px]">
                              <div className="flex gap-[4px] justify-between items-center  ">
                                <img
                                  src={PAYPAL}
                                  alt=""
                                  className="sm:w-[29px] w-[22px] sm:h-[37px] h-[28px]"
                                />
                                <div>
                                  <p className="text-[11px] text-nevyblue font-normal mb-0">
                                    You will be redirected to the PayPal site
                                    after reviewing your order.
                                  </p>
                                </div>
                                <div className="w-[20px] h-[20px] rounded-full flex items-center justify-center group-hover:bg-[#36BF1B]">
                                  <BiCheck className=" text-white" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="sm:p-[17px_35px] p-[23px_0]">
                          <div className="flex justify-between items-center">
                            <div>
                              <h1 className="sm:text-[36px] text-[26px] text-nevyblue font-normal">
                                $5
                              </h1>
                              <p className="sm:text-[20px] text-[16px] font-normal text-secondary mb-0">
                                Total
                              </p>
                            </div>
                            <button className="bg-primary text-white max-w-[120px] w-full h-[46px] flex justify-center items-center rounded sm:text-[20px] text-[16px]">
                              Pay Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex sm:justify-end justify-center sm:gap-[22px] gap-[12px] sm:p-[30px_30px_32px_30px] p-[12px]">
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

export default Studentprofile;
