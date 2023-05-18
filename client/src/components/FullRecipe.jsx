import React, { useState } from "react";
import { Link } from "react-router-dom";
import Reviews from "./Reviews";
import recipeBG from "../recipe_page_bg2.jpg"

const FullRecipe = (props) => {
  const [info, setInfo] = useState({
    message: sessionStorage.getItem("message"),
    route: sessionStorage.getItem("route"),
  });

  const [showReviews,setShowReviews] = useState(false);

  return (
    <div className="flex items-center justify-center bg-cover bg-fixed min-h-screen" style={{backgroundImage: `url(${recipeBG})`}}>
      <div>
        <div className="max-w-4xl px-10 py-6 mt-2 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <p className="text-base md:text-sm text-yellow-500 font-bold">
              &lt;{" "}
              <Link
                to={`${info.route}`}
                className="text-base md:text-sm text-yellow-500 font-bold no-underline hover:underline"
              >
                {info.message}
              </Link>
            </p>
            <a className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-green-500 cursor-pointer">
              {props.recipe.course}
            </a>
          </div>

          <div className="mt-2">
            <a
              className="text-2xl text-gray-700 font-bold hover:text-gray-600"
              href="#"
            >
              {props.recipe.recipeName}
            </a>
            <p className="mt-2 text-sm font-semibold text-gray-600">
              {props.recipe.ingredients}
            </p>
            <p className="mt-2 text-gray-600 border p-2 rounded-md">
              {props.recipe.instructions}
            </p>
          </div>
          <div className="mt-8 mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Prep. Time
              </label>
              <p className="appearance-none block w-full bg-grey-lighter text-grey-darker px-1 mb-3">
                {props.recipe.prepTimeInMins + " mins"}
              </p>
            </div>
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Cook Time
              </label>
              <p className="appearance-none block w-full bg-grey-lighter text-grey-darker px-1 mb-3">
                {props.recipe.cookTimeInMins + " mins"}
              </p>
            </div>
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Total Time
              </label>
              <p className="appearance-none block w-full bg-grey-lighter text-grey-darker px-1 mb-3">
                {props.recipe.totalTimeInMins + " mins"}
              </p>
            </div>
          </div>
          <div className="mt-8 mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Cuisine
              </label>
              <p className="appearance-none block w-full bg-grey-lighter text-grey-darker px-1 mb-3">
                {props.recipe.cuisine}
              </p>
            </div>
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Servings
              </label>
              <p className="appearance-none block w-full bg-grey-lighter text-grey-darker px-1 mb-3">
                {props.recipe.servings + " (People)"}
              </p>
            </div>
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Diet
              </label>
              <p className="appearance-none block w-full bg-grey-lighter text-grey-darker px-1 mb-3">
                {props.recipe.diet}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4 mb-4">
            <button onClick={()=>setShowReviews(!showReviews)}
              className="relative items-center justify-start inline-block px-3 py-2 overflow-hidden font-bold rounded-md group ">
              <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-opacity-10 "></span>
              <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-black opacity-100 group-hover:-translate-x-8"></span>
              <span className="inline-flex items-center relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">
                Reviews
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
            </button>


            <div>
              <a className="flex items-center">
                <img
                  className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                  src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80"
                  alt="avatar"
                />
                <h1 className="text-gray-700 font-bold">John Cena</h1>
              </a>
            </div>
          </div>

          {showReviews &&<Reviews userId={props.userId} recipe={props.recipe}/>}
        </div>
      </div>
    </div>
  );
};

export default FullRecipe;
