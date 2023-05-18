import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <>
      <nav className="sticky top-0 z-30 backdrop-blur-sm border-gray-200 px-2 sm:px-4 py-2.5 shadow-xl">
        <div className="container flex flex-wrap items-center mx-auto justify-around">
        <a className="flex items-center">
          <span className="self-center text-2xl font-bold whitespace-nowrap text-[#16123F]">FOODIFY</span>
        </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col p-4 mt-4 border rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-base font-semibold md:border-0  ">
              <li>
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded md:bg-transparent md:hover:text-blue-700 md:p-0 "
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/articles"
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes"
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >
                  Recipes
                </Link>
              </li>
              <li>
                {props.userId === "" ? (
                  <button
                    className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                    onClick={() => {
                      props.setShowLogIn(true);
                    }}
                  >
                    LogIn/SignUp
                  </button>
                ) : (
                  <div className="flex gap-4">
                    <Link className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                    to={"/profile"}>
                      {"Profile"}
                    </Link>
                    <Link
                      to="/"
                      className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                      onClick={() => {
                        props.setUserId("");
                        sessionStorage.removeItem("userId")
                        sessionStorage.removeItem("username")
                      }}
                    >
                      Log Out
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
