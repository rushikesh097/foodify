import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FILL_ALL_DATA } from "../Data";
import { motion, useScroll, useTransform } from "framer-motion";

import burger from "../burger-french-fries-plate.jpg";
import footerbg from "../egg_fries_footer.jpg";

const Home = (props) => {
  const [names, setNames] = useState([]);
  const [ingredients, setIngredients] = useState("");
  const [msg, setMsg] = useState("");

  const features = [
    {
      icon: (
        <svg
          id="myImg"
          className="mainimage"
          fill="#facc15"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 1000"
        >
          <path d="M500,11.1C229.4,11.1,10,230,10,500c0,270,219.4,488.9,490,488.9c270.6,0,490-218.9,490-488.9C990,230,770.6,11.1,500,11.1z M462,452.7c0,0-26.4,8.7-26.4,64l4.6,318.2c0,19.9-16.1,35.9-36,35.9c-19.9,0-36-16-36-35.9l4.9-318.2c0-55.4-26.7-64-26.7-64l0.2-0.1c-27.5-11.1-35.9-42.2-35.9-79.2l9.5-188.8h34.4v156.3c0,8.4,6.9,15.3,15.4,15.3c8.5,0,15.3-6.9,15.3-15.3V184.6h37.9v156.3c0,8.4,6.9,15.3,15.3,15.3c8.5,0,15.4-6.9,15.4-15.3V184.6h36l7.7,188.8c0,36.9-8.4,68.1-35.8,79.2L462,452.7z M588.7,870.9c-64.4,0-100.6-62.9-100.6-140.6c0-85.3,36.9-109.7,45-123.8c8.1-14.1,23.7-21,23.7-76.3l-4.2-318.2c0-19.9,16.1-36,36-36c19.8,0,36,16.1,36,36l-4.8,318.2c0,55.3,14.1,61,24.2,76.3c10.1,15.4,45.1,38.5,45.1,123.8C689.3,808,653,870.9,588.7,870.9z"></path>
        </svg>
      ),
      title: "Explore 6000+ Authentic Indian Recipes",
      desc: "You can easily search for recipes by dish name, ingredients, cuisine type, or dietary preferences.",
    },
    {
      icon: (
        <svg
          id="myImg"
          class="mainimage"
          fill="#facc15"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 1000"
        >
          <g>
            <path d="M616.7,861.7c0,12.9-10.5,23.3-23.3,23.3H406.7c-12.9,0-23.3-10.5-23.3-23.3c0-12.9,10.5-23.3,23.3-23.3h186.7C606.2,838.3,616.7,848.8,616.7,861.7z M593.3,896.7H406.7c-15.4,0-27.2,14.8-22.1,30.9c3.1,9.7,12.9,15.7,23.1,15.7h0.4c13.5,0,25.8,7.6,31.8,19.7l0.2,0.5c8.1,16.2,24.7,26.5,42.9,26.5H517c18.2,0,34.8-10.3,42.9-26.5l0.2-0.5c6-12.1,18.4-19.7,31.8-19.7h0.4c10.2,0,20-6,23.1-15.7C620.6,911.5,608.7,896.7,593.3,896.7z M500,150c12.9,0,23.3-10.5,23.3-23.3V33.3c0-12.9-10.5-23.3-23.3-23.3c-12.9,0-23.3,10.5-23.3,23.3v93.3C476.7,139.5,487.1,150,500,150z M252.5,238.8c4.5,4.6,10.5,6.8,16.5,6.8c6,0,11.9-2.3,16.5-6.8c9.1-9.1,9.1-23.9,0-33l-66-66c-9.1-9.1-23.9-9.1-33,0c-9.1,9.1-9.1,23.9,0,33L252.5,238.8z M196.7,453.3c0-12.9-10.5-23.3-23.3-23.3H80c-12.9,0-23.3,10.5-23.3,23.3c0,12.9,10.5,23.3,23.3,23.3h93.3C186.2,476.7,196.7,466.2,196.7,453.3z M252.5,667.8l-66,66c-9.1,9.1-9.1,23.9,0,33c4.6,4.6,10.5,6.8,16.5,6.8c6,0,11.9-2.3,16.5-6.8l66-66c9.1-9.1,9.1-23.9,0-33C276.4,658.7,261.6,658.7,252.5,667.8z M747.5,667.8c-9.1-9.1-23.9-9.1-33,0c-9.1,9.1-9.1,23.9,0,33l66,66c4.6,4.6,10.5,6.8,16.5,6.8c6,0,11.9-2.3,16.5-6.8c9.1-9.1,9.1-23.9,0-33L747.5,667.8z M920,430h-93.3c-12.9,0-23.3,10.5-23.3,23.3c0,12.9,10.5,23.3,23.3,23.3H920c12.9,0,23.3-10.5,23.3-23.3C943.3,440.5,932.9,430,920,430z M731,245.7c6,0,11.9-2.3,16.5-6.8l66-66c9.1-9.1,9.1-23.9,0-33c-9.1-9.1-23.9-9.1-33,0l-66,66c-9.1,9.1-9.1,23.9,0,33C719,243.4,725,245.7,731,245.7z M616.7,803.3c0,12.9-10.5,23.3-23.3,23.3H406.7c-12.9,0-23.3-10.5-23.3-23.3c0-12.4,9.7-22.5,22-23.2C390.8,648.8,255,619.6,255,465c0-135.3,109.7-245,245-245c135.3,0,245,109.7,245,245c0,154.6-135.8,183.8-150.3,315.1C606.9,780.8,616.7,790.9,616.7,803.3z M446.2,285.4c-3.6-8.9-13.8-13.3-22.8-9.6C363.8,300,318.6,351.6,302.5,414c-2.4,9.4,3.2,18.9,12.6,21.3c1.5,0.4,2.9,0.6,4.4,0.6c7.8,0,14.9-5.2,16.9-13.1c13.3-51.7,50.8-94.5,100.2-114.5C445.5,304.6,449.8,294.4,446.2,285.4z"></path>
          </g>
        </svg>
      ),
      title: "Discover articles on Nutrition,Diet and many more",
      desc: "explore different articles on food, diet, and nutrition is the ability to search and filter content based on specific criteria.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#facc15"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
          />
        </svg>
      ),
      title: "Platform that Offers Multiple Criteria Search and Filtering",
      desc: "Users can filter recipes based on factors such as preparation time, course type, and many more",
    },
  ];

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
  let { scrollY } = useScroll();
  let y = useTransform(scrollY, [0, 250], ["0%", "50%"]);

  return (
    <div>
      <div
        className="py-52 bg-cover bg-fixed"
        style={{ backgroundImage: `url(${burger})` }}
      >
        <motion.div
          style={{ y }}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 lg:ml-2"
        >
          <div className="flex flex-col gap-8 lg:flex-row items-center">
            <div className="lg:w-1/2">
              <h1 className="text-5xl font-bold leading-tight mb-4">
                Welcome to Foodify!
              </h1>
              <p className="text-2xl mb-8">
                Pick any ingredients ,search recipe and choose any recipe you
                want{" "}
              </p>
              <input
                className="h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm text-grey-darker placeholder-[#353935]  bg-opacity-20 border border-black py-4 px-5 mb-6 "
                type="text"
                placeholder="Tomato, olive oil,..."
                onChange={handleChange}
              ></input>
              <button
                onClick={getRecommendation}
                className="relative items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-md group "
              >
                <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-opacity-10 "></span>
                <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-black opacity-100 group-hover:-translate-x-8"></span>
                <span className="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">
                  Get Recipe
                </span>
                <span className="absolute inset-0 border border-black rounded-md"></span>
              </button>
            </div>
            {/* <div className="lg:w-1/2 lg:ml-15">
                    <img src={foodimg} alt="Tailwind CSS" className="transition duration-300 ease-in-out hover:scale-110"/>
                </div> */}
          </div>
        </motion.div>
      </div>

      <section className="py-14">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="max-w-xl space-y-3">
            <h3 className="text-yellow-600 font-semibold">Features</h3>
            <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Social media for food lovers
            </p>
            <p>Many Features like...</p>
          </div>
          <div className="mt-12">
            <ul className="grid gap-x-12 divide-y [&>.feature-1]:pl-0 sm:grid-cols-2 sm:gap-y-8 sm:divide-y-0 lg:divide-x lg:grid-cols-3 lg:gap-x-0">
              {features.map((item, idx) => (
                <li
                  key={idx}
                  className={`feature-${
                    idx + 1
                  } space-y-3 py-8 lg:px-12 sm:py-0`}
                >
                  <div className="w-12 h-12 border text-indigo-600 rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h4 className="text-lg text-gray-800 font-semibold">
                    {item.title}
                  </h4>
                  <p>{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap justify-around">
        {names.length !== 0 ? (
          names.map((name, key) => {
            return (
              <div key={key}>
                <div className="flex flex-wrap my-5">
                  <div className="">
                    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg backdrop-blur-md">
                      <img
                        src="https://images.unsplash.com/photo-1641924675534-bec33d867137?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                        alt="Mountain"
                      />
                      <div className="px-6 py-3">
                        <div className=" text-center font-bold text-xl">
                          {name}
                        </div>
                      </div>
                      <div className="px-6 pb-4 justify-center  text-center">
                        <Link
                          to={"/fullrecipe"}
                          className="inline-flex items-center ml-auto mr-auto px-6 mt-5 p-2 flex-1 text-white bg-black shadow-2xl shadow-[#191919] rounded-l-2xl rounded-tr-3xl outline-none ring-offset-2 ring-green-500 focus:ring-2 font-semibold"
                          onClick={() => {
                            getRecipeDetails(name);
                            sessionStorage.setItem("message", "BACK TO HOME");
                            sessionStorage.setItem("route", "/");
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

      <div
        className="px-4 divide-y text-black bg-fixed bg-cover pt-10"
        style={{ backgroundImage: `url(${footerbg})` }}
      >
        <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
          <div className="lg:w-1/3">
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex justify-center space-x-3 lg:justify-start"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full dark:bg-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="flex-shrink-0 w-5 h-5 rounded-full dark:text-gray-900"
                >
                  <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
                </svg>
              </div>
              <span className="self-center text-2xl font-semibold">
                Foodify
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
            <div className="space-y-3">
              <h3 className="tracking-wide uppercase text-gray-800">Product</h3>
              <ul className="space-y-1">
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Features
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Integrations
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Pricing
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="tracking-wide uppercase text-gray-800">Company</h3>
              <ul className="space-y-1">
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Privacy
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="uppercase text-gray-800">Developers</h3>
              <ul className="space-y-1">
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Public API
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Documentation
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Guides
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="uppercase text-gray-800">Social media</div>
              <div className="flex justify-start space-x-3">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  title="Facebook"
                  className="flex items-center p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z"></path>
                  </svg>
                </a>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  title="Twitter"
                  className="flex items-center p-1"
                >
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"></path>
                  </svg>
                </a>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  title="Instagram"
                  className="flex items-center p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M16 0c-4.349 0-4.891 0.021-6.593 0.093-1.709 0.084-2.865 0.349-3.885 0.745-1.052 0.412-1.948 0.959-2.833 1.849-0.891 0.885-1.443 1.781-1.849 2.833-0.396 1.020-0.661 2.176-0.745 3.885-0.077 1.703-0.093 2.244-0.093 6.593s0.021 4.891 0.093 6.593c0.084 1.704 0.349 2.865 0.745 3.885 0.412 1.052 0.959 1.948 1.849 2.833 0.885 0.891 1.781 1.443 2.833 1.849 1.020 0.391 2.181 0.661 3.885 0.745 1.703 0.077 2.244 0.093 6.593 0.093s4.891-0.021 6.593-0.093c1.704-0.084 2.865-0.355 3.885-0.745 1.052-0.412 1.948-0.959 2.833-1.849 0.891-0.885 1.443-1.776 1.849-2.833 0.391-1.020 0.661-2.181 0.745-3.885 0.077-1.703 0.093-2.244 0.093-6.593s-0.021-4.891-0.093-6.593c-0.084-1.704-0.355-2.871-0.745-3.885-0.412-1.052-0.959-1.948-1.849-2.833-0.885-0.891-1.776-1.443-2.833-1.849-1.020-0.396-2.181-0.661-3.885-0.745-1.703-0.077-2.244-0.093-6.593-0.093zM16 2.88c4.271 0 4.781 0.021 6.469 0.093 1.557 0.073 2.405 0.333 2.968 0.553 0.751 0.291 1.276 0.635 1.844 1.197 0.557 0.557 0.901 1.088 1.192 1.839 0.22 0.563 0.48 1.411 0.553 2.968 0.072 1.688 0.093 2.199 0.093 6.469s-0.021 4.781-0.099 6.469c-0.084 1.557-0.344 2.405-0.563 2.968-0.303 0.751-0.641 1.276-1.199 1.844-0.563 0.557-1.099 0.901-1.844 1.192-0.556 0.22-1.416 0.48-2.979 0.553-1.697 0.072-2.197 0.093-6.479 0.093s-4.781-0.021-6.48-0.099c-1.557-0.084-2.416-0.344-2.979-0.563-0.76-0.303-1.281-0.641-1.839-1.199-0.563-0.563-0.921-1.099-1.197-1.844-0.224-0.556-0.48-1.416-0.563-2.979-0.057-1.677-0.084-2.197-0.084-6.459 0-4.26 0.027-4.781 0.084-6.479 0.083-1.563 0.339-2.421 0.563-2.979 0.276-0.761 0.635-1.281 1.197-1.844 0.557-0.557 1.079-0.917 1.839-1.199 0.563-0.219 1.401-0.479 2.964-0.557 1.697-0.061 2.197-0.083 6.473-0.083zM16 7.787c-4.541 0-8.213 3.677-8.213 8.213 0 4.541 3.677 8.213 8.213 8.213 4.541 0 8.213-3.677 8.213-8.213 0-4.541-3.677-8.213-8.213-8.213zM16 21.333c-2.948 0-5.333-2.385-5.333-5.333s2.385-5.333 5.333-5.333c2.948 0 5.333 2.385 5.333 5.333s-2.385 5.333-5.333 5.333zM26.464 7.459c0 1.063-0.865 1.921-1.923 1.921-1.063 0-1.921-0.859-1.921-1.921 0-1.057 0.864-1.917 1.921-1.917s1.923 0.86 1.923 1.917z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6 text-sm text-center dark:text-gray-900">
          © 2023 Company Co. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Home;
