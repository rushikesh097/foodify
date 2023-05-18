import axios from "axios";
import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { FILL_ALL_DATA } from "../Data";
import {motion,useScroll, useTransform } from "framer-motion";

import burger from "../burger-french-fries-plate.jpg"
import footerbg from "../egg_fries_footer.jpg"

const Home = (props) => {
  const [names, setNames] = useState([]);
  const [ingredients, setIngredients] = useState("");
  const [msg, setMsg] = useState("");

  const getRecipeDetails = (name) => {
    axios
      .get(`http://localhost:5000/recipe/getrecipebyname/${name}`)
      .then((response) => {
        props.setRecipe(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setIngredients(e.target.value);
    setMsg("");
  };

  const getRecommendation = () => {
    if (ingredients !== "") {
      axios
      .get(`http://127.0.0.1:5000/${ingredients}`)
      .then((response) => {
        setNames(response.data["result"]);
      })
      .catch((err) => {
        console.log(err);
        setMsg(err.message);
      });
      return;
    }
    setMsg(FILL_ALL_DATA);
  };
  let {scrollY} = useScroll();
  let y =  useTransform(scrollY, [0,250],["0%","50%"]);

  return (
    <div>
      <div className="py-52 bg-cover bg-fixed" style={{ backgroundImage: `url(${burger})`}}>
        <motion.div style={{y}} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 lg:ml-2" >
            <div className="flex flex-col gap-8 lg:flex-row items-center">
                <div className="lg:w-1/2">
                    <h1 className="text-5xl font-bold leading-tight mb-4" >Welcome to Foodify!</h1>
                    <p className="text-2xl mb-8">Pick any ingredients ,search recipe and choose any recipe you want </p>
                    <input className="h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm text-grey-darker placeholder-[#353935]  bg-opacity-20 border border-black py-4 px-5 mb-6 "
                    type="text"
                    placeholder="Tomato, olive oil,..."
                    onChange={handleChange}
                    >
                    </input>
                        <button onClick={getRecommendation} className="relative items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-md group ">
                        <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-opacity-10 "></span>
                        <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-black opacity-100 group-hover:-translate-x-8"></span>
                        <span className="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">Get Recipe</span>
                        <span className="absolute inset-0 border border-black rounded-md"></span>
                        </button>
                </div>
                {/* <div className="lg:w-1/2 lg:ml-15">
                    <img src={foodimg} alt="Tailwind CSS" className="transition duration-300 ease-in-out hover:scale-110"/>
                </div> */}
            </div>
        </motion.div>
      </div>


      <div className="px-20 bg-[#fffafa] bg-fixed" >
      <div className="-mx-4 flex flex-wrap p-8 text-center">
        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <motion.div className="mb-9 rounded-xl py-8 px-7 shadow-lg transition-all hover:shadow-2xl  sm:p-9 lg:px-6 xl:px-9 bg-[#FFC300] cursor-pointer" whileHover={{ scale: 1.1 }}>
                <div className="mx-auto mb-7 inline-block"><svg width="53" height="61" viewBox="0 0 53 61" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect x="20.8433" y="19.3018" width="10.1675" height="12.201" fill="#ABA8F7"></rect>
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M42.1119 5.91343C40.9499 4.62242 39.4875 3.95192 38.2383 4.04801C36.1465 4.20891 33.9414 5.92602 31.8695 8.63549C30.0459 11.0202 28.5417 13.8917 27.5307 16.2458C33.6951 16.5488 37.7115 15.7786 40.1926 14.5916C42.7088 13.3878 43.5948 11.7969 43.7449 10.3715C43.9049 8.85254 43.2637 7.19309 42.1119 5.91343ZM8.75274 16.6855C6.24093 15.1295 4.93328 12.9984 4.69026 10.691C4.42078 8.13252 5.49249 5.64717 7.08955 3.87282C8.6764 2.10982 10.9989 0.817106 13.4643 1.00675C16.9349 1.27372 19.8489 3.94064 22.0221 6.78264C23.4868 8.69803 24.7428 10.8606 25.7343 12.8643C26.7259 10.8606 27.9818 8.69803 29.4465 6.78264C31.6197 3.94064 34.5337 1.27372 38.0043 1.00675C40.4697 0.817106 42.7922 2.10982 44.3791 3.87282C45.9761 5.64717 47.0478 8.13252 46.7784 10.691C46.5353 12.9984 45.2277 15.1295 42.7159 16.6855H49.8822C51.286 16.6855 52.4241 17.8236 52.4241 19.2274V31.1348C52.4241 32.5386 51.286 33.6766 49.8822 33.6766H49.3122V58.6608C49.3122 59.9464 48.1845 60.9886 46.7933 60.9886H31.5363L31.5191 60.9887L31.502 60.9886H20.3521L20.3349 60.9887L20.3178 60.9886H5.0608C3.66963 60.9886 2.54187 59.9464 2.54187 58.6608L2.54187 33.6766C1.13804 33.6766 0 32.5386 0 31.1348V19.2274C0 17.8236 1.13803 16.6855 2.54187 16.6855H8.75274ZM33.0443 58.1952H46.2895V33.6766H33.0443V58.1952ZM33.0443 30.6264H49.3738V19.7358H33.0443V30.6264ZM29.994 19.7358V30.6264H21.8601V19.7358H29.994ZM29.994 33.6766V58.1952H21.8601V33.6766H29.994ZM18.8098 58.1952V33.6766H5.56459V58.1952H18.8098ZM18.8098 30.6264V19.7358H3.05024V30.6264H18.8098ZM13.2303 4.04801C11.9811 3.95192 10.5187 4.62242 9.35668 5.91343C8.20488 7.19309 7.56373 8.85254 7.72372 10.3715C7.87385 11.7969 8.7598 13.3878 11.276 14.5916C13.7571 15.7786 17.7735 16.5488 23.9379 16.2458C22.9269 13.8917 21.4227 11.0202 19.5991 8.63549C17.5272 5.92602 15.3221 4.20891 13.2303 4.04801Z"
                            fill="#6A64F1"></path>
                    </svg></div>
                <div>
                    <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">Explore 6000+ Authentic Indian Recipes
                    </h3>
                    <p className="text-base font-medium text-body-color">You can easily search for recipes by dish name, ingredients, cuisine type, or dietary preferences.</p>
                </div>
            </motion.div>
        </div>

        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <motion.div className="mb-9 rounded-xl py-8 px-7 shadow-lg transition-all hover:shadow-2xl sm:p-9 lg:px-6 xl:px-9 bg-[#FFC300] cursor-pointer" whileHover={{ scale: 1.1 }}>
                <div className="mx-auto mb-7 inline-block"><svg width="53" height="61" viewBox="0 0 53 61" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect x="20.8433" y="19.3018" width="10.1675" height="12.201" fill="#ABA8F7"></rect>
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M42.1119 5.91343C40.9499 4.62242 39.4875 3.95192 38.2383 4.04801C36.1465 4.20891 33.9414 5.92602 31.8695 8.63549C30.0459 11.0202 28.5417 13.8917 27.5307 16.2458C33.6951 16.5488 37.7115 15.7786 40.1926 14.5916C42.7088 13.3878 43.5948 11.7969 43.7449 10.3715C43.9049 8.85254 43.2637 7.19309 42.1119 5.91343ZM8.75274 16.6855C6.24093 15.1295 4.93328 12.9984 4.69026 10.691C4.42078 8.13252 5.49249 5.64717 7.08955 3.87282C8.6764 2.10982 10.9989 0.817106 13.4643 1.00675C16.9349 1.27372 19.8489 3.94064 22.0221 6.78264C23.4868 8.69803 24.7428 10.8606 25.7343 12.8643C26.7259 10.8606 27.9818 8.69803 29.4465 6.78264C31.6197 3.94064 34.5337 1.27372 38.0043 1.00675C40.4697 0.817106 42.7922 2.10982 44.3791 3.87282C45.9761 5.64717 47.0478 8.13252 46.7784 10.691C46.5353 12.9984 45.2277 15.1295 42.7159 16.6855H49.8822C51.286 16.6855 52.4241 17.8236 52.4241 19.2274V31.1348C52.4241 32.5386 51.286 33.6766 49.8822 33.6766H49.3122V58.6608C49.3122 59.9464 48.1845 60.9886 46.7933 60.9886H31.5363L31.5191 60.9887L31.502 60.9886H20.3521L20.3349 60.9887L20.3178 60.9886H5.0608C3.66963 60.9886 2.54187 59.9464 2.54187 58.6608L2.54187 33.6766C1.13804 33.6766 0 32.5386 0 31.1348V19.2274C0 17.8236 1.13803 16.6855 2.54187 16.6855H8.75274ZM33.0443 58.1952H46.2895V33.6766H33.0443V58.1952ZM33.0443 30.6264H49.3738V19.7358H33.0443V30.6264ZM29.994 19.7358V30.6264H21.8601V19.7358H29.994ZM29.994 33.6766V58.1952H21.8601V33.6766H29.994ZM18.8098 58.1952V33.6766H5.56459V58.1952H18.8098ZM18.8098 30.6264V19.7358H3.05024V30.6264H18.8098ZM13.2303 4.04801C11.9811 3.95192 10.5187 4.62242 9.35668 5.91343C8.20488 7.19309 7.56373 8.85254 7.72372 10.3715C7.87385 11.7969 8.7598 13.3878 11.276 14.5916C13.7571 15.7786 17.7735 16.5488 23.9379 16.2458C22.9269 13.8917 21.4227 11.0202 19.5991 8.63549C17.5272 5.92602 15.3221 4.20891 13.2303 4.04801Z"
                            fill="#6A64F1"></path>
                    </svg></div>
                <div>
                    <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">Discover articles on Nutrition,Diet and many more
                    </h3>
                    <p className="text-base font-medium text-body-color"> explore different articles on food, diet, and nutrition is the ability to search and filter content based on specific criteria.</p>
                </div>
            </motion.div>
        </div>

        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <motion.div className="mb-9 rounded-xl py-8 px-7 shadow-lg transition-all hover:shadow-2xl sm:p-9 lg:px-6 xl:px-9 bg-[#FFC300] cursor-pointer" whileHover={{ scale: 1.1 }}>
                <div className="mx-auto mb-7 inline-block"><svg width="53" height="61" viewBox="0 0 53 61" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect x="20.8433" y="19.3018" width="10.1675" height="12.201" fill="#ABA8F7"></rect>
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M42.1119 5.91343C40.9499 4.62242 39.4875 3.95192 38.2383 4.04801C36.1465 4.20891 33.9414 5.92602 31.8695 8.63549C30.0459 11.0202 28.5417 13.8917 27.5307 16.2458C33.6951 16.5488 37.7115 15.7786 40.1926 14.5916C42.7088 13.3878 43.5948 11.7969 43.7449 10.3715C43.9049 8.85254 43.2637 7.19309 42.1119 5.91343ZM8.75274 16.6855C6.24093 15.1295 4.93328 12.9984 4.69026 10.691C4.42078 8.13252 5.49249 5.64717 7.08955 3.87282C8.6764 2.10982 10.9989 0.817106 13.4643 1.00675C16.9349 1.27372 19.8489 3.94064 22.0221 6.78264C23.4868 8.69803 24.7428 10.8606 25.7343 12.8643C26.7259 10.8606 27.9818 8.69803 29.4465 6.78264C31.6197 3.94064 34.5337 1.27372 38.0043 1.00675C40.4697 0.817106 42.7922 2.10982 44.3791 3.87282C45.9761 5.64717 47.0478 8.13252 46.7784 10.691C46.5353 12.9984 45.2277 15.1295 42.7159 16.6855H49.8822C51.286 16.6855 52.4241 17.8236 52.4241 19.2274V31.1348C52.4241 32.5386 51.286 33.6766 49.8822 33.6766H49.3122V58.6608C49.3122 59.9464 48.1845 60.9886 46.7933 60.9886H31.5363L31.5191 60.9887L31.502 60.9886H20.3521L20.3349 60.9887L20.3178 60.9886H5.0608C3.66963 60.9886 2.54187 59.9464 2.54187 58.6608L2.54187 33.6766C1.13804 33.6766 0 32.5386 0 31.1348V19.2274C0 17.8236 1.13803 16.6855 2.54187 16.6855H8.75274ZM33.0443 58.1952H46.2895V33.6766H33.0443V58.1952ZM33.0443 30.6264H49.3738V19.7358H33.0443V30.6264ZM29.994 19.7358V30.6264H21.8601V19.7358H29.994ZM29.994 33.6766V58.1952H21.8601V33.6766H29.994ZM18.8098 58.1952V33.6766H5.56459V58.1952H18.8098ZM18.8098 30.6264V19.7358H3.05024V30.6264H18.8098ZM13.2303 4.04801C11.9811 3.95192 10.5187 4.62242 9.35668 5.91343C8.20488 7.19309 7.56373 8.85254 7.72372 10.3715C7.87385 11.7969 8.7598 13.3878 11.276 14.5916C13.7571 15.7786 17.7735 16.5488 23.9379 16.2458C22.9269 13.8917 21.4227 11.0202 19.5991 8.63549C17.5272 5.92602 15.3221 4.20891 13.2303 4.04801Z"
                            fill="#6A64F1"></path>
                    </svg></div>
                <div>
                    <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">Platform that Offers Multiple Criteria Search and Filtering
                    </h3>
                    <p className="text-base font-medium text-body-color">Users can filter recipes based on factors such as preparation time, course type, and many more.</p>
                </div>
            </motion.div>
        </div>
      </div>
    </div>

    <div className="flex flex-wrap justify-around">
        {names.length !== 0 ? (
          names.map((name,key) => {
            return (
              <div key={key}>

                <div className="flex flex-wrap my-5">
                  <div className="">
                    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg backdrop-blur-md">
                        <img src="https://images.unsplash.com/photo-1641924675534-bec33d867137?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="Mountain"/>
                        <div className="px-6 py-3">
                          <div className=" text-center font-bold text-xl">{name}</div>
                        </div>
                      <div className="px-6 pb-4 justify-center  text-center">
                        <Link to={"/fullrecipe"} 
                        className="inline-flex items-center ml-auto mr-auto px-6 mt-5 p-2 flex-1 text-white bg-black shadow-2xl shadow-[#191919] rounded-l-2xl rounded-tr-3xl outline-none ring-offset-2 ring-green-500 focus:ring-2 font-semibold"
                        onClick={() => {
                          getRecipeDetails(name);
                          sessionStorage.setItem("message","BACK TO HOME");
                          sessionStorage.setItem("route","/");
                        }}
                        >
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
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>  
              </div>
            );
          })
          ) : (
          <></>
          )}
      </div>

      <div className="px-4 divide-y text-black bg-fixed bg-cover pt-10" style={{ backgroundImage: `url(${footerbg})` }}>
        <div  className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
          <div className="lg:w-1/3">
            <a rel="noopener noreferrer" href="#" className="flex justify-center space-x-3 lg:justify-start">
              <div className="flex items-center justify-center w-12 h-12 rounded-full dark:bg-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="flex-shrink-0 w-5 h-5 rounded-full dark:text-gray-900">
                  <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
                </svg>
              </div>
              <span className="self-center text-2xl font-semibold">Foodify</span>
            </a>
          </div>
          <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
            <div className="space-y-3">
              <h3 className="tracking-wide uppercase text-gray-800">Product</h3>
              <ul className="space-y-1">
                <li>
                  <a rel="noopener noreferrer" href="#">Features</a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">Integrations</a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">Pricing</a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">FAQ</a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="tracking-wide uppercase text-gray-800">Company</h3>
              <ul className="space-y-1">
                <li>
                  <a rel="noopener noreferrer" href="#">Privacy</a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">Terms of Service</a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="uppercase text-gray-800">Developers</h3>
              <ul className="space-y-1">
                <li>
                  <a rel="noopener noreferrer" href="#">Public API</a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">Documentation</a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">Guides</a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="uppercase text-gray-800">Social media</div>
              <div className="flex justify-start space-x-3">
                <a rel="noopener noreferrer" href="#" title="Facebook" className="flex items-center p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                    <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z"></path>
                  </svg>
                </a>
                <a rel="noopener noreferrer" href="#" title="Twitter" className="flex items-center p-1">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current">
                    <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"></path>
                  </svg>
                </a>
                <a rel="noopener noreferrer" href="#" title="Instagram" className="flex items-center p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5 fill-current">
                    <path d="M16 0c-4.349 0-4.891 0.021-6.593 0.093-1.709 0.084-2.865 0.349-3.885 0.745-1.052 0.412-1.948 0.959-2.833 1.849-0.891 0.885-1.443 1.781-1.849 2.833-0.396 1.020-0.661 2.176-0.745 3.885-0.077 1.703-0.093 2.244-0.093 6.593s0.021 4.891 0.093 6.593c0.084 1.704 0.349 2.865 0.745 3.885 0.412 1.052 0.959 1.948 1.849 2.833 0.885 0.891 1.781 1.443 2.833 1.849 1.020 0.391 2.181 0.661 3.885 0.745 1.703 0.077 2.244 0.093 6.593 0.093s4.891-0.021 6.593-0.093c1.704-0.084 2.865-0.355 3.885-0.745 1.052-0.412 1.948-0.959 2.833-1.849 0.891-0.885 1.443-1.776 1.849-2.833 0.391-1.020 0.661-2.181 0.745-3.885 0.077-1.703 0.093-2.244 0.093-6.593s-0.021-4.891-0.093-6.593c-0.084-1.704-0.355-2.871-0.745-3.885-0.412-1.052-0.959-1.948-1.849-2.833-0.885-0.891-1.776-1.443-2.833-1.849-1.020-0.396-2.181-0.661-3.885-0.745-1.703-0.077-2.244-0.093-6.593-0.093zM16 2.88c4.271 0 4.781 0.021 6.469 0.093 1.557 0.073 2.405 0.333 2.968 0.553 0.751 0.291 1.276 0.635 1.844 1.197 0.557 0.557 0.901 1.088 1.192 1.839 0.22 0.563 0.48 1.411 0.553 2.968 0.072 1.688 0.093 2.199 0.093 6.469s-0.021 4.781-0.099 6.469c-0.084 1.557-0.344 2.405-0.563 2.968-0.303 0.751-0.641 1.276-1.199 1.844-0.563 0.557-1.099 0.901-1.844 1.192-0.556 0.22-1.416 0.48-2.979 0.553-1.697 0.072-2.197 0.093-6.479 0.093s-4.781-0.021-6.48-0.099c-1.557-0.084-2.416-0.344-2.979-0.563-0.76-0.303-1.281-0.641-1.839-1.199-0.563-0.563-0.921-1.099-1.197-1.844-0.224-0.556-0.48-1.416-0.563-2.979-0.057-1.677-0.084-2.197-0.084-6.459 0-4.26 0.027-4.781 0.084-6.479 0.083-1.563 0.339-2.421 0.563-2.979 0.276-0.761 0.635-1.281 1.197-1.844 0.557-0.557 1.079-0.917 1.839-1.199 0.563-0.219 1.401-0.479 2.964-0.557 1.697-0.061 2.197-0.083 6.473-0.083zM16 7.787c-4.541 0-8.213 3.677-8.213 8.213 0 4.541 3.677 8.213 8.213 8.213 4.541 0 8.213-3.677 8.213-8.213 0-4.541-3.677-8.213-8.213-8.213zM16 21.333c-2.948 0-5.333-2.385-5.333-5.333s2.385-5.333 5.333-5.333c2.948 0 5.333 2.385 5.333 5.333s-2.385 5.333-5.333 5.333zM26.464 7.459c0 1.063-0.865 1.921-1.923 1.921-1.063 0-1.921-0.859-1.921-1.921 0-1.057 0.864-1.917 1.921-1.917s1.923 0.86 1.923 1.917z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6 text-sm text-center dark:text-gray-900">© 2023 Company Co. All rights reserved.</div>
      </div>

    </div>
  );
};

export default Home;
