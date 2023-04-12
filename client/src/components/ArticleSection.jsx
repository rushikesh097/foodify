import React from 'react'
import { Link } from 'react-router-dom';

const ArticleSection = (props) => {
  return (
    <div>
      <div className="group flex flex-col justify-between rounded-sm bg-green-100 px-4 shadow-md transition-shadow hover:shadow-lg sm:p-6 lg:p-8">
        <div>
          <div className="flex justify-between mb-2">
            <p className="text-xs font-medium text-left truncate text-gray-500 bg-green-300 px-3 rounded-sm">
              {props.article.date}
            </p>
            <p className="text-xs font-medium text-left truncate text-gray-500 bg-green-300 rounded-sm px-2">
              {props.article.time}
            </p>
          </div>
          <h3 className="text-3xl text-left font-bold text-gray-600 sm:text-3xl truncate">
            {props.article.title}
          </h3>

          <div className="mt-4 border-t-2 border-gray-100 pt-4">
            <p className="text-base font-medium text-left truncate text-gray-500">
              {props.article.description}
            </p>
          </div>
        </div>

        <Link
          to={"/fullarticle"}
          className="mt-8 inline-flex items-center gap-1 text-indigo-600 sm:mt-12 lg:mt-16"
          onClick={() => {
            props.setArticle(props.article);
          }}
        >
          <p className="font-medium sm:text-sm">Read more!</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 transition group-hover:translate-x-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ArticleSection;
