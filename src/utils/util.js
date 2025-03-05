
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const formatReviewDate = (createdAt) => {
    const reviewDate = dayjs(createdAt);
    const now = dayjs();

    if (now.diff(reviewDate, "month") >= 1) {
        return reviewDate.format("DD-MM-YYYY");
    }
    return reviewDate.fromNow();
};