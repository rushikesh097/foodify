import React, { useState } from 'react'
import { useEffect } from 'react';
import { FILL_ALL_DATA } from '../Data';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReviewCard from './ReviewCard';


const SaveModal = (props) => {
    return (
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
  
        <div
          className="fixed inset-0 z-10 overflow-y-auto"
          onClick={() => {
            props.setSaveShowModal(false);
          }}
        >
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Review Added
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your review is saved successfully to the Foodity!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <Link
                  to="/fullrecipe"
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Close
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
        console.log(addReview)
    };

    const onSave = (e) =>{
        console.log(props.recipe);
        if(addReview!=="")
        {
            axios.post("http://localhost:5000/review/addreview",{
                userid: props.userId,
                recipeid: props.recipe._id,
                review: addReview
            }).then((response) => {
                setSaveShowModal(true);
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