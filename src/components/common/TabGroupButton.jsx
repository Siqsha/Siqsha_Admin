// import { TabGroup } from "@headlessui/react";
import React from "react";
import { BsCheckAll } from "react-icons/bs";
import styled from "styled-components";

const ButtonGroup = styled.div`
  display: flex;
`;

const Tab = styled.button`
  ${({ active }) =>
    active &&
    `
    border-bottom: 3px solid #002060;
    opacity: 1;
  `}
`;

const TabGroupButton = ({ tabTypes, active, setActive }) => {
  return (
    <ButtonGroup>
      {tabTypes.map((type) => (
        <Tab
          key={type}
          active={active === type}
          onClick={() => setActive(type)}
          className="bg-white text-primary items-center sm:text-[18px] gap-[10px] text-[14px] font-medium p-[16px] w-full max-w-[245px] cursor-pointer border-0 outline-0 text-center whitespace-nowrap"
        >
          {type}
        </Tab>
      ))}
    </ButtonGroup>
  );
};

export default TabGroupButton;
