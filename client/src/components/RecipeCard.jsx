import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = (props) => {
  return (
    <div className="max-w-xl xl:max-w-5xl p-6 bg-white border border-gray-200 shadow-lg ">
      <a>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {props.recipe.recipeName}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate overflow-hidden text">
        {props.recipe.instructions}
      </p>
      <Link
        to={"/fullrecipe"}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#75c9b7] hover:bg-[#abd699] focus:ring-4 focus:outline-none focus:ring-blue-300"
        onClick={() => {
          props.setRecipe(props.recipe);
          sessionStorage.setItem("message","BACK TO RECIPES");
          sessionStorage.setItem("route","/recipes")
        }}
      >
        Read more
        <svg
          aria-hidden="true"
          className="w-4 h-4 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </Link>
    </div>
  );
};

export default RecipeCard;
