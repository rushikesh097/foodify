import React from 'react'
import { Link } from "react-router-dom";

const FullArticle = (props) => {
    console.log(props.article)
  return (
    
    <div className="mt-10 flex items-center justify-center">
      <div>
        <div className="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
              <div className="container w-full md:max-w-3xl mx-auto pt-10">

        <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal" >

        <div className="font-sans">
          <p className="text-base md:text-sm text-green-500 font-bold">&lt; <Link to="/articles" className="text-base md:text-sm text-green-500 font-bold no-underline hover:underline">BACK TO ARTICLES</Link></p>
              <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">{props.article.title}</h1>
              <p className="text-sm md:text-base font-normal text-gray-600">{props.article.date} {props.article.time}</p>
        </div>


        <p className="py-6 flex-wrap">
          {props.article.description}
        </p>
        </div>

        <div className='mt-3'>
          {props.userId === props.article.userid && (
            <Link className="ml-6 w-3/2 mt-10 p-2.5  text-white bg-green-600 rounded-md outline-none ring-offset-2 ring-green-500 focus:ring-2 font-semibold" 
            to="/editarticle">
              Edit Article
            </Link>
          )}
        </div>
    </div>
        </div>
      </div>
    </div>
  )
}

export default FullArticle