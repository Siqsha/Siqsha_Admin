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
// import DOLLAR from "../../../assets/Images/dollar.png";
// import PERSONIMG from "../../../assets/Images/person.png";
import { BsCheckAll } from "react-icons/bs";
import Sidebar from "../../../client/src/createnewcourse/components/Sidebar";
import Header from "../../../client/src/createnewcourse/components/Header";

const Date = [
    {
        id: 0,
        name: "Select Date",
        value: "",
    },
    {
        id: 1,
        name: "Teacher",
        value: "teacher",
    },
];

const Time = [
    {
        id: 0,
        name: "Select Date",
        value: "",
    },
    {
        id: 1,
        name: "Teacher",
        value: "teacher",
    },
];
const Session = [
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
const ClassType = [
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
const Artform = [
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
const SkillLevel = [
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
const Course = [
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
const Optional = [
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
const tabTypes = ["Basic Information", "Advance Information", "Curriculum"];


function CreateNewCourse() {

    const [active, setActive] = useState(tabTypes[0]);
    const [charCount, setCharCount] = useState(0);
    const [charCount1, setCharCount1] = useState(0);
    const [selected, setSelected] = useState(SkillLevel[0]);
    const [selected1, setSelected1] = useState(Artform[0]);
    const [selected2, setSelected2] = useState(Session[0]);
    const [selected3, setSelected3] = useState(ClassType[0]);
    const [selected4, setSelected4] = useState(Course[0]);
    const [selected5, setSelected5] = useState(Optional[0]);

    const maxChars = 80;

    const handleInputChange = (e) => {
        setCharCount(e.target.value.length);
    };

    const maxChars1 = 120;

    const handleInputChange1 = (e) => {
        setCharCount1(e.target.value.length);
    };

    return (
        <>
            <div className="flex bg-gray1">
                <Sidebar />
                <div className="w-full">
                    <Header />
                    {/* <div className="md:p-[34px_45px] sm:p-[25px_35px] p-[14px]">
                        <h1 className="text-[30px] font-medium text-nevyblue mb-[23px]">
                            My Schedule
                        </h1>

                        <Formik>
                            <Form>
                                <div className="flex justify-between items-end ">
                                    <div className="flex gap-[27px] mt-[27px]">

                                        <div className="">
                                            <label className="text-[16px] font-normal text-black ">
                                                Select Date
                                            </label>
                                            <div className="mt-[5px]">
                                                <Listbox
                                                    className=""
                                                    value={selected}
                                                    onChange={(e) => {
                                                        setSelected(e);
                                                    }}
                                                >
                                                    <div className="relative w-full lg:min-w-[233px] min-w-[165px]">
                                                        <ListboxButton className="relative w-full p-[0px_16px] h-[42px] border border-[#ABAAAA] rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none bg-white">
                                                            <span className="flex items-center">
                                                                <span className="block truncate text-secondary">
                                                                    {selected.name ||
                                                                        "Select Date"}
                                                                </span>
                                                            </span>
                                                            <span className="pointer-events-none absolute inset-y-0 ml-3 flex items-center pr-2 right-[10px]">
                                                                <IoIosArrowDown />
                                                            </span>
                                                        </ListboxButton>

                                                        <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                            {Date.map((person) => (
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
                                            <label className="text-[16px] font-normal text-black">
                                                Time Zone
                                            </label>
                                            <div className="mt-[5px]">
                                                <Listbox
                                                    className=""
                                                    value={selected1}
                                                    onChange={(e) => {
                                                        setSelected1(e);
                                                    }}
                                                >
                                                    <div className="relative w-full lg:min-w-[233px] min-w-[165px]">
                                                        <ListboxButton className="relative w-full p-[0px_16px] h-[42px] border border-[#ABAAAA] rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none bg-white">
                                                            <span className="flex items-center">
                                                                <span className="block truncate text-secondary">
                                                                    {selected1.name ||
                                                                        "Select Date"}
                                                                </span>
                                                            </span>
                                                            <span className="pointer-events-none absolute inset-y-0 ml-3 flex items-center pr-2 right-[10px]">
                                                                <IoIosArrowDown />
                                                            </span>
                                                        </ListboxButton>

                                                        <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                            {Time.map((person) => (
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
                                    <button className="text-[18px] font-normal text-white w-[201px] h-[48px] flex justify-center items-center bg-primary">Setup a New Class​</button>
                                </div>
                            </Form>
                        </Formik>


                    </div> */}
                    <div className="md:p-[34px_45px] sm:p-[25px_35px] p-[14px]">
                        <h1 className="text-[30px] font-medium text-nevyblue mb-[21px]">
                            Settings
                        </h1>

                        <div></div>

                        <div className='overflow-auto'>
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

                        {active === "Basic Information" && (
                            <div className="bg-white mt-1">
                                <div className="flex justify-between items-center flex-wrap gap-[10px] sm:p-[30px] p-[22px_12px] border-b-[2px] border-b-[#F1F1F1]">
                                    <h1 className="text-[20px] font-bold text-nevyblue">
                                        Basic Information
                                    </h1>
                                </div>



                                <div className="w-full sm:p-[30px] p-[12px]">

                                    {/* <div className="flex flex-col">
                                        
                                        <label htmlFor="class-title" className="text-sm font-medium text-gray-700">
                                            Class Title
                                        </label>

                                        
                                        <div className="relative mt-1">
                                            <input
                                                type="text"
                                                id="class-title"
                                                placeholder="Your class title"
                                                maxLength={maxChars}
                                                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                                                onChange={handleInputChange}
                                            />
                                            
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 text-sm">
                                                {charCount}/{maxChars}
                                            </div>
                                        </div>
                                    </div> */}
                                    <Formik>
                                        <Form className="w-full">
                                            <div>
                                                <div>
                                                    <label className="text-[16px] font-normal text-black">
                                                        Class Title
                                                    </label>

                                                    <div className="relative mt-[5px] border border-gray-300 rounded-[4px]">
                                                        <input
                                                            type="text"
                                                            id="class-title"
                                                            placeholder="Your class title"
                                                            maxLength={maxChars}
                                                            className="block w-full p-[12px_16px]   focus:outline-none placeholder:text-[14px] placeholder:text-secondary"
                                                            onChange={handleInputChange}
                                                        />

                                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 text-sm">
                                                            {charCount}/{maxChars}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-[18px]">
                                                    <label className="text-[16px] font-normal text-black">
                                                        Subtittle
                                                    </label>

                                                    <div className="relative mt-[5px] border border-gray-300 rounded-[4px]">
                                                        <input
                                                            type="text"
                                                            id="class-title"
                                                            placeholder="Your Subtittle"
                                                            maxLength={maxChars1}
                                                            className="block w-full p-[12px_16px]   focus:outline-none placeholder:text-[14px] placeholder:text-secondary"
                                                            onChange={handleInputChange1}
                                                        />

                                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 text-sm">
                                                            {charCount1}/{maxChars1}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-[18px]">
                                                    <label className="text-[16px] font-normal text-black">
                                                        Username
                                                    </label>
                                                    <div className="relative border border-gray-300 rounded-[4px] flex items-center bg-white1 w-full mt-[5px]">
                                                        <Field
                                                            className="w-full p-[12px_16px]  pr-[150px] placeholder:text-[14px] placeholder:text-secondary relative focus:outline-none"
                                                            placeholder="Add Username"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="absolute right-[16px] sm:text-[16px] text-[12px] font-medium text-primary"
                                                        >
                                                            + Add More
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="grid lg:grid-cols-2 grid-cols-1 gap-[20px] mt-[18px]">
                                                    <div >
                                                        <label className="text-[16px] font-normal text-black mb-[5px]">
                                                            Session
                                                        </label>
                                                        <div className="mt-[5px]">
                                                            <Listbox
                                                                className=""
                                                                value={selected3}
                                                                onChange={(e) => {
                                                                    setSelected3(e);
                                                                }}
                                                            >
                                                                <div className="relative w-full">
                                                                    <ListboxButton className="relative w-full p-[0px_16px] h-[42px] border border-[#ABAAAA] rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none bg-white">
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
                                                                        {Session.map((person) => (
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
                                                    <div >
                                                        <label className="text-[16px] font-normal text-black mb-[5px]">
                                                            Class Type
                                                        </label>
                                                        <div className="mt-[5px]">
                                                            <Listbox
                                                                className=""
                                                                value={selected2}
                                                                onChange={(e) => {
                                                                    setSelected2(e);
                                                                }}
                                                            >
                                                                <div className="relative w-full">
                                                                    <ListboxButton className="relative w-full p-[0px_16px] h-[42px] border border-[#ABAAAA] rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none bg-white">
                                                                        <span className="flex items-center">
                                                                            <span className="block truncate text-secondary">
                                                                                {selected2.name ||
                                                                                    "Select a Subscription"}
                                                                            </span>
                                                                        </span>
                                                                        <span className="pointer-events-none absolute inset-y-0 ml-3 flex items-center pr-2 right-[10px]">
                                                                            <IoIosArrowDown />
                                                                        </span>
                                                                    </ListboxButton>

                                                                    <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                        {ClassType.map((person) => (
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
                                                    <div >
                                                        <label className="text-[16px] font-normal text-black mb-[5px]">
                                                            Artform
                                                        </label>
                                                        <div className="mt-[5px]">
                                                            <Listbox
                                                                className=""
                                                                value={selected1}
                                                                onChange={(e) => {
                                                                    setSelected1(e);
                                                                }}
                                                            >
                                                                <div className="relative w-full">
                                                                    <ListboxButton className="relative w-full p-[0px_16px] h-[42px] border border-[#ABAAAA] rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none bg-white">
                                                                        <span className="flex items-center">
                                                                            <span className="block truncate text-secondary">
                                                                                {selected1.name ||
                                                                                    "Select a Subscription"}
                                                                            </span>
                                                                        </span>
                                                                        <span className="pointer-events-none absolute inset-y-0 ml-3 flex items-center pr-2 right-[10px]">
                                                                            <IoIosArrowDown />
                                                                        </span>
                                                                    </ListboxButton>

                                                                    <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                        {Artform.map((person) => (
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
                                                    <div >
                                                        <label className="text-[16px] font-normal text-black mb-[5px]">
                                                            Skill Level
                                                        </label>
                                                        <div className="mt-[5px]">
                                                            <Listbox
                                                                className=""
                                                                value={selected}
                                                                onChange={(e) => {
                                                                    setSelected(e);
                                                                }}
                                                            >
                                                                <div className="relative w-full">
                                                                    <ListboxButton className="relative w-full p-[0px_16px] h-[42px] border border-[#ABAAAA] rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none bg-white">
                                                                        <span className="flex items-center">
                                                                            <span className="block truncate text-secondary">
                                                                                {selected.name ||
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

                                                    <div className=" w-full ">
                                                        <label className="text-[16px] font-normal text-black">
                                                            Date
                                                        </label>
                                                        <div className="relative p-[12px_16px] border border-gray-300 rounded-[4px] mt-[5px]">
                                                            <Field
                                                                className="w-full  placeholder:text-[14px] placeholder:text-secondary focus:outline-none"
                                                                placeholder="Select Date"
                                                            />
                                                            <BiTime className="absolute right-[16px] top-[12px] w-[22px] h-[22px]" />
                                                        </div>
                                                    </div>

                                                    <div className=" w-full ">
                                                        <label className="text-[16px] font-normal text-black">
                                                            Time
                                                        </label>
                                                        <div className="relative p-[12px_16px] border border-gray-300 rounded-[4px] mt-[5px]">
                                                            <Field
                                                                className="w-full  placeholder:text-[14px] placeholder:text-secondary focus:outline-none"
                                                                placeholder="Select Time"
                                                            />
                                                            <BiTime className="absolute right-[16px] top-[12px] w-[22px] h-[22px]" />
                                                        </div>
                                                    </div>
                                                    <div >
                                                        <label className="text-[16px] font-normal text-black mb-[5px]">
                                                            Course Language
                                                        </label>
                                                        <div className="mt-[5px]">
                                                            <Listbox
                                                                className=""
                                                                value={selected4}
                                                                onChange={(e) => {
                                                                    setSelected4(e);
                                                                }}
                                                            >
                                                                <div className="relative w-full">
                                                                    <ListboxButton className="relative w-full p-[0px_16px] h-[42px] border border-[#ABAAAA] rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none bg-white">
                                                                        <span className="flex items-center">
                                                                            <span className="block truncate text-secondary">
                                                                                {selected4.name ||
                                                                                    "Select a Subscription"}
                                                                            </span>
                                                                        </span>
                                                                        <span className="pointer-events-none absolute inset-y-0 ml-3 flex items-center pr-2 right-[10px]">
                                                                            <IoIosArrowDown />
                                                                        </span>
                                                                    </ListboxButton>

                                                                    <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                        {Course.map((person) => (
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
                                                    <div >
                                                        <label className="text-[16px] font-normal text-black mb-[5px]">
                                                            Language (Optional)
                                                        </label>
                                                        <div className="mt-[5px]">
                                                            <Listbox
                                                                className=""
                                                                value={selected5}
                                                                onChange={(e) => {
                                                                    setSelected5(e);
                                                                }}
                                                            >
                                                                <div className="relative w-full">
                                                                    <ListboxButton className="relative w-full p-[0px_16px] h-[42px] border border-[#ABAAAA] rounded-[4px] placeholder:text-[14px] placeholder:text-secondary focus:outline-none bg-white">
                                                                        <span className="flex items-center">
                                                                            <span className="block truncate text-secondary">
                                                                                {selected5.name ||
                                                                                    "Select a Subscription"}
                                                                            </span>
                                                                        </span>
                                                                        <span className="pointer-events-none absolute inset-y-0 ml-3 flex items-center pr-2 right-[10px]">
                                                                            <IoIosArrowDown />
                                                                        </span>
                                                                    </ListboxButton>

                                                                    <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                        {Optional.map((person) => (
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
                                            </div>
                                        </Form>
                                    </Formik>

                                    <div className="mt-[28px]">
                                        <div className="flex sm:gap-[12px] gap-[7px]">
                                            <input
                                                type="checkbox"
                                                className="w-[22px] h-[22px] rounded-[4px] bg-primary flex justify-center items-center accent-primary "
                                            />
                                            <h1 className="sm:text-[16px] text-[12px] font-normal text-black">Recurrence : <span className="sm:text-[16px] text-[12px] font-normal text-secondary">Automated reminders for upcoming classes, deadlines, and meetings.</span></h1>
                                        </div>
                                        <div className="flex sm:gap-[12px] gap-[7px] mt-[15px]">
                                            <input
                                                type="checkbox"
                                                className="w-[22px] h-[22px] rounded-[4px] bg-primary flex justify-center items-center accent-primary "
                                            />
                                            <h1 className="sm:text-[16px] text-[12px] font-normal text-black">Sync to calendar : <span className="sm:text-[16px] text-[12px] font-normal text-secondary">Ensures all team members have up-to-date schedules, improving coordination and reducing missed meetings</span></h1>
                                        </div>
                                    </div>


                                    <div className="flex sm:justify-end justify-center sm:gap-[22px] gap-[12px] sm:mt-[68px] mt-[48px]">
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

                        {active === "Advance Information" && (
                            <div className="bg-white mt-1">
                                <div className="flex justify-between items-center flex-wrap gap-[10px] sm:p-[30px] p-[22px_12px] border-b-[2px] border-b-[#F1F1F1]">
                                    <h1 className="text-[20px] font-bold text-nevyblue">
                                        Advance Information
                                    </h1>
                                </div>
                            </div>
                        )}

                        {active === "Curriculum" && (
                            <div className="bg-white mt-1 ">
                                <div className="flex justify-between items-center flex-wrap gap-[10px] sm:p-[30px] p-[22px_12px] border-b-[2px] border-b-[#F1F1F1]">
                                    <h1 className="text-[20px] font-bold text-nevyblue">
                                        Curriculum
                                    </h1>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateNewCourse;
