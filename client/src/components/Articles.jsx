import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import recipeBG from "../recipe_page_bg2.jpg";
import axios from "axios";
import NoResultFound from "./NoResultFound";

const Articles = (props) => {
  const [articles, setArticles] = useState([]);
  const [searchArticle, setSearchArticle] = useState("");

  const getAllArticles = (e) => {
    axios
      .get("http://localhost:5000/article/getallarticles")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSearchedArticle = (e) => {
    axios
      .get(
        `http://localhost:5000/article/searcharticlebytitle/${searchArticle}`
      )
      .then((response) => {
        console.log(searchArticle);
        setArticles(response.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(searchArticle);
        getAllArticles();
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchArticle(e.target.value);
  };

  useEffect(() => {
    getAllArticles();
  }, []);

  return (
    <div
      className="bg-fixed bg-cover bg-repeat min-h-screen"
      style={{ backgroundImage: `url(${recipeBG})` }}
    >
      <div>
        <h1 className="text-3xl text-center font-semibold">Articles</h1>
        {props.userId !== "" && (
          <Link
            to="/addarticle"
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
            New Article
          </Link>
        )}
      </div>

      <div className="mt-10 mx-20">
        <div className="shadow p-5 rounded-lg bg-white">
          <div className="relative">
            <div className="absolute flex items-center ml-2 h-full">
              <svg
                className="w-4 h-4 fill-current text-primary-gray-dark"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
              </svg>
            </div>

            <div className="justify-between">
              <input
                type="search"
                name="title"
                onChange={handleChange}
                placeholder="Search by Cuisine, Servings, Cook Time..."
                className="w-5/6 px-8 py-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm "
              />
              <button
                onClick={getSearchedArticle}
                className="inline-flex items-center relative text-center justify-start px-6 py-3 ml-2 overflow-hidden font-bold rounded-md group "
              >
                <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-opacity-10 "></span>
                <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-black opacity-100 group-hover:-translate-x-8"></span>
                <span className="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">
                  Search
                </span>
                <span className="absolute inset-0 border border-black rounded-md"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div>
          <div className="flex flex-col gap-2 my-6">
            {articles.length === 0 ? (
              <div className="relative flex items-center justify-center">
                <div>
                  <NoResultFound />
                </div>
              </div>
            ) : (
              <div className="my-10 lg:mx-20 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {articles.map((article) => {
                  return (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      setArticle={props.setArticle}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
