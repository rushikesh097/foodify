import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FILL_ALL_DATA } from "../Data";

const Home = (props) => {
  const [names, setNames] = useState([]);
  const [ingredients, setIngredients] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let temp = sessionStorage.getItem("result");
    if (temp !== null) {
      let t = JSON.parse(temp);
      setIngredients(sessionStorage.getItem("ingredients"));
      setNames(t["result"]);
    }
  }, []);

  const getRecipeDetails = (name) => {
    axios
      .get(`http://localhost:5000/recipe/getrecipebyname/${name}`)
      .then((response) => {
        console.log(response.data[0]);
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
    sessionStorage.setItem("ingredients", ingredients);
    if (ingredients !== "") {
      axios
        .get(`http://127.0.0.1:5000/${ingredients}`)
        .then((response) => {
          setNames(response.data["result"]);
          sessionStorage.setItem("result", JSON.stringify(response.data));
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
    <div className="flex flex-col items-center justify-center mt-5">
      <input
        className="appearance-none block w-1/2 bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
        type="text"
        defaultValue={ingredients}
        placeholder="Tomato, olive oil,..."
        onChange={handleChange}
      />
      <p className="text-red-500 text-xs italic">{msg}</p>
      <button
        onClick={getRecommendation}
        className="ml-auto mr-auto w-1/6 mt-5 p-2.5 flex-1 text-white bg-green-600 rounded-md outline-none ring-offset-2 ring-green-500 focus:ring-2 font-semibold"
      >
        Get recipes
      </button>
      <div className="flex flex-col gap-2 mt-4">
        {names.length !== 0 ? (
          names.map((name, key) => {
            return (
              <div key={key}>
                <div className="max-w-xl xl:max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow ">
                  <a>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                      {name}
                    </h5>
                  </a>
                  <Link
                    to={"/fullrecipe"}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#75c9b7] hover:bg-[#abd699]   focus:ring-4 focus:outline-none focus:ring-blue-300 "
                    onClick={() => {
                      getRecipeDetails(name);
                      sessionStorage.setItem("message","BACK TO HOME");
                      sessionStorage.setItem("route","/");
                    }}
                  >
                    Read more
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
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Home;
