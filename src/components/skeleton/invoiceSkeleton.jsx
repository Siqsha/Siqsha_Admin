import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const InvoiceSkeleton = ({ loading, data }) => {
  return (
    <div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    {loading ? <Skeleton height={20} width={100} /> : "Name"}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {loading ? <Skeleton height={20} width={100} /> : "Email"}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {loading ? (
                      <Skeleton height={20} width={100} />
                    ) : (
                      "Class Name"
                    )}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {loading ? <Skeleton height={20} width={100} /> : "Amount"}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {loading ? (
                      <Skeleton height={20} width={100} />
                    ) : (
                      "Invoice Date"
                    )}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {(loading ? [...Array(8)] : data)?.map((_, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center space-x-4">
                        {loading ? (
                          <Skeleton circle height={48} width={48} />
                        ) : (
                          <img
                            src={
                              data[index]?.profileImage ||
                              "/path/to/default-avatar.jpg"
                            }
                            alt="profile"
                            className="rounded-full"
                            height={48}
                            width={48}
                          />
                        )}
                        <div className="space-y-2">
                          {loading ? (
                            <>
                              <Skeleton height={15} width={120} />
                              <Skeleton height={15} width={80} />
                            </>
                          ) : (
                            <>
                              <div>{data[index]?.name}</div>
                              <div>{data[index]?.email}</div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {loading ? (
                        <Skeleton height={20} width={150} />
                      ) : (
                        data[index]?.email
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {loading ? (
                        <Skeleton height={20} width={120} />
                      ) : (
                        data[index]?.className
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {loading ? (
                        <Skeleton height={20} width={100} />
                      ) : (
                        `$${data[index]?.amount}`
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {loading ? (
                        <Skeleton height={20} width={80} />
                      ) : (
                        data[index]?.invoiceDate
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSkeleton;
