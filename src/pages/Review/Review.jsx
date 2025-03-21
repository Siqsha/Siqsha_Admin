import React, { useState, useEffect } from "react";
import CommonLayout from "../../components/common/CommonLayout";
import { FaReplyAll, FaStar } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { formatReviewDate } from "../../utils/util";
import { getAllReviews } from "../services/apis/reviews";
import AnswerModal from "../../model/AnswerModal";
import ReviewSkeleton from "../../components/skeleton/ReviewSkeleton";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await getAllReviews(currentPage);
      setReviews(response.reviews);

      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [currentPage]);

  const handleOpenModal = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  const handleReviewUpdate = (reviewId, answer) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review._id === reviewId ? { ...review, answer } : review
      )
    );
    fetchReviews();
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <CommonLayout title={"Feedback"}>
      <div className="px-4 sm:px-6 lg:px-4">
        {isLoading ? (
          <ReviewSkeleton />
        ) : reviews.length === 0 ? (
          <>No Feedbacks Found</>
        ) : (
          <section>
            {reviews.map((review) => (
              <div key={review?._id} className=" bg-white">
                <div className="border-b border-gray-300 rounded-lg sm:p-6 pb-4 p-4">
                  <div className="flex gap-[8px] lg:gap-[15px]">
                    <div>
                      <div className="flex items-center gap-[8x] mb-[8px]">
                        <div className="font-semibold md:text-xl text-base text-gray-600">
                          {`${review.reviewerId?.firstName} ${review.reviewerId?.lastName}`}
                        </div>

                        <div className="text-gray-500">
                          <BsDot className="text-2xl" />
                        </div>
                        <div className="text-gray-500 mb-0">
                          {formatReviewDate(review?.createdAt)}
                        </div>
                      </div>

                      <div className="flex mb-3">
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <FaStar
                              key={i}
                              className={`w-5 h-5 ${
                                i < review?.rating
                                  ? "text-yellow"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                      </div>

                      <p className="text-gray-600">{review?.feedback}</p>

                      {review.answer && (
                        <div className="mt-2 text-base font-medium text-gray-600 flex gap-2 items-center pl-4">
                          Answer:<p className="font-normal">{review?.answer}</p>
                        </div>
                      )}
                      {!review.answer && (
                        <button
                          className="mt-3 bg-primary text-white px-3 py-1 rounded text-lg flex gap-2 items-center"
                          onClick={() => handleOpenModal(review)}
                        >
                          <FaReplyAll />
                          Reply
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {totalPages > 1 && (
              <div className="flex items-center justify-end gap-6 mt-6 pb-3">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`px-4 py-2 text-sm font-medium text-white bg-primary rounded ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Previous
                </button>
                <span className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`px-4 py-2 text-sm font-medium text-white bg-primary rounded ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </section>
        )}
      </div>

      <AnswerModal
        open={isModalOpen}
        onClose={handleCloseModal}
        review={selectedReview}
        onSubmit={handleReviewUpdate}
      />
    </CommonLayout>
  );
};

export default Review;
