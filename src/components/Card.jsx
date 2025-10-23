import React from "react";

const Card = ({ values }) => {
  return (
    <div className="w-[300px] h-[350px] border-2 rounded hover:border-gray-600">
      <img
        src={values.thumbnail}
        className="w-full h-full object-cover rounded"
        alt=""
      />
    </div>
  );
};

export default Card;
