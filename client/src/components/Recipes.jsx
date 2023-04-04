import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";

const Recipes = (props) => {
  
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/recipe/getallrecipe")
      .then((response) => {
        setRecipes(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex justify-center">
      <div>
        <div>
          {props.userId === "" && (
            <Link
              to="/addrecipe"
              className="ml-10 w-3/2 mt-2 p-2.5 flex-1 text-white bg-green-600 rounded-md outline-none ring-offset-2 ring-green-500 focus:ring-2 font-semibold"
              aria-current="page"
            >
              Add Recipe
            </Link>
          )}
        </div>
        <div className="flex flex-col gap-3 my-6">
          {recipes.length === 0 ? (
            <h1 className="text-lg">Loding....</h1>
          ) : (
            recipes.map((recipe) => {
              return <RecipeCard recipe={recipe} setRecipe={props.setRecipe} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Recipes