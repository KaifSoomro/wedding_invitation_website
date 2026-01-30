import React from "react";

const Card = ({ values }) => {
  // Fallback to backgroundImage if thumbnail is not available
  const imageUrl = values.thumbnail || values.backgroundImage;
  
  return (
    <div className="w-[300px] h-[350px] border-2 rounded hover:border-gray-600">
      {imageUrl ? (
        <img
          src={imageUrl}
          className="w-full h-full object-cover rounded"
          alt={values.name || "Template"}
          onError={(e) => {
            // Fallback to a placeholder if image fails to load
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}
      <div 
        className="w-full h-full rounded bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center text-gray-500"
        style={{ display: imageUrl ? 'none' : 'flex' }}
      >
        <div className="text-center">
          <p className="text-lg font-semibold">{values.name}</p>
          <p className="text-sm mt-2">No preview available</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
