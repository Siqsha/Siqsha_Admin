import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CouponTableSkeleton = ({ rows = 6 }) => {
  return (
    <div>
      <div className="mt-8 flow-root">
        <div className="bg-white p-6   mt-4">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    {[...Array(6)].map((_, i) => (
                      <th
                        key={i}
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        <Skeleton height={20} width={100} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-center">
                  {[...Array(rows)].map((_, index) => (
                    <tr key={index}>
                      {[...Array(6)].map((__, colIndex) => (
                        <td
                          key={colIndex}
                          className="whitespace-nowrap px-3 py-5 text-sm text-gray-500"
                        >
                          <Skeleton height={20} width={120} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponTableSkeleton;
