import React, { useState } from 'react'
import EditReview from './EditReview';
import DeleteReview from './DeleteReview';

const ReviewCard = (props) => {

    const [editReviewModal,setEditReviewModal] = useState(false);
    const [deleteReviewModal,setDeleteReviewModal] = useState(false);

  return (
    <div>
        
    <div className="container px-0">
        <div
            className="flex-col py-2 mt-3 bg-white border-2 border-gray-200 sm:rounded-lg sm:shadow-sm md:w-2/3">
            <div className="flex flex-row justify-between md-10">
                <div className="flex-col mt-1">
                    <div className="flex items-center flex-1 px-4 font-bold leading-tight">{props.review.username}
                        <span className="ml-2 text-xs font-normal text-gray-500">{props.review.date} {props.review.time}</span>
                    </div>
                    
                    <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">{props.review.review}
                    </div>
                    
                </div>
                {props.userId === props.review.userid && <div className='flex'>
                    <button className='flex text-right ml-2 text-sm font-medium leading-loose text-gray-600' onClick={()=>setEditReviewModal(true)}>Edit</button>
                    <button className='flex px-2 text-right ml-2 text-sm font-medium leading-loose text-gray-600' onClick={()=>setDeleteReviewModal(true)}>Delete</button>
                </div>}
            </div>
        </div>
    </div>

    {editReviewModal && <EditReview setEditReviewModal={setEditReviewModal} reviewId={props.review._id} prevReview={props.review.review} reviews={props.reviews} setReviews={props.setReviews}/>}
    {deleteReviewModal && <DeleteReview reviewId={props.review._id} setDeleteReviewModal = {setDeleteReviewModal} delReview={props.review.review} reviews={props.reviews} setReviews={props.setReviews}/>}
    </div>
  )
}

export default ReviewCard