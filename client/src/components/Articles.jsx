import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from "react-router-dom";
import ArticleCard from './ArticleCard';
import axios from 'axios';

const Articles = (props) => {
  const [articles,setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/article/getallarticles")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  return (
    <>
    <div>
      <div>
          {props.userId !== "" && (
            <Link
              to="/addarticle"
              className="ml-10 w-3/2 mt-2 p-2.5 flex-1 text-white bg-green-600 rounded-md outline-none ring-offset-2 ring-green-500 focus:ring-2 font-semibold"
              aria-current="page"
            >
              Add Article
            </Link>
          )}
        </div>
      
      <div className="flex justify-center">
      <div>  
      <div className="flex flex-col gap-2 my-6">
          {articles.length === 0 ? (
            <h1 className="text-lg">Loding....</h1>
          ) : (
            articles.map((article) => {
              return <ArticleCard key={article.id} article={article} setArticle={props.setArticle}/>;
            })
          )}
        </div>
      </div>
    </div>

    </div>

    </>
  );
}

export default Articles