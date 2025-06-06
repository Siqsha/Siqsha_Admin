import React, { useEffect, useState } from "react";
import CommonLayout from "../../../../components/common/CommonLayout";
import { getTotalUsers } from "../../../services/apis/userApi";
import Training from "../../../../../src/assets/Images/teacher.png";
import Bg from "../../../../../src/assets/Images/bg-01.png";

function Dashboard() {
  // const [users, setUsers] = useState();

  // const fetchUsers = async () => {
  //   try {
  //     const response = await getTotalUsers();
  //     if (response.success) {
  //       setUsers(response.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  return (
    <CommonLayout title={"Dashboard"}>
      {/* <div>
        <div className="flex mt-4 rounded-[10px] justify-between  items-center bg-[#1a3978] shadow-lg">
          <div className="py-4 px-4">
            <h2 className="md:text-[24px] sm:text-[20px] text-[18px] mb-1  text-white font-medium">
              Hello ,
            </h2>
            <p className="text-[16px] italic text-white">Have a Good Day !</p>
          </div>
          <div>
            {/* <IoClose className="text-4xl" /> 
            <img src={Bg} alt="bg" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-4 mt-6 2xl:gap-6 gap-0">
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
              <div className="bg-[#0284c7] flex  items-center gap-4 md:pl-6 sm:pl-4 pl-6 2xl:py-8 py-4 w-full rounded-[10px] shadow-lg">
                <div className="bg-white rounded-full p-4">
                  <img
                    src={Training}
                    alt="Training"
                    className="md:w-[40px] w-[30px] object-cover"
                  />
                </div>
                <div>
                  <p className="text-white text-[18px]">
                    {users?.totalStudents}
                  </p>
                  <h2 className="text-white lg:text-[18px] sm:text-[16px] text-[18px] font-medium">
                    Total Students
                  </h2>
                </div>
              </div>
              <div className="bg-[#ea580c] flex items-center gap-4 md:pl-6 sm:pl-4 pl-6 2xl:py-8 py-4  w-full rounded-[10px] shadow-lg">
                <div className="bg-white rounded-full p-4">
                  <img
                    src={Training}
                    alt="Graduated"
                    className="md:w-[40px] w-[30px] object-cover"
                  />
                </div>
                <div>
                  <p className="text-white text-[18px]">
                    {users?.totalTeachers}
                  </p>
                  <h2 className="text-white whitespace-nowrap lg:text-[18px] sm:text-[16px] text-[18px] font-medium">
                    Total Teachers
                  </h2>
                </div>
              </div>
              <div className="bg-[#f43f5e] flex  items-center gap-4 md:pl-6 sm:pl-4 pl-6 2xl:py-8 py-4  w-full rounded-[10px] shadow-lg">
                <div className="bg-white rounded-full p-4">
                  <img
                    src={Training}
                    alt="Salary"
                    className="md:w-[40px] w-[30px] object-cover"
                  />
                </div>
                <div>
                  <p className="text-white text-[18px]">
                    {users?.activeStudents + users?.activeTeachers}
                  </p>
                  <h2 className="text-white lg:text-[18px] sm:text-[16px] text-[18px] font-medium">
                    Active Users
                  </h2>
                </div>
              </div>
              <div className="bg-[#b77df5] flex  items-center gap-4 md:pl-6 sm:pl-4 pl-6 2xl:py-8 py-4  w-full rounded-[10px] shadow-lg">
                <div className="bg-white rounded-full p-4">
                  <img
                    src={Training}
                    alt="Salary"
                    className="md:w-[40px] w-[30px] object-cover"
                  />
                </div>
                <div>
                  <p className="text-white text-[18px]">
                    {users?.totalClasses}
                  </p>
                  <h2 className="text-white lg:text-[18px] sm:text-[16px] text-[18px] font-medium">
                    Total Class
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </CommonLayout>
  );
}

export default Dashboard;
