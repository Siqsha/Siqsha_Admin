import React, { useEffect, useState } from "react";
import CommonLayout from "../../../../components/common/CommonLayout";

// import { getAllUsers } from "../../../services/apis/userApi";
// import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
  // const dispatch = useDispatch();
  // const [totalStudents, setTotalStudents] = useState(0);
  // const [totalTeachers, setTotalTeachers] = useState(0);

  // useEffect(() => {
  //   const fetchCounts = async () => {
  //     try {
  //       const studentsResponse = await dispatch(
  //         getAllUsers("student", true, 1)
  //       );
  //       console.log("studentsResponse-=0=-0=", studentsResponse);
  //       const teachersResponse = await dispatch(
  //         getAllUsers("teacher", true, 1)
  //       );

  //       // Access pagination from the action response (since your API returns totalUsers in pagination)
  //       setTotalStudents(studentsResponse.pagination.totalUsers);
  //       setTotalTeachers(teachersResponse.pagination.totalUsers);
  //     } catch (error) {
  //       console.error("Error fetching user counts:", error);
  //     }
  //   };

  //   fetchCounts();
  // }, [dispatch]);

  return (
    <CommonLayout title={"Dashboard"}>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <div className="bg-white p-4 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold">Total Students</h3>
          <p className="text-3xl font-bold mt-2">{totalStudents}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold">Total Teachers</h3>
          <p className="text-3xl font-bold mt-2">{totalTeachers}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold">Active Users</h3>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold">Monthly Revenue</h3>
          <p className="text-3xl font-bold mt-2">$14,200</p>
        </div>
      </div> */}
    </CommonLayout>
  );
}

export default Dashboard;
