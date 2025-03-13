import { useEffect, useState } from "react";
import CommonLayout from "../../components/common/CommonLayout";
import { getCommissionList } from "../services/apis/userApi";
import CommissionModal from "../../model/CommissionModal";

const Commission = () => {
  // const [selectedStatus, setSelectedStatus] = useState("All");
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchCommissionUsers = async () => {
    try {
      const response = await getCommissionList();
      if (response.users) {
        setUsers(response.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchCommissionUsers();
  }, []);

  const handleAddCommission = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <CommonLayout title={"Commission"}>
      <div className="mt-8 flow-root bg-white">
        <div className="md:p-8 p-4">
          {/* <div className="flex justify-end mb-4 mt-4">
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
              <option value="Per transaction">Per Class</option>
            </select>
          </div> */}
          <div className=" overflow-auto mt-4">
            <table className="min-w-full ">
              <thead>
                <tr className="bg-[#D9D9D9]">
                  <th className="p-2 text-[#524C4C]">USER NAME</th>
                  <th className="p-2 text-[#524C4C]">ROLE</th>
                  <th className="p-2 text-[#524C4C]">EMAIL</th>
                  <th className="p-2 text-[#524C4C]">PER CLASS</th>
                  <th className="p-2 text-[#524C4C]">MONTHLY</th>
                  <th className="p-2 text-[#524C4C]">YEARLY</th>
                  {/* <th className="border p-2">REMARK</th>*/}
                  <th className="p-2 text-[#524C4C] ">ACTION</th>
                </tr>
              </thead>
              <tbody className=" text-center ">
                {users?.map((user, index) => (
                  <tr key={index} className="text-center ">
                    <td className="text-[#524C4C] px-2 py-4 ">
                      {user.user.firstName} {user.user.lastName}
                    </td>
                    <td className="text-[#524C4C] px-2 py-4">
                      {user.user.role}
                    </td>
                    <td className="text-[#524C4C] px-2 py-4">
                      {user.user.email}
                    </td>
                    <td className="text-[#524C4C] px-2 py-4">
                      <input
                        type="checkbox"
                        checked={user.commission === "perclass" ? "✔" : ""}
                        className="accent-primary w-[24px] h-[24px] rounded-[4px]"
                        readOnly
                      />
                    </td>
                    <td className="text-[#524C4C] px-2 py-4">
                      <input
                        type="checkbox"
                        checked={user.commission === "monthly" ? "✔" : ""}
                        className="accent-primary w-[24px] h-[24px] rounded-[4px]"
                        readOnly
                      />
                    </td>
                    <td className="text-[#524C4C] px-2 py-4">
                      <input
                        type="checkbox"
                        checked={user.commission === "yearly" ? "✔" : ""}
                        className="accent-primary w-[24px] h-[24px] rounded-[4px]"
                        readOnly
                      />
                    </td>

                    <td className="px-2 py-4">
                      <button
                        className="bg-primary text-white px-3 py-1 rounded  transition"
                        onClick={() => handleAddCommission(user)}
                      >
                        Add Commission
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <CommissionModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        selectedUser={selectedUser}
      />
    </CommonLayout>
  );
};

export default Commission;
