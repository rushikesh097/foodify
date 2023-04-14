import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import SearchRecipe from "./SearchRecipe";

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
    <div className="flex justify-center">
      <div>
      <h1 className='text-3xl text-center mt-3 font-semibold'>Recipes</h1>
        <div>   
        {props.userId !== "" && (
          <Link
          to="/addrecipe"
          className="ml-10 w-3/2 mt-2 p-2.5 flex-1 text-white bg-green-600 rounded-md outline-none ring-offset-2 ring-green-500 focus:ring-2 font-semibold"
          aria-current="page"
          >
            Add Recipe
          </Link>
        )}
        </div> 
        
        {searchComponent && <SearchRecipe getAllRecipe={getAllRecipe} setRecipes={setRecipes} resetFilterTimeout={resetFilterTimeout}/>}
        <div className="flex flex-col gap-3 my-6">
          {recipes.length === 0 ? (
            <div className="relative flex items-center justify-center">
            <h1 className="text-2xl font-medium py-8 px-5">Sorry! No results found</h1>
            <div>
            <button onClick={getAllRecipe} className="bg-gradient-to-r  text-#75c9b7 bg-[white] hover:bg-[#dfdddd] font-semibold px-6 py-3 rounded-md">
            Go back
            </button>
            </div>
            </div>
          ) : (
            recipes.map((recipe) => {
              return <RecipeCard recipe={recipe} setRecipe={props.setRecipe} setRoute={props.setRoute} setMessage={props.setMessage}/>;
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Recipes