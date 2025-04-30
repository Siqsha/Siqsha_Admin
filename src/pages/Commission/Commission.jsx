import { useEffect, useState } from "react";
import CommonLayout from "../../components/common/CommonLayout";
import { getCommissionSummary } from "../services/apis/userApi";
import UserImage from "../../assets/Images/UserImage.png";

const Commission = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);

  const fetchCommissionSummary = async (page = 1) => {
    try {
      setLoading(true);
      const res = await getCommissionSummary(page);
      setData(res.data);
      setPagination({
        currentPage: res.currentPage,
        totalPages: res.totalPages,
      });
    } catch (error) {
      console.error("Error fetching commission summary:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommissionSummary(pagination.currentPage);
  }, []);

  const handlePageChange = (newPage) => {
    fetchCommissionSummary(newPage);
  };

  return (
    <CommonLayout title={"Commission"}>
      <div className="mt-8 flow-root bg-white">
        <div className="md:p-8 p-4">
          <div className=" overflow-auto mt-4">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0 whitespace-nowrap"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0 whitespace-nowrap"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0 whitespace-nowrap"
                  >
                    Class Name
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0 whitespace-nowrap"
                  >
                    Total Admin Fee
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0 whitespace-nowrap"
                  >
                    Teacher Receives
                  </th>
                  {/* <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0 whitespace-nowrap"
                  >
                    Invoice Count
                  </th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white text-center">
                {!loading && data?.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap  py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="size-11 shrink-0">
                            <img
                              alt="profile"
                              src={item._id.profileImageUrl || UserImage}
                              className="size-11 rounded-full"
                              onError={(e) => (e.target.src = UserImage)}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900 capitalize">
                              {item._id.firstName} {item._id.lastName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 ">
                        {item._id.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 capitalize ">
                        {item._id.classTitle}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 capitalize">
                        {item?._id.symbolNative} {item.totalAdminFee}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 capitalize">
                        {item?._id.symbolNative} {item.totalTeacherReceives}
                      </td>
                      {/* <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 capitalize">
                        {item.count}
                      </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center">
                      {loading ? "Loading..." : "No data available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-end gap-6 mt-6 pb-3">
            <button
              disabled={pagination.currentPage === 1}
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              className={`px-4 py-2 text-sm font-medium text-white bg-primary rounded ${
                pagination.currentPage === 1 && "opacity-50 cursor-not-allowed"
              }`}
            >
              Previous
            </button>
            <span className="text-sm font-medium">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              disabled={pagination.currentPage === pagination.totalPages}
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              className={`px-4 py-2 text-sm font-medium text-white bg-primary rounded ${
                pagination.currentPage === pagination.totalPages &&
                "opacity-50 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default Commission;
