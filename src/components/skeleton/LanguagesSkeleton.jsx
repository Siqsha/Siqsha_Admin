import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function LanguagesSkeleton() {
  return (
    <div>
      {[...Array(7)].map((_, index) => (
        <div key={index} className="flex justify-between items-center py-4">
          <div className="flex-1 pl-4 pr-3 text-lg font-medium text-gray-900 sm:pl-0">
            <Skeleton height={20} width="60%" />
          </div>
          <div className="flex justify-center items-center gap-2">
            <button
              disabled
              type="button"
              className="text-red bg-white border-gray-300 border-2 w-[38px] h-[38px] rounded-md flex justify-center items-center"
            >
              <Skeleton circle width={20} height={20} />
            </button>
            <button
              disabled
              type="button"
              className="font-medium text-primary w-[38px] h-[38px] border-2 border-gray-300 rounded-md flex justify-center items-center gap-[10px]"
            >
              <Skeleton circle width={20} height={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LanguagesSkeleton;
