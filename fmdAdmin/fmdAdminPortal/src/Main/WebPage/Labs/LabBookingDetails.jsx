import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router';
import AdminService from '../../../services/adminApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UploadFile } from '../../Component/uploadFile';
import { imageUrl } from '../../../services/baseUrl';

export const LabBookingDetails = () => {
  let { BookingId } = useParams();
  // let serverUrl = "http://fmd.arraydigitals.com"
  const { labBookingDetails, getAllAssitant, postAssignBooking } = AdminService();
  const navigate = useNavigate()
  const [testBooking, setTestBooking] = useState()
  const [allTests, setAllTests] = useState([])
  const [isLabAssitant, setIsLabAssistant] = useState([]);
  const [selectedLabAssitant, setSelectedLabAssistant] = useState();

  const [popupData, setPopupData] = useState({
    booking: '',
    test_id: ''
  })

  const myDialogRef1 = useRef(null);
  const triggerPopup1 = (booking, test_id) => {
    if (myDialogRef1.current) {
      myDialogRef1.current.showModal();
    }
    setPopupData({ booking, test_id })

  };


  useEffect(() => {
    labBookingDetails(BookingId).then((res) => {
      console.log(res?.data?.data, 'booking Details');
      setTestBooking(res?.data?.data);
      setAllTests(res?.data?.data?.tests)
    }).catch((res) => {
      console.log(res);
    })
  }, [allTests, testBooking])

  useEffect(() => {
    getAllAssitant().then((res) => {
      // console.log(res?.data?.data);
      setIsLabAssistant(res?.data?.data);
    }).catch((res) => {
      console.log(res);
    })
  }, [])

  const formSubmit = () => {

    const labortionist = selectedLabAssitant;
    const testid = BookingId;
    const data = { labortionist, testid }
    postAssignBooking(data).then((res) => {
      console.log(res, "ressss");
      toast.success('Phlebotomist Updated');
    }).catch((res) => {
      console.log(res);
    })
    console.log(data, "testttttttt");
  }


  return (
    <React.Fragment>
      <div>
        <section className='mainSection'>
          <div className="container">
            <div className="mainSectionWrapper">
              <div className="heading">
                <p>
                  <button className='navigateBackButton' onClick={() => { navigate(-1) }}><i className="ri-arrow-left-line"></i></button>    Booking Details
                </p>
              </div>
              <div className="card cardForm">
                <div className="card-body">
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
                  <div className="appointmentDetails ">
                    {!testBooking
                      ?
                      <p>Loading...</p>
                      :
                      <React.Fragment>

                        <div className="mainBody">
                          <div className="mainBodyHeading2">
                            <p>     Lab Details</p>
                          </div>

                          <div className="mainBodySection">
                            <div className="subHeading">
                              Order ID: <span> {testBooking.id} </span>
                            </div>
                            <div className="subHeading">
                              Name: <span> {testBooking.name} </span>
                            </div>
                            <div className="subHeading">
                              Amount: <span> {testBooking.amount} </span>
                            </div>
                            <div className="subHeading">
                              For Beneficiary: <span> {testBooking.is_beneficiary} </span>
                            </div>
                            <div className="subHeading">
                              Status: <span> {testBooking.b_status} </span>
                            </div>
                            <div className="subHeading">
                              Assign Phlebotomist: <select className='allLabortonistSelect' name="labortionist" id="" onChange={(e) => { setSelectedLabAssistant(e.target.value) }}>
                                <option selected disabled>Select Phlebotomist</option>
                                {
                                  isLabAssitant.map((item, keyId) => (
                                    <option key={keyId} value={item.id}>{item.fullname}</option>
                                  ))
                                }
                              </select>
                            </div>
                            <div className="subHeading">
                              <button onClick={formSubmit} disabled={!selectedLabAssitant} className='allLabortonistButton'>Update</button>
                            </div>
                          </div>
                        </div>

                        <div className="mainBodys">
                        <div className="mainBodyHeading2">
                            <p>Tests</p>
                          </div>
                          {allTests.map((item, keyId) => (

                            <div className="mainBodySection" key={keyId}>
                              <div className="subHeading">
                                Lab ID: <span> {item.lab_id} </span>
                              </div>
                              <div className="subHeading">
                                Lab Name: <span> {item.lab_name} </span>
                              </div>
                              <div className="subHeading">
                                Test ID: <span> {item.test_id} </span>
                              </div>
                              <div className="subHeading">
                                Test Name: <span> {item.test_name} </span>
                              </div>
                              <div className="subHeading">
                                Test Price: <span> {item.test_price} </span>
                              </div>
                              <div className="subHeading">
                                <span>
                                  Test Report:
                                </span>
                                <span>
                                  {item.test_report === null ? (
                                    <button className='uploadButton' onClick={() => triggerPopup1(item.booking, item.id)}>Upload</button>
                                  ) : (
                                    <div className='buttonOuter'>
                                      {/* <button className='uploadButton' onClick={() => triggerPopup1(item.booking, item.id)}>Update</button> */}
                                      <a href={`${imageUrl}/${item.test_report}`} target="_blank">View File</a>
                                    </div>
                                  )}
                                </span>
                              </div>
                              <hr />
                            </div>
                          ))}
                        </div>
                      </React.Fragment>

                    }
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <UploadFile myDialogRef1={myDialogRef1} booking={popupData.booking} test_id={popupData.test_id} />
      </div>
    </React.Fragment>
  )
}
