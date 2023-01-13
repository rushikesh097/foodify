import React from 'react'

const Articles = (props) => {
  return (
    <div>
      <div>
        {props.userId !== "" && (
          <button className="ml-10 w-3/2 mt-2 p-2.5 flex-1 text-white bg-green-600 rounded-md outline-none ring-offset-2 ring-green-500 focus:ring-2 font-semibold" 
          onClick={()=>{alert("Add here!")}}>
            Add Article
          </button>
        )}
      </div>
      Articles
    </div>
  );
}

export default Articles