import React from 'react'
import login from "../assets/Images/login_img.png"

function CommonPart({ text }) {
    return (
        <div className=" bg-primary md:w-[50%] relative hidden md:flex justify-center items-center w-full">
            <div className="md:max-w-[346px] lg:max-w-[465px] w-full mx-auto md:h-[463px] lg:h-[607px] bg-[#ffffffb3] rounded-[40px]">
                <h2 className="md:text-[25px] lg:text-[32px] font-bold text-center  pt-[73px] px-[31px]">
                    {text}
                </h2>

            </div>
            <img src={login} alt="" className='absolute bottom-0 right-0 h-auto md:h-[480px] xl:h-[550px]' />
        </div>
    )
}

export default CommonPart