import React from "react";
import LOGINIMAGE from "../assets/Images/LoginImage.png";

function CommonPart() {
    return (
        <div className="bg-white md:w-[50%] relative  sm:flex hidden justify-center items-center">
            <div className="absolute bottom-0 right-0  w-full h-full">
                <img src={LOGINIMAGE} alt="" className=" w-full h-full object-cover" />
            </div>
        </div>
    );
}

export default CommonPart;
