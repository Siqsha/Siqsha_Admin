import React from "react";

const ReviewSkeleton = ({ count = 3 }) => {
  return (
    <>
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="border-b border-slate-100 rounded-lg sm:p-6 pb-4 p-4 animate-pulse bg-slate-300 mb-4"
          >
            <div className="flex gap-[8px] lg:gap-[15px]">
              <div>
                {/* Name and Date Skeleton */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-32 h-5 bg-slate-100 rounded-md"></div>{" "}
                  {/* Name */}
                  <div className="w-3 h-3 bg-slate-100 rounded-full"></div>{" "}
                  {/* Dot */}
                  <div className="w-24 h-4 bg-slate-100 rounded-md"></div>{" "}
                  {/* Date */}
                </div>

                {/* Star Rating Skeleton */}
                <div className="flex gap-3 mb-3">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 bg-slate-100 rounded-md"
                      ></div>
                    ))}
                </div>

                {/* Feedback Skeleton */}
                <div className="w-full h-5 bg-slate-100 rounded-md mb-2"></div>

                {/* Reply Button Skeleton */}
                <div className="mt-3 w-24 h-8 bg-slate-100 rounded-md"></div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ReviewSkeleton;
