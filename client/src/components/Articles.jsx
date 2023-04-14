import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from "react-router-dom";
import ArticleCard from './ArticleCard';
import axios from 'axios';

const Articles = (props) => {
  const [articles,setArticles] = useState([]);
  const [searchArticle,setSearchArticle] = useState("")

  const getAllArticles=(e)=>{
    axios
      .get("http://localhost:5000/article/getallarticles")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getSearchedArticle=(e)=>{
		axios
		.get(`http://localhost:5000/article/searcharticlebytitle/${searchArticle}`)
		.then((response) => {
      console.log(searchArticle);
		  setArticles(response.data);
		})
		.catch((err) => {
		  console.log(err);
      console.log(searchArticle);
      getAllArticles();
		});
	}

  const handleChange = (e) => {
    e.preventDefault();
    setSearchArticle(e.target.value);
    };

  useEffect(() => {
    getAllArticles();
  }, []);
  
  return (
    <>
    <div>
      <div>
          <h1 className='text-3xl text-center mt-3 font-semibold'>Articles</h1>
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
          
        <div className='mt-6 mx-60'>
        <div className="shadow p-5 rounded-lg bg-white">

        <div className="relative">
          <div className="absolute flex items-center ml-2 h-full">
            <svg className="w-4 h-4 fill-current text-primary-gray-dark" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
            </svg>
          </div>
          
          <div className='justify-between'>

          <input type="search" name="title" onChange={handleChange} placeholder="Search by Cuisine, Servings, Cook Time..." className="w-5/6 px-8 py-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm "/>
          <button type="button"
            className="inline-flex items-center px-6 py-3 ml-4 text-md font-bold text-center rounded text-white bg-[#75c9b7] hover:bg-[#abd699]"
            onClick={getSearchedArticle}
            >Search
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
            <h1 className="text-2xl font-medium py-8 px-5">Sorry! No results found</h1>
            <div>
            <button onClick={getAllArticles} className="bg-gradient-to-r  text-#75c9b7 bg-[white] hover:bg-[#dfdddd] font-semibold px-6 py-3 rounded-md">
            Go back
            </button>
            </div>
            </div>
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