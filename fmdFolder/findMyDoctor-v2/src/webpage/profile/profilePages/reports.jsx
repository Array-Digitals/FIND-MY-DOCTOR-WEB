import React from 'react'

export const Reports = () => {
  const openPopup = () => {
    const popupTrigger = document.getElementsByClassName('reportModalId')[0];
    popupTrigger.showModal();
  }
  const closePopup = () => {
    const popupTrigger = document.getElementsByClassName('reportModalId')[0];
    popupTrigger.close();
  }
  return (
    <>
      <div className="profileWrapper">
        <div className="header">
          <div className="heading">
            <p className='mainHeading'>Lab Reports</p>
            <p>Medical Reports, your health Information at your fingertips.</p>
          </div>

        </div>
        <div className="body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Test Name</th>
                  <th>Lab Name</th>
                  <th>Time</th>
                  <th>Date</th>
                  <th>Report For</th>
                  <th>Details</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CBC</td>
                  <td>Dow Lab</td>
                  <td>10:00</td>
                  <td>15/2/2022</td>
                  <td>Ejaz</td>
                  <td className='tableRedButton'> <button onClick={openPopup}>Details</button> </td>
                  <td><i className="bi bi-download delete"></i></td>
                </tr>
                <tr>
                  <td>CBC</td>
                  <td>Dow Lab</td>
                  <td>10:00</td>
                  <td>15/2/2022</td>
                  <td>Ejaz</td>
                  <td className='tableRedButton'> <button onClick={openPopup}>Details</button> </td>

                  <td><i className="bi bi-download delete"></i></td>
                </tr>
                <tr>
                  <td>CBC</td>
                  <td>Dow Lab</td>
                  <td>10:00</td>
                  <td>15/2/2022</td>
                  <td>Ejaz</td>
                  <td className='tableRedButton'> <button onClick={openPopup}>Details</button> </td>

                  <td><i className="bi bi-download delete"></i></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="modalOuter">
        <dialog class='reportModalId'>
          <div className="ModalPopupInner">

            <button className='prescriptionModalClose' onClick={closePopup}><i class="ri-close-line"></i></button>
            <div className="popupInner">
              <h3>Lab Reports</h3>

              <hr />
              <div className='prescriptionField'>
                <span>Lab Name:</span>
                <span>Herald</span>

              </div>
              <div  className='prescriptionField'>
                <span>Tests:</span>
                <span>CBC, Blood Test</span>
              </div>
              <div  className='prescriptionField'>
                <span>Lab Report Description:</span>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, rerum?</span>
              </div>
              <div  className='prescriptionField'>
                <span>Report For:</span>
                <span>Ejaz</span>
                
              </div>
              
              <div  className='prescriptionField'>
                <span>  Date and Time:</span>
                <span>15/02/2023 - 12:00</span>
                
              </div>
              <div  className='prescriptionField'>
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
export default Reports
