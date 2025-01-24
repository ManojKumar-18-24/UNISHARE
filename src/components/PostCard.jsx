import React from "react";

const PostCard = ({ title, image, model, from, to, price }) => {
  return (
    <div className="flex flex-row bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Image Section */}
      <div className="w-1/3">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        {/* Title */}
        <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>

        {/* Model */}
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-semibold text-gray-700">Model:</span> {model}
        </p>

        {/* Timings */}
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <p>
            <span className="font-semibold text-gray-700">From:</span>{" "}
            {new Date(from).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold text-gray-700">To:</span>{" "}
            {new Date(to).toLocaleString()}
          </p>
        </div>

        {/* Price */}
        <p className="text-sm font-semibold text-green-600">
          Price: ${price}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
