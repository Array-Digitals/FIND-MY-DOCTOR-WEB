import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import AdminService from '../../../services/adminApi';
import { Loader } from '../../Component/loader'
import { toast, ToastContainer } from "react-toastify";


export const BookingDetailsAll = () => {
    const navigate = useNavigate();
    const { doctorBookingId } = useParams();
    const { getDoctorBookingDiscusion, getDoctorType, doctorBookingModification, getDoctor } = AdminService();
    const [bookDetails, setBookDetails] = useState([]);
    const [bookPresciption, setBookPresciption] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [assignedDoctor, setAssignedDoctor] = useState(null);
    const [allPhysicalDoctor, setAllPhysicalDoctor] = useState([]);

    useEffect(() => {
        getDoctorBookingDiscusion(doctorBookingId).then((res) => {
            console.log(res?.data?.data, 'nplgosdgs');
            setBookDetails(res?.data?.data);
            setBookPresciption(res?.data?.data?.prescriptions);
        }).catch((res) => {
            console.log(res, 'res');
        })
    }, [doctorBookingId])

    useEffect(() => {
        getDoctor().then((res) => {
            const allDoctors = res?.data?.data;
            const physicalDoctors = allDoctors.filter(doctor => doctor.consultation === 'physical');
            setAllPhysicalDoctor(physicalDoctors);
        }).catch((err) => {
            console.log(err, 'err');
        })
    }, [allPhysicalDoctor])


    useEffect(() => {
        console.log(assignedDoctor, 'assignDoc');
    }, [assignedDoctor])
    const updateDoctorMod = () => {
        const bookingPayload = { booking: bookDetails.id, doctor: assignedDoctor, type: 'assign_doctor' }
        setIsLoading(true);
        console.log(bookingPayload, 'asd');
        if (bookingPayload.doctor) {
            doctorBookingModification(bookingPayload).then((res) => {
                toast.success('Doctor Updated')
            }).catch((res) => {
                console.log(res, 'ress');
            }).finally(() => {
                setIsLoading(false)
            })

        }
        else {
            toast.error('Choose Doctor')
        }
    }
    // { console.log(bookDetails, 'bookingggs') }

    return (
        <>
            <div>
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
                <section className='mainSection'>
                    <div className="container">
                        <div className="mainSectionWrapper">
                            <div className="heading">
                                <p>
                                    <button className='navigateBackButton' onClick={() => { navigate(-1) }}><i className="ri-arrow-left-line"></i></button> <span> Appointment Details</span>
                                </p>
                            </div>
                            <div className="card cardForm">
                                <div className="card-body">
                                    {isLoading ?
                                        <Loader />
                                        :
                                        <div className="appointmentDetails">
                                            <div className="mainBodyHeading2">
                                                <p> {bookDetails?.name}</p>
                                            </div>
                                            {/* <div className="mainHeading">
                                                {bookDetails?.name}
                                            </div> */}
                                            <hr />
                                            <div className="mainBody">
                                                <div className="mainBodySection">
                                                    <div className="subHeading">
                                                        Booking ID: <span>{bookDetails?.id}  </span>
                                                    </div>
                                                </div>

                                                <div className="mainBodySection">
                                                    {/* <div className="subHeading">
                                                    Amount: <span>{bookDetails?.amount}</span>
                                                </div> */}
                                                    {/* <div className="summary">
                                                    {bookDetails?.amount}
                                                </div> */}
                                                </div>
                                                <div className="mainBodySection">
                                                    <div className="subHeading">
                                                        Beneficiary: <span> {bookDetails?.is_beneficiary}</span>
                                                    </div>
                                                    {/* <div className="summary">
                                                    {bookDetails?.is_beneficiary}
                                                </div> */}
                                                </div>
                                                <div className="mainBodySection">
                                                    <div className="subHeading">
                                                        Status: <span> {bookDetails?.b_status}</span>
                                                    </div>
                                                </div>

                                                {/* {
                                                    bookDetails?.consultation_type &&
                                                    <div className="mainBodySection">
                                                        <div className="subHeading">
                                                            Consultation Type: <span> {bookDetails?.consultation_type}</span>
                                                        </div>
                                                    </div>
                                                } */}
                                                {
                                                    bookDetails?.specialist_category &&
                                                    <div className="mainBodySection">
                                                        <div className="subHeading">
                                                            Specialist Category: <span> {bookDetails?.specialist_category}</span>
                                                        </div>
                                                    </div>
                                                }
                                                <div className="mainBodySection">
                                                    <div className="subHeading">
                                                        Appointment Type: <span> {bookDetails?.Appointment_Type}</span>
                                                    </div>
                                                </div>
                                                {/* <div className="mainBodySection">
                                                    <div className="subHeading">
                                                        Booked Doctor: <span>
                                                            <select name="" id="" onChange={(e) => { setAssignedDoctor(e.target.value) }}>
                                                                <option value="">Select Doctor</option>
                                                                {allPhysicalDoctor.map((item, keyId) => (
                                                                    <option key={keyId} value={item.id}>{item.fullname}</option>
                                                                ))}
                                                            </select></span>
                                                    </div>
                                                </div> */}
                                                {/* <div className="mainBodySection">
                                                    <div className="subHeading">
                                                        <button className='uploadButton marginButton' onClick={updateDoctorMod}>Update</button>
                                                    </div>
                                                </div> */}
                                                {/* <div className="mainBodySection">
                                                <div className="subHeading">
                                                    Address
                                                </div>
                                                <div className="summary">
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                </div>
                                            </div> */}
                                                {/* <div className="mainBodySection">
                                                <div className="subHeading">
                                                    Payment
                                                </div>
                                                <div className="summary">
                                                    Cash
                                                </div>
                                            </div> */}
                                                <hr />
                                                {
                                                    bookPresciption.prescriptions &&
                                                    <>
                                                        <div className="mainBodySection">
                                                            <div className="subHeading">
                                                                Prescription
                                                            </div>
                                                            <div className="testSummary">
                                                                <div className="tesDetails">
                                                                    {/* {console.log(bookPresciption,'bookingg')} */}
                                                                    {
                                                                        bookPresciption?.map((item, keyId) => (
                                                                            <div key={keyId} className="testDetailsInner">
                                                                                {item?.prescriptions}
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <hr />
                                                    </>

                                                }
                                                {bookPresciption.medicines &&
                                                    <>
                                                        <div className="mainBodySection">
                                                            <div className="subHeading">
                                                                Medicine
                                                            </div>
                                                            <div className="testSummary">
                                                                {
                                                                    bookPresciption?.map((item, keyId) => (
                                                                        <div key={keyId} className="tesDetails">
                                                                            <div className="testDetailsInner">
                                                                                {item?.medicines}
                                                                            </div>

                                                                        </div>
                                                                    ))
                                                                }


                                                            </div>
                                                        </div>

                                                        <hr />
                                                    </>

                                                }
                                                <div className="mainBodySection">

                                                    <div className="testSummary">
                                                        <div className="tesDetails">
                                                            <div className="testDetailsInnerHeading">
                                                                Total
                                                            </div>
                                                            <div className="testDetailsInner">
                                                                Rs. {bookDetails?.amount}
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
