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
    <div className="flex justify-center bg-fixed bg-cover bg-repeat min-h-screen" style={{ backgroundImage: `url(${recipeBG})`}}>
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
          {recipes.length === 0 ? (
            <NoResultFound/>
          ) : (
            
            <div className="my-10 lg:mx-20 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {recipes.map((recipe) => {
              return <RecipeCard recipe={recipe} setRecipe={props.setRecipe} setRoute={props.setRoute} setMessage={props.setMessage}/>;
            })}
            </div>
          )}
        </div>
    </div>
  );
}

export default Recipes