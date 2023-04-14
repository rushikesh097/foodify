import axios from 'axios';
import React, { useState } from 'react'

const SearchRecipe = (props) => {
	const cuisineList = [
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
	
	  const courseList = [
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
	const [filters,setfilters] = useState(
		{
			recipeName:"none",
			totalTimeInMins:"none",
			cuisine:"none",
			course:"none"
		}
	)

	const getSearchedFilter=(e)=>{
		axios
		.get(`http://localhost:5000/recipe/searchrecipebyoption?recipeName=${filters.recipeName}&sortOrder=${filters.totalTimeInMins}&cuisine=${filters.cuisine}&course=${filters.course}`)
		.then((response) => {
		  console.log(filters)
		  props.setRecipes(response.data);
		})
		.catch((err) => {
		  console.log(err);
		});
	}

	const handleChange = (e) => {
        e.preventDefault();
		setfilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
		console.log(e.target.value);
    };


  return (
    <div className='mt-6'>
        <div className="w-full shadow p-5 rounded-lg bg-white">
  <div className="relative">
	<div className="absolute flex items-center ml-2 h-full">
	  <svg className="w-4 h-4 fill-current text-primary-gray-dark" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
	  </svg>
	</div>

	<div className="flex justify-between">

	<input type="search" name="recipeName" onChange={handleChange} placeholder="Search by Cuisine, Servings, Cook Time..." className="px-8 py-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm w-full"/>
	<button type="button"
    className="inline-flex items-center px-6 py-3 ml-2 text-md font-bold text-center rounded text-white bg-[#75c9b7] hover:bg-[#abd699]"
    onClick={getSearchedFilter}
    >Search
    </button>  
	</div>
	</div>

	<div className="flex items-center justify-between mt-4">
	  <p className="font-medium">
		Filters
	  </p>

	  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md" onClick={props.resetFilterTimeout}>
		Reset Filter
	  </button>
	</div>

	<div>
	  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
		<select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" name="totalTimeInMins" onChange={handleChange}>
		  <option value="none">Preparation time</option>
		  <option value="1">Time-Low to</option>
		  <option value="-1">Time-High to</option>
		</select>

		<select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" name="course" onChange={handleChange}>
		  <option value="none">Course Type</option>
		  {courseList.map((v, k) => (
                  <option className="cursor-pointer" value={v} key={k}>
                    {v}
                  </option>
                ))}
		</select>

		<select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" name="cuisine" onChange={handleChange}>
		<option value="none">Cuisine Type</option>
		  {cuisineList.map((v, k) => (
                  <option className="cursor-pointer" value={v} key={k}>
                    {v}
                  </option>
                ))}
		</select>
	  </div>
	</div>
  </div>
    </div>
  )
}

export default SearchRecipe