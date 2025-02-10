import React from "react";
import { Link } from "react-router-dom";
import service  from "../appwrite/config";
const PostCard = ({id, title, image, model, starting_time, ending_time, price }) => {
  return (
    <Link to = {`/post/${id}`} >
    <div className="flex flex-row bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Image Section */}
      <div className="w-1/3">
        <img
          src={service.getFilePreview(image)}
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
            {new Date(starting_time).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold text-gray-700">To:</span>{" "}
            {new Date(ending_time).toLocaleString()}
          </p>
        </div>

        {/* Price */}
        <p className="text-sm font-semibold text-green-600">
          Price: ${price}
        </p>
      </div>
    </div>
    </Link>
  );
};

export default PostCard;
