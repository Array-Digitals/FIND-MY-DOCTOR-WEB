import React, { useEffect, useState } from 'react';
import UserData from '../../services/userData';
import { ToastContainer, toast } from "react-toastify";


export const ReviewPopup = ({ reviewRef, reviewType, testProps }) => {
    const { postReview } = UserData();
    const [selectedStars, setSelectedStars] = useState(0);
    const [reviewData, setReviewData] = useState({})
    console.log(reviewData, 'tesppss');
    // console.log(reviewData, 'testttt');
    const [hoveredStars, setHoveredStars] = useState(0);
    const handleStarClick = (selectedCount) => {
        setSelectedStars(selectedCount);
    };
    const handleStarHover = (hoveredCount) => {
        setHoveredStars(hoveredCount);
    };
    const handleStarLeave = () => {
        setHoveredStars(0);
    };
    const closeModalReview = () => {
        const myDialogReview = document.getElementById('reviewDialogId');
        myDialogReview.close();
    }
    const openModalReview = () => {
        const myDialogReview = document.getElementById('reviewDialogId');
        myDialogReview.showModal();
    }

    useEffect(() => {
        if (testProps) {
            setReviewData(testProps)
        }
    }, [testProps])

    // console.log(reviewData, 'reviewData');
    const [reviewModal, setReviewModal] = useState({
        email: '',
        review_comment: '',
        phone: ''
    })
    const getInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setReviewModal({ ...reviewModal, [name]: value })
    }

    // console.log(selectedStars, 'selectedStars');

    // console.log(reviewData, 'reviweeeeeee')
    const reviewSubmitButton = () => {
        // const rating = selectedStars

        console.log('workingg');

        const reviewDataVar = {
            ...reviewModal,
            review_type: reviewType,
            full_name: reviewType === 'products' ? reviewData?.fullname : reviewData?.name,
            review_on_id: reviewType === 'products' ? reviewData?.productId : (reviewType === 'doctor' ? reviewData?.booked_doctor : reviewData?.id),
            // phone: reviewData?.phone,
            rating: selectedStars
        }
        console.log(reviewDataVar, 'reviewData');
        postReview(reviewDataVar).then((res) => {
            toast.success('Review Submitted')
            closeModalReview();
            console.log(res.data, 'res');
        }).catch((res) => { console.log(res, 'res'); })
    }

    return (
        <React.Fragment>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <dialog id='reviewDialogId' className='reviewDialog' ref={reviewRef} >
                <div className="reviewMain">
                    <button className="closeButton" onClick={closeModalReview}><i className="ri-close-fill"></i></button>
                    <div className="reviewFields">
                        <p>
                            Rate Us A Review
                        </p>
                    </div>
                    <div className="reviewFields">
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map((index) => (
                                <i
                                    key={index}
                                    className={`ri-star-${index <= (selectedStars || hoveredStars) ? 'fill' : 'line'}`}
                                    onMouseEnter={() => handleStarHover(index)}
                                    onMouseLeave={handleStarLeave}
                                    onClick={() => handleStarClick(index)}
                                    value={index}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="reviewFields">
                        <input type="email" placeholder='Email...' name='email' onChange={getInput} required />
                    </div>
                    <div className="reviewFields">
                        <input type="number" placeholder='Phone...' name='phone' onChange={getInput} required />
                    </div>
                    <div className="reviewFields">
                        <textarea rows="5" placeholder='Message...' name='review_comment' onChange={getInput} required></textarea>
                    </div>
                    <div className="reviewFieldButton">
                        <button type='submit' onClick={reviewSubmitButton}>Submit</button>
                    </div>
                </div>
            </dialog>
        </React.Fragment>
    );
};