import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { ROUTES } from '../../../utils/Routes';
import DoctorService from '../../../services/doctorService';
import dataNotFound from '../../../assets/images/noData.png'

export const Appointment = () => {
  const { getActiveAppointment, getHistoryAppointment } = DoctorService();

  const navigate = useNavigate();
  const [appointmentData, setAppointmentData] = useState([]);
  useEffect(() => {
    getActiveAppointment().then((res) => {
      setAppointmentData(res?.data?.data)
    }).catch((res) => {
      console.log(res)
    })
  }, [])
  // console.log(appointmentData, 'daataa');

  const [appointmentHistoryData, setAppointmentHistoryData] = useState([])
  useEffect(() => {
    getHistoryAppointment().then((res) => {
      setAppointmentHistoryData(res?.data?.data)
      console.log(res?.data , 'historyyy');
    }).catch((res) => {
      console.log(res)
    })
  }, [])
  const { detailsId } = useParams();

  const handleNavigate = id => {
    navigate(`${ROUTES.APPOINTMENT_DETAILS}/${id}`);
  }
  return (
    <>
      <div>
        <section className='mainSection'>
          <div className="container">
            <div className="mainSectionWrapper">
              <div className="heading">
                <p>
                  Your Appointments
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

                          {appointmentData.length > 0 ?
                            <>
                              {appointmentData?.map((item, keyid) => {
                                return (
                                  <a key={keyid} className="list-group-item list-group-item-action">
                                    <div className="rewardList">

                                      <div className=" w-100">
                                        <h5 className="mb-1">{item?.resepient_name}</h5>
                                        {/* <p className="mb-1">Booking Details comes here</p> */}
                                      </div>
                                    </div>
                                    {/* <small>{item?.date_time}</small> */}
                                    <div className="metaDatasDiv">
                                      <div>
                                        <p className="metaData"> Patient Name: {item?.appointment_user}</p>
                                      </div>
                                      <div>
                                        <p className="metaData"> Consultation Type: {item.doctor_consultation_type}</p>
                                      </div>
                                      <div>
                                        <p className="metaData"> Appointment Type: {item.appoint_type}</p>
                                      </div>
                                      <div>
                                        <p className="metaData"> Amount: {item?.amount}</p>
                                      </div>
                                      <div>
                                        <p className="metaData"> Status: {item?.status}</p>
                                      </div>
                                    </div>
                                    <div className="metaButtons">
                                      <button className="viewButton" onClick={() => { handleNavigate(item?.id) }}>View</button>
                                      {/* <button className="acceptButton">Accept</button>
                                      <button className="rejectButton">Reject</button> */}
                                    </div>
                                  </a>
                                )
                              })}
                            </>
                            :
                            <div className="dataNotFoundDiv">
                              <img className='dataNotFoundImg' src={dataNotFound} alt="" />
                            </div>
                          }
                        </div>
                      </div>
                      <div className="panel" id="two-panel">

                        <div className="list-group">
                          {appointmentHistoryData > 0 ?
                            <>
                              {appointmentHistoryData?.map((item, keyid) => {
                                return (
                                  <a key={keyid} className="list-group-item list-group-item-action">
                                    <div className="rewardList">

                                      <div className=" w-100">
                                        <h5 className="mb-1">{item?.resepient_name}</h5>
                                        {/* <p className="mb-1">Booking Details comes here</p> */}
                                      </div>
                                    </div>
                                    {/* <small>{item?.date_time}</small> */}
                                    <div className="metaDatasDiv">
                                      <div>
                                        <p className="metaData"> Patient Name: {item?.appointment_user}</p>
                                      </div>
                                      <div>
                                        <p className="metaData"> Consultation Type: {item.doctor_consultation_type}</p>
                                      </div>
                                      <div>
                                        <p className="metaData"> Appointment Type: {item.appoint_type}</p>
                                      </div>
                                      <div>
                                        <p className="metaData"> Amount: {item?.amount}</p>
                                      </div>
                                      <div>
                                        <p className="metaData"> Status: {item?.status}</p>
                                      </div>
                                    </div>
                                    <div className="metaButtons">
                                    <button className="viewButton" onClick={() => { handleNavigate(item?.id) }}>View</button>
                                      {
                                        item?.status === 'accepted' &&
                                        <button className="acceptButton">Accepted</button>
                                      }
                                      {
                                        item?.status === 'rejected' &&
                                        <button className="rejectButton">Rejected</button>

                                      }
                                      {item?.status === 'pending' &&
                                        <button className="viewButton">Pending</button>
                                      }
                                    </div>
                                  </a>
                                )
                              })}
                            </>

                            :
                            <div className="dataNotFoundDiv">
                              <img className='dataNotFoundImg' src={dataNotFound} alt="" />
                            </div>

                          }

                          {/* <div className="metaButtons">
                            <button className="viewButton" onClick={handleNavigate}>View</button>
                            <button className="acceptButton">Accepted</button>

                          </div> */}


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
