import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import DoctorService from '../../../services/doctorService';

export const AppointmentDetails = () => {
    const navigate = useNavigate();
    const { detailsId } = useParams();
    const { getBookingDetails } = DoctorService();
    const [data, setData] = useState([]);
    const [dataprescription, setDataPrescription] = useState([]);

    useEffect(() => {
        getBookingDetails(detailsId).then((res) => {
            console.log(res, 'res');
            setData(res?.data?.data)
            setDataPrescription(res?.data?.data?.prescriptions)
        }).catch((res) => {
            console.log(res, 'err');
        })
    }, [detailsId])

    // console.log(dataprescription, 'prescription');

    return (
        <>
            <div>
                <section className='mainSection'>
                    <div className="container">
                        <div className="mainSectionWrapper">
                            <div className="heading">
                                <p>
                                    <button className='navigateBackButton' onClick={() => { navigate(-1) }}><i class="ri-arrow-left-line"></i></button> <span> Appointment Details</span>
                                </p>
                            </div>
                            <div className="card cardForm">
                                <div className="card-body">
                                    <div className="appointmentDetails">
                                        <div className="mainHeading">
                                            {data?.name}
                                        </div>
                                        <hr />
                                        <div className="mainBody">
                                            <div className="mainBodySection">
                                                <div className="subHeading">
                                                    Booking ID: <span>{data?.id}  </span>
                                                </div>
                                            </div>

                                            <div className="mainBodySection">
                                                <div className="subHeading">
                                                    Appointment Type
                                                </div>
                                                <div className="summary">
                                                    {data?.Appointment_Type}
                                                </div>
                                            </div>
                                            {/* <div className="mainBodySection">
                                                <div className="subHeading">
                                                    Consultation Type
                                                </div>
                                                <div className="summary">
                                                    {data?.consultation_type}
                                                </div>
                                            </div> */}
                                            {
                                                data?.specialist_category &&
                                                < div className="mainBodySection">
                                                    <div className="subHeading">
                                                        Specialist Category
                                                    </div>
                                                    <div className="summary">
                                                        {data?.specialist_category}
                                                    </div>

                                                </div>
                                            }
                                            <div className="mainBodySection">
                                                <div className="subHeading">
                                                    Beneficiary
                                                </div>
                                                <div className="summary">
                                                    {data?.is_beneficiary}
                                                </div>
                                            </div>
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
                                                dataprescription.length > 0 &&
                                                <React.Fragment>
                                                    <div className="mainBodySection">
                                                        <div className="subHeading">
                                                            Prescription
                                                        </div>
                                                        <div className="testSummary">
                                                            {
                                                                dataprescription.map((item, keyId) => (

                                                                    <div key={keyId} className="tesDetails">
                                                                        <div className="testDetailsInner">
                                                                            {item?.prescriptions}
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }


                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="mainBodySection">
                                                        <div className="subHeading">
                                                            Medicine
                                                        </div>
                                                        <div className="testSummary">
                                                            {
                                                                dataprescription.map((item, keyId) => (

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
                                                </React.Fragment>
                                            }






                                            <div className="mainBodySection">

                                                <div className="testSummary">
                                                    <div className="tesDetails">
                                                        <div className="testDetailsInnerHeading">
                                                            Total
                                                        </div>
                                                        <div className="testDetailsInner">
                                                            Rs.{data?.amount}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </div >
        </>
    )
}
