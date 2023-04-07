import React, { useState } from "react";
import { Link } from "react-router-dom";

const FullRecipe = (props) => {
  const [info, setInfo] = useState({
    message: sessionStorage.getItem("message"),
    route: sessionStorage.getItem("route"),
  });

  return (
    <div className="flex items-center justify-center">
      <div>
        <div className="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <p className="text-base md:text-sm text-green-500 font-bold">
              &lt;{" "}
              <Link
                to={`${info.route}`}
                className="text-base md:text-sm text-green-500 font-bold no-underline hover:underline"
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
          <div className="flex justify-between items-center mt-4">
            <a className="text-blue-600 hover:underline" href="#">
              Reviews
            </a>
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
        </div>
      </div>
    </div>
  );
};

export default FullRecipe;
