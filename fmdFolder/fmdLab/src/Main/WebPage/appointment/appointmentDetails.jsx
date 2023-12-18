import React from 'react'

export const AppointmentDetails = () => {
    return (
        <>
            <div>
                <section className='mainSection'>
                    <div className="container">
                        <div className="mainSectionWrapper">
                            <div className="heading">
                                <p>
                                    Appointment Details
                                </p>
                            </div>
                            <div className="card cardForm">
                                <div className="card-body">
                                    <div className="appointmentDetails">
                                        <div className="mainHeading">
                                            John Doe
                                        </div>
                                        <hr />
                                        <div className="mainBody">
                                            <div className="mainBodySection">
                                                <div className="subHeading">
                                                    Booking ID: <span>124
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mainBodySection">
                                                <div className="subHeading">
                                                    Description
                                                </div>
                                                <div className="summary">
                                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti veritatis reprehenderit distinctio accusantium quam aspernatur minima pariatur hic corporis similique.
                                                </div>
                                            </div>
                                            <div className="mainBodySection">
                                                <div className="subHeading">
                                                    Booking Date
                                                </div>
                                                <div className="summary">
                                                   12/02/2023
                                                </div>
                                            </div>
                                            <div className="mainBodySection">
                                                <div className="subHeading">
                                                    Booking Time
                                                </div>
                                                <div className="summary">
                                                    22:00
                                                </div>
                                            </div>
                                            <div className="mainBodySection">
                                                <div className="subHeading">
                                                    Address
                                                </div>
                                                <div className="summary">
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                </div>
                                            </div>
                                            <div className="mainBodySection">
                                                <div className="subHeading">
                                                    Payment
                                                </div>
                                                <div className="summary">
                                                    Cash
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="mainBodySection">
                                                <div className="subHeading">
                                                    Test Details
                                                </div>
                                                <div className="testSummary">
                                                    <div className="tesDetails">
                                                        <div className="testDetailsInner">
                                                            Blood Test | Agha Khan Hospital
                                                        </div>
                                                        <div className="testDetailsInner">
                                                            Rs.700
                                                        </div>
                                                    </div>
                                                    <div className="tesDetails">
                                                        <div className="testDetailsInner">
                                                            Blood Test | Agha Khan Hospital
                                                        </div>
                                                        <div className="testDetailsInner">
                                                            Rs.700
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />

                                            <div className="mainBodySection">

                                                <div className="testSummary">
                                                    <div className="tesDetails">
                                                        <div className="testDetailsInner">
                                                            Total
                                                        </div>
                                                        <div className="testDetailsInner">
                                                            Rs.1400
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
                </section>
            </div>
        </>
    )
}
