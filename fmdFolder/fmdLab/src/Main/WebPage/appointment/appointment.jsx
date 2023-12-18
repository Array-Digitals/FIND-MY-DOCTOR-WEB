import React from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../../utils/Routes';

export const Appointment = () => {
  const navigate = useNavigate();
  const handleNavigate = e =>{
    navigate(ROUTES.APPOINTMENT_DETAILS);
  }
  return (
    <>
      <div>
        <section className='mainSection'>
          <div className="container">
            <div className="mainSectionWrapper">
              <div className="heading">
                <p>
                  Lab Bookings
                </p>
              </div>
              <div className="card cardForm">
                <div className="card-body">
                  <div className="doctorAppointments">
                    <input className="radio" id="one" name="group" type="radio" defaultChecked />
                    <input className="radio" id="two" name="group" type="radio" />

                    <div className="tabs">
                      <label className="tab" id="one-tab" htmlFor="one">Appointment</label>
                      <label className="tab" id="two-tab" htmlFor="two">History</label>
                    </div>
                    <div className="panels">
                      <div className="panel" id="one-panel">
                        <div className="list-group">
                          <a className="list-group-item list-group-item-action">
                            <div className="rewardList">

                              <div className=" w-100">
                                <h5 className="mb-1">Patient Name</h5>
                                <p className="mb-1">Booking Details comes here</p>
                              </div>
                            </div>
                            <small>10:10 - 04/04/2022</small>
                            <div className="metaDatasDiv">
                              <div>
                                <p className="metaData"> Booking ID: 124</p>
                              </div>
                              <div>
                                <p className="metaData"> Total Tests: 1</p>
                              </div>
                              <div>
                                <p className="metaData"> Address: Karachi,Gulshan</p>
                              </div>
                              <div>
                                <p className="metaData"> Payment: Cash</p>
                              </div>
                            </div>
                            <div className="metaButtons">
                              <button className="viewButton" onClick={handleNavigate} >View</button>
                              <button className="acceptButton">Accept</button>
                              <button className="rejectButton">Reject</button>
                            </div>
                          </a>
                          <a className="list-group-item list-group-item-action">
                            <div className="rewardList">

                              <div className=" w-100">
                                <h5 className="mb-1">Patient Name</h5>
                                <p className="mb-1">Booking Details comes here</p>
                              </div>
                            </div>
                            <small>10:10 - 04/04/2022</small>
                            <div className="metaDatasDiv">
                              <div>
                                <p className="metaData"> Booking ID: 124</p>
                              </div>
                              <div>
                                <p className="metaData"> Total Tests: 1</p>
                              </div>
                              <div>
                                <p className="metaData"> Address: Karachi,Gulshan</p>
                              </div>
                              <div>
                                <p className="metaData"> Payment: Cash</p>
                              </div>
                            </div>
                            <div className="metaButtons">
                              <button className="viewButton" onClick={handleNavigate} >View</button>
                              <button className="acceptButton">Accept</button>
                              <button className="rejectButton">Reject</button>
                            </div>
                          </a>
                          <a className="list-group-item list-group-item-action">
                            <div className="rewardList">

                              <div className=" w-100">
                                <h5 className="mb-1">Patient Name</h5>
                                <p className="mb-1">Booking Details comes here</p>
                              </div>
                            </div>
                            <small>10:10 - 04/04/2022</small>
                            <div className="metaDatasDiv">
                              <div>
                                <p className="metaData"> Booking ID: 124</p>
                              </div>
                              <div>
                                <p className="metaData"> Total Tests: 1</p>
                              </div>
                              <div>
                                <p className="metaData"> Address: Karachi,Gulshan</p>
                              </div>
                              <div>
                                <p className="metaData"> Payment: Cash</p>
                              </div>
                            </div>
                            <div className="metaButtons">
                              <button className="viewButton" onClick={handleNavigate} >View</button>
                              <button className="acceptButton">Accept</button>
                              <button className="rejectButton">Reject</button>
                            </div>
                          </a>

                        </div>
                      </div>
                      <div className="panel" id="two-panel">

                        <div className="list-group">
                        <a className="list-group-item list-group-item-action">
                            <div className="rewardList">

                              <div className=" w-100">
                                <h5 className="mb-1">Patient Name</h5>
                                <p className="mb-1">Booking Details comes here</p>
                              </div>
                            </div>
                            <small>10:10 - 04/04/2022</small>
                            <div className="metaDatasDiv">
                              <div>
                                <p className="metaData"> Booking ID: 124</p>
                              </div>
                              <div>
                                <p className="metaData"> Total Tests: 1</p>
                              </div>
                              <div>
                                <p className="metaData"> Address: Karachi,Gulshan</p>
                              </div>
                              <div>
                                <p className="metaData"> Payment: Cash</p>
                              </div>
                            </div>
                            <div className="metaButtons">
                              <button className="viewButton" onClick={handleNavigate} >View</button>
                            </div>
                          </a>
                          <a className="list-group-item list-group-item-action">
                            <div className="rewardList">

                              <div className=" w-100">
                                <h5 className="mb-1">Patient Name</h5>
                                <p className="mb-1">Booking Details comes here</p>
                              </div>
                            </div>
                            <small>10:10 - 04/04/2022</small>
                            <div className="metaDatasDiv">
                              <div>
                                <p className="metaData"> Booking ID: 124</p>
                              </div>
                              <div>
                                <p className="metaData"> Total Tests: 1</p>
                              </div>
                              <div>
                                <p className="metaData"> Address: Karachi,Gulshan</p>
                              </div>
                              <div>
                                <p className="metaData"> Payment: Cash</p>
                              </div>
                            </div>
                            <div className="metaButtons">
                              <button className="viewButton" onClick={handleNavigate} >View</button>
                            </div>
                          </a>
                          <a className="list-group-item list-group-item-action">
                            <div className="rewardList">

                              <div className=" w-100">
                                <h5 className="mb-1">Patient Name</h5>
                                <p className="mb-1">Booking Details comes here</p>
                              </div>
                            </div>
                            <small>10:10 - 04/04/2022</small>
                            <div className="metaDatasDiv">
                              <div>
                                <p className="metaData"> Booking ID: 124</p>
                              </div>
                              <div>
                                <p className="metaData"> Total Tests: 1</p>
                              </div>
                              <div>
                                <p className="metaData"> Address: Karachi,Gulshan</p>
                              </div>
                              <div>
                                <p className="metaData"> Payment: Cash</p>
                              </div>
                            </div>
                            <div className="metaButtons">
                              <button className="viewButton" onClick={handleNavigate} >View</button>
                            </div>
                          </a>

                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
