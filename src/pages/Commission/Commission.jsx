import { useState } from "react";
import CommonLayout from "../../components/common/CommonLayout";

const Commission = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");

  const users = [
    {
      username: "Revanth",
      role: "Teacher",
      email: "riyas@gmail.com",
      weekly: true,
      monthly: false,
      perTransaction: false,
      remark:
        "As per the teacher’s request, I have changed the plan from Monthly to Silver",
    },
    {
      username: "Riyas",
      role: "Student",
      email: "riyas@gmail.com",
      weekly: false,
      monthly: false,
      perTransaction: false,
      remark: "— — —",
    },
    {
      username: "John",
      role: "Teacher",
      email: "john@gmail.com",
      weekly: false,
      monthly: false,
      perTransaction: true,
      remark: "— — —",
    },
    {
      username: "Gowtham",
      role: "Student",
      email: "gowtham@gmail.com",
      weekly: true,
      monthly: false,
      perTransaction: false,
      remark:
        "As per the teacher’s request, I have changed the plan from Monthly to Silver",
    },
  ];

  return (
    <CommonLayout title={"Commission"}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="p-4">
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search"
              className="border p-2 rounded w-1/3"
            />
            <select
              className="border p-2 rounded"
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">Status</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Per transaction">Per transaction</option>
            </select>
          </div>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">USERNAME</th>
                <th className="border p-2">ROLE</th>
                <th className="border p-2">MAIL ID</th>
                <th className="border p-2">WEEKLY</th>
                <th className="border p-2">MONTHLY</th>
                <th className="border p-2">PER TRANSACTION</th>
                <th className="border p-2">REMARK</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{user.username}</td>
                  <td className="border p-2">{user.role}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.weekly ? "✔" : ""}</td>
                  <td className="border p-2">{user.monthly ? "✔" : ""}</td>
                  <td className="border p-2">
                    {user.perTransaction ? "✔" : ""}
                  </td>
                  <td className="border p-2">{user.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CommonLayout>
  );
};

export default Commission;
