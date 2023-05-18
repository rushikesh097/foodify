import React from 'react'
import { Link } from 'react-router-dom'

const NoResultFound = () => {
  return (
    <div>
        <div className="w-full  m-auto py-16  flex items-center justify-center">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
            <div className="border-t border-gray-200 text-center pt-8">
            <h1 className="text-6xl font-medium py-8">Oops! No results found</h1>
            <p className="text-2xl pb-8 px-12 font-medium">Oops! There are no results found related to your searches</p>
            <Link to="/" className="relative items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-md group ">
                <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-opacity-10 "></span>
                <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-black opacity-100 group-hover:-translate-x-8"></span>
                <span className="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">Home</span>
                <span className="absolute inset-0 border border-black rounded-md"></span>
            </Link>
            </div>
            </div>
        </div>
    </div>
  )
}

export default NoResultFound