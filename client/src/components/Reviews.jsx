import React, { useState } from 'react'
import { useEffect } from 'react';
import { FILL_ALL_DATA } from '../Data';
import axios from 'axios';
import ReviewCard from './ReviewCard';

const Reviews = (props) => {

    const [addReview, setAddReview] = useState("");
    const [msg,setMsg] = useState("");
    const [showSaveModal, setSaveShowModal] = useState(false);
    
    const [reviews,setReviews] = useState([]);

    useEffect(() => {
        axios
        .get(`http://localhost:5000/review/getreviewbyrecipeid/${props.recipe._id}`)
        .then((response) => {
            setReviews(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [])
    
    
    const handleChange = (e) => {
        e.preventDefault();
        setMsg("");
        setAddReview(e.target.value);
    };

    const onSave = (e) =>{
        if(addReview!=="")
        {
            axios.post("http://localhost:5000/review/addreview",{
                username: sessionStorage.getItem("username"),
                userid: props.userId,
                recipeid: props.recipe._id,
                recipename: props.recipe.recipeName,
                review: addReview
            }).then((response) => {
                alert("Saved !")
                setReviews([...reviews,response.data]);
              })
              .catch((err) => {
                console.log(err);
                setMsg(err.message);
              });
        }
        else
        {
            setMsg(FILL_ALL_DATA);
        }
    }

  return (
    <div className='border rounded p-5'>
        <div className='flex '>
            {props.userId!=="" && <div className="relative flex w-full flex-wrap items-stretch">
                <input
                type="search"
                className="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                placeholder="Add a Review"
                aria-label="Search"
                aria-describedby="button-addon3" 
                onChange={handleChange}
                />

                <button type="button"
                    className="inline-flex items-center px-6 py-2 text-sm text-center rounded text-white bg-[#75c9b7] hover:bg-[#abd699]"
                    onClick={onSave}
                >
                    Post
                </button>
            </div>}
            <p className="text-sm text-red-600 italic text-center mt-1">{msg}</p>

        </div>

        <div className="flex flex-col gap-3 my-6">
          {reviews.length === 0 ? (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">No Reviews</p>
            <p>No Reviews found related to this recipe.</p>
          </div>
          ) : (
              reviews.map((review) => {
                  return <ReviewCard review={review} userId={props.userId} reviews={reviews} setReviews={setReviews}/>;
                })
                )}
        </div>
        {showSaveModal && (
            <SaveModal setSaveShowModal={setSaveShowModal}></SaveModal>
        )}
    </div>
  )
}

export default Reviews