import React, { useState } from "react";
import axios from "axios";
import { FILL_ALL_DATA } from "../Data";
import { Link } from "react-router-dom";
import recipeBG from "../recipe_page_bg2.jpg";

const SaveModal = (props) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div
        className="fixed inset-0 z-10 overflow-y-auto"
        onClick={() => {
          props.setSaveShowModal(false);
        }}
      >
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Recipe Added
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your recipe is saved successfully to the Foodity!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <Link
                to="/recipes"
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Close
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddRecipe = (props) => {
  const cuisins = [
    "Italian Recipes",
    "Jewish",
    "Udupi",
    "American",
    "European",
    "Hyderabadi",
    "South Karnataka",
    "Middle Eastern",
    "Kerala Recipes",
    "Mediterranean",
    "Mangalorean",
    "Fusion",
    "Awadhi",
    "North Indian Recipes",
    "Andhra",
    "Afghan",
    "Chettinad",
    "Appetizer",
    "Pakistani",
    "Burmese",
    "Shandong",
    "Parsi Recipes",
    "South Indian Recipes",
    "Konkan",
    "Rajasthani",
    "British",
    "Thai",
    "Uttarakhand-North Kumaon",
    "Haryana",
    "Mexican",
    "Himachal",
    "Mughlai",
    "Indo Chinese",
    "Uttar Pradesh",
    "Kongunadu",
    "Side Dish",
    "Indian",
    "French",
    "Goan Recipes",
    "North East India Recipes",
    "Kashmiri",
    "Hunan",
    "Dinner",
    "Brunch",
    "Dessert",
    "Nagaland",
    "Indonesian",
    "African",
    "Tamil Nadu",
    "Malabar",
    "Malvani",
    "Punjabi",
    "Cantonese",
    "Sindhi",
    "Nepalese",
    "Continental",
    "World Breakfast",
    "Asian",
    "Assamese",
    "Japanese",
    "Coastal Karnataka",
    "Lunch",
    "Bengali Recipes",
    "Malaysian",
    "Bihari",
    "Sichuan",
    "Snack",
    "Korean",
    "Vietnamese",
    "Karnataka",
    "Greek",
    "Coorg",
    "North Karnataka",
    "Sri Lankan",
    "Chinese",
    "Arab",
    "Jharkhand",
    "Maharashtrian Recipes",
    "Gujarati Recipes",
    "Lucknowi",
    "Oriya Recipes",
    "Caribbean",
  ];

  const courses = [
    "Appetizer",
    "Brunch",
    "Dessert",
    "Dinner",
    "Eggetarian",
    "High Protein Vegetarian",
    "Indian Breakfast",
    "Lunch",
    "Main Course",
    "No Onion No Garlic (Sattvic)",
    "Non Vegeterian",
    "North Indian Breakfast",
    "One Pot Dish",
    "Side Dish",
    "Snack",
    "South Indian Breakfast",
    "Sugar Free Diet",
    "Vegan",
    "Vegetarian",
    "World Breakfast",
  ];

  const diets = [];

  const [msg, setMsg] = useState("");
  const [showSaveModal, setSaveShowModal] = useState(false);

  const [recipe, setRecipe] = useState({
    recipeName: "",
    ingredients: "",
    prepTimeInMins: 10,
    cookTimeInMins: 10,
    totalTimeInMins: 20,
    servings: 2,
    cuisine: cuisins[0],
    course: courses[0],
    diet: "Snack",
    instructions: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setMsg("");
    setRecipe((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSave = (e) => {
    e.preventDefault();
    if (
      recipe.recipeName !== "" &&
      recipe.ingredients !== "" &&
      recipe.instructions
    ) {
      axios
        .post("http://localhost:5000/recipe/addrecipe", {
          recipeName: recipe.recipeName,
          ingredients: recipe.ingredients,
          prepTimeInMins: recipe.prepTimeInMins,
          cookTimeInMins: recipe.cookTimeInMins,
          totalTimeInMins:
            parseInt(recipe.cookTimeInMins) + parseInt(recipe.prepTimeInMins),
          servings: recipe.servings,
          cuisine: recipe.cuisine,
          course: recipe.course,
          diet: "Snack",
          instructions: recipe.instructions,
        })
        .then((response) => {
          setSaveShowModal(true);
        })
        .catch((err) => {
          console.log(err);
          setMsg(err.message);
        });
      return;
    }
    setMsg(FILL_ALL_DATA);
  };

  return (
    <div
      className="bg-fixed bg-cover bg-repeat min-h-screen"
      style={{ backgroundImage: `url(${recipeBG})` }}
    >
      <h1 className="text-3xl text-center bg-yellow-300 py-5 font-semibold mb-8">
        Add New Recipe
      </h1>
      <div>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-10 flex flex-col mx-20">
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-full px-3">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Name
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                name="recipeName"
                type="text"
                placeholder="Chole Bhature"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-full px-3">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Ingredients
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                name="ingredients"
                type="text"
                placeholder="Tomato, Potato,.."
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Prep. Time
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                name="prepTimeInMins"
                type="number"
                placeholder="10"
                onChange={handleChange}
              />
              <p className="text-red text-xs italic">in min.</p>
            </div>
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Cook Time
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                name="cookTimeInMins"
                type="number"
                onChange={handleChange}
                placeholder="10"
              />
              <p className="text-red text-xs italic">in min.</p>
            </div>
          </div>

          <div className="my-4">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Procedure
            </label>
            <textarea
              name="instructions"
              placeholder="Take a cup of water..."
              onChange={handleChange}
              className="w-full h-64 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg  border border-grey-lighter"
            ></textarea>
          </div>
          <div className="-mx-3 md:flex mb-2">
            <div className="md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Course Type
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                  name="course"
                  onChange={handleChange}
                >
                  {courses.map((v, k) => (
                    <option className="cursor-pointer" value={v} key={k}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Cuisine
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                  name="cuisine"
                  onChange={handleChange}
                >
                  {cuisins.map((v, k) => (
                    <option className="cursor-pointer" value={v} key={k}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Servings
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                name="servings"
                type="number"
                placeholder="1"
                onChange={handleChange}
              />
            </div>
          </div>

          <p className="text-sm text-red-600 italic text-center mt-1">{msg}</p>
          <button
            onClick={onSave}
            className="ml-auto mr-auto w-1/4 mt-5 p-2.5 flex-1 text-white bg-green-600 rounded-md outline-none ring-offset-2 ring-green-500 focus:ring-2 font-semibold hover:bg-black"
          >
            Save
          </button>
        </div>
        <div className="w-full h-10"></div>
      </div>
      {showSaveModal && (
        <SaveModal setSaveShowModal={setSaveShowModal}></SaveModal>
      )}
    </div>
  );
};

export default AddRecipe;
