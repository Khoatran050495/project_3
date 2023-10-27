import React, { useState } from "react";

const Teststart = () => {
  const [rating, setRating] = useState(0);

  const handleVote = (newRating) => {
    if (newRating === rating) {
      // Nếu người dùng nhấp vào ngôi sao đã được chọn, giảm điểm
      setRating(rating - 1);
    } else {
      // Nếu người dùng nhấp vào ngôi sao chưa được chọn, cập nhật điểm mới
      setRating(newRating);
    }
  };
  return (
    <div>
      <div>
        <h2>Đánh giá sao: {rating}/5</h2>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleVote(star)}
              style={{ cursor: "pointer" }}
            >
              {star <= rating ? (
                <i className="fa-solid fa-star" style={{ color: "#ffbb00" }} />
              ) : (
                <i
                  className="fa-regular fa-star"
                  style={{ color: "#ffbb00" }}
                />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teststart;
