import React from "react";
import { Link } from "react-router-dom";
import {motion,useScroll, useTransform } from "framer-motion";

const RecipeCard = (props) => {


  let {scrollY} = useScroll();
  let y =  useTransform(scrollY, [0,250],["0%","50%"]);
  return (
    <motion.div className="py-6 px-7 bg-white border border-gray-200 shadow-lg rounded-lg cursor-pointer" whileHover={{ scale: 1.1 }}>
      <a>
        <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
          {props.recipe.recipeName}
        </h5>
      </a>
      <p className="mb-4 font-normal text-gray-700 dark:text-gray-400 line-clamp-3 text">
        {props.recipe.instructions}
      </p>
      <Link to={"/fullrecipe"}
          onClick={() => {
          props.setRecipe(props.recipe);
          sessionStorage.setItem("message","BACK TO RECIPES");
          sessionStorage.setItem("route","/recipes")
        }} 
      className="relative items-center justify-start inline-block px-3 py-2 overflow-hidden font-bold rounded-md group ">
      <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-opacity-10 "></span>
      <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-black opacity-100 group-hover:-translate-x-8"></span>
      <span className="inline-flex items-center relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">
        Read More
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
      </span>
      <span className="absolute inset-0 border border-black rounded-md"></span>
      </Link>
    </motion.div>
  );
};

export default RecipeCard;
