import axios from 'axios';
import React, { useState } from 'react'
import { FILL_ALL_DATA } from '../Data';

const EditReview = (props) => {
    const [msg,setMsg] = useState("");
    const [changeReview,setChangeReview]=useState('')


    const handleChange = (e) => {
        e.preventDefault();
        setMsg("");
        setChangeReview(e.target.value);
        console.log(changeReview);
      };


    const onSave = (e) => {
        if (
          changeReview !== "" 
        ) {
          axios
            .put("http://localhost:5000/review/updatereview", {
              _id: props.reviewId,
              review: changeReview,
              date: new Date().toISOString().slice(0, 10),
              time: new Date().toLocaleTimeString("en-US", { hour12: false }).slice(0,5)
            })
            .then((response) => {
              props.setReviews((reviews) => {
                return reviews.map((reviewMap,index) => {
                  return reviewMap._id === props.reviewId
                    ? {
                       ...reviewMap,
                       review:changeReview
                      }
                    : reviewMap;
                })
              });
              props.setEditReviewModal(false);
            })
            .catch((err) => {
              console.log(err);
              setMsg(err.message);
            });
          return;
        }
        setMsg(FILL_ALL_DATA);
    };

  return (
    <div>
        <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
  
        <div
          className="fixed inset-0 z-10 overflow-y-auto"
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
                      Edit Review
                    </h3>
                  </div>
                </div>
                    <div>
                        <textarea rows="4" onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Edit your review..." defaultValue={`${props.prevReview}`}></textarea>
                    </div>
              </div>
              <p className="text-sm text-red-600 italic text-center mt-1">{msg}</p>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6" >
                <button className="text-white bg-[#75c9b7] hover:bg-[#abd699] font-semibold py-2 px-4 border border-[#5ca092] rounded shadow mx-2" onClick={onSave}>
                    Submit
                </button>
                <button className="text-white bg-[#75c9b7] hover:bg-[#abd699] font-semibold py-2 px-4 border border-[#5ca092] rounded shadow" onClick={() => {
                    props.setEditReviewModal(false);}}>
                    Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditReview