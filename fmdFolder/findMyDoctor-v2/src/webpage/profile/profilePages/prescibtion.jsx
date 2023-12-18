import React, { useEffect, useState } from 'react'
import userDATA from '../../../services/userData';
import { TokenService } from '../../BookLab/labImports';
import noDataImage from '../../../assets/images/noData.png'



 const Prescibtion = () => {
  const { getReviewUser, getUserData } = userDATA();
  const [userReviews, setUserReviews] = useState([]);
  const [userName, setUserName] = useState([]);
  const { getStorageData } = TokenService();
  const userId = getStorageData().id;


  useEffect(() => {
    getReviewUser(userId).then((res) => {
      setUserReviews(res?.data?.data)
      getUserData(userId).then((res) => {
        // console.log(res?.data.data , 'userres');
        setUserName(res?.data?.data?.id)
      })
      // console.log(res.data.data, 'res');
    })
  }, [userReviews])


  const openPopup = () => {
    const popupTrigger = document.getElementsByClassName('presciptionModalId')[0];
    popupTrigger.showModal();
  }
  const closePopup = () => {
    const popupTrigger = document.getElementsByClassName('presciptionModalId')[0];
    popupTrigger.close();
  }
  return (
    <>
      <div className="profileWrapper">
        <div className="header">
          <div className="heading">
            <p className='mainHeading'>Prescriptions</p>
            <p>My Prescriptions, managing your medications has never been easier.</p>
          </div>
          <div className="headerButton">
          </div>

        </div>
        <div className="body">
          {
            userReviews.length === 0 ?
              <div className="noDataImgDiv">
                <img loading="lazy" className='noDataImage' src={noDataImage} alt="reload page" />
              </div>
              :
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      {/* <th>Title</th>
                  <th>Date</th>
                  <th>Doc Name</th>
                  <th>Time</th>
                  <th>Description</th>
                  <th> Details </th> */}
                      <th>Booking ID</th>
                      <th>User</th>
                      <th>Medicines</th>
                      <th>Prescription</th>
                    </tr>
                  </thead>
                  <tbody>

                    {userReviews.map((item, keyId) => (
                      <tr>
                        <td>{item.booking}</td>
                        <td>{item.user}</td>
                        <td>{item.medicines}</td>
                        <td>{item.prescriptions}</td>

                        {/* <td>15/2/2022</td>
                  <td>Ejaz</td>
                  <td>15/2/2022</td>
                  <td>Lorem ipsum dolor sit amet consectetur </td>
                  <td className='tableRedButton' > <button onClick={openPopup}>Details</button> </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          }

        </div>
      </div>
      <div className="modalOuter">
        <dialog class='presciptionModalId'>
          <div className="ModalPopupInner">

            <button className='prescriptionModalClose' onClick={closePopup}><i class="ri-close-line"></i></button>
            <div className="popupInner">
              <h3>Prescription</h3>

              <hr />
              <div className='prescriptionField'>
                <span>Doctor Name:</span>
                <span>Herald</span>

              </div>
              <div className='prescriptionField'>
                <span>Medicine:</span>
                <span>Panadol</span>

              </div>
              <div className='prescriptionField'>
                <span> Description:</span>
                <span> Take 1 Medicine per day</span>
              </div>
              <div className='prescriptionField'>
                <span>  Date and Time:</span>
                <span>15/02/2023 - 12:00</span>

              </div>
              <div className='prescriptionField'>
                <span>
                  Total Price:
                </span>
                <span>    Rs. 2000</span>

              </div>
            </div>
          </div>

        </dialog>
      </div>
    </>
  )
}
export default Prescibtion
