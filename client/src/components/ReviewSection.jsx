import React from 'react'
import { Link } from 'react-router-dom';

const ReviewSection = (props) => {
  return (
    <div className="relative block rounded-sm border-t-4 border-yellow-500 p-4 shadow-lg sm:p-6 lg:p-8">
      <div className="flex items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-yellow-500 sm:h-8 sm:w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>

        <h3 className="text-lg font-bold sm:text-lg truncate">
          {props.review.review}
        </h3>
      </div>

      <div className="flex gap-2 mt-4">
        <p className=" text-sm text-yellow-500 font-bold">{"reviewed on "}</p>
        <Link
          to={"/recipes"}
          className="text-sm text-gray-500 hover:font-bold cursor-pointer truncate transition-all"
        >
          {props.review.recipename + ">"}
        </Link>
      </div>
      <div className="flex justify-between mt-4">
        <p className="text-xs font-medium text-left truncate text-gray-500 bg-yellow-300 px-3 rounded-sm">
          {props.review.date}
        </p>
        <p className="text-xs font-medium text-left truncate text-gray-500 bg-yellow-300 rounded-sm px-2">
          {props.review.time}
        </p>
      </div>
    </div>
  );
};


export default ReviewSection