import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import SearchRecipe from "./SearchRecipe";
import recipeBG from "../recipe_page_bg2.jpg"
import NoResultFound from "./NoResultFound";


const Recipes = (props) => {
  
  const [recipes, setRecipes] = useState([]);
  const [searchComponent,SetSearchComponent] = useState(true);

  const resetFilterTimeout = () =>{
    setTimeout(() => {
      SetSearchComponent(true);
    });
    SetSearchComponent(false);
  }
 

  const getAllRecipe = (e)=>{
    axios
      .get("http://localhost:5000/recipe/getallrecipe")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAllRecipe();
  }, []);

  return (
    <div
      className="flex justify-center bg-fixed bg-cover bg-repeat min-h-screen"
      style={{ backgroundImage: `url(${recipeBG})` }}
    >
      <div>
        <h1 className="text-3xl text-center mt-3 font-semibold">Recipes</h1>
        <div>
          {props.userId !== "" && (
            <Link
              to="/addrecipe"
              className="inline-flex items-center justify-center gap-1 mx-4 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-green-600 hover:bg-green-500 active:bg-green-700 rounded-md sm:mt-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m6-6H6"
                />
              </svg>
              New Recipe
            </Link>
          )}
        </div>

        {searchComponent && (
          <SearchRecipe
            getAllRecipe={getAllRecipe}
            setRecipes={setRecipes}
            resetFilterTimeout={resetFilterTimeout}
          />
        )}
        {recipes.length === 0 ? (
          <NoResultFound />
        ) : (
          <div className="my-10 lg:mx-20 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {recipes.map((recipe) => {
              return (
                <RecipeCard
                  recipe={recipe}
                  setRecipe={props.setRecipe}
                  setRoute={props.setRoute}
                  setMessage={props.setMessage}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Recipes