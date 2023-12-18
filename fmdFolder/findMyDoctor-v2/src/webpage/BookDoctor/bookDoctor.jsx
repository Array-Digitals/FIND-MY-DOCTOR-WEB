import "react-datepicker/dist/react-datepicker.css";
import { React, useRef, useState, TimePicker, useEffect, Link, Greeting, LoginPopup, AddBeneficiary, SignupPopup, self, visaMaster, online, physical, family, verified, DatePicker, BookDoctorAPI, TokenService, ROUTING, UserData, Slider, banner1, banner2, banner3, MobBanner1, MobBanner2, MobBanner3 } from './doctorImport.js'
import DoctorService from "./doctorService.js";
import { Loader } from "../Component/loader.jsx";
import { ToastContainer, toast } from "react-toastify";


const BookDoctor = () => {
    const { disabledDays, isWeekday, isDisabledDay, processBooked, bannersDesk, isLoading, reciepentName, onSiteDoctorTime, selectedTime, setSelectedTime, imageUrl, specialities, doctorType, getInput, formSubmit, BookingOnlineDate, BookingOnsiteDate, onSiteTime, setOnSiteTime, onlineDoctorState, setOnlineDoctorState, setTime, bookDate, setBookDate, physicalDocDate, setPhysicalDocDate, tomorrow, timeSlots, appointedTime, currentStep, handleStepBack, handleStepNext, setDoctorBooking, doctorBooking, beneOption, settings, myDialogRef1, myDialogRef3, allBeneficiary, onChangeBeneficiary, isBeneficiary, getTestFor, handleRegisteredBeneChange, handleDataBenePopup, myDialogRef } = DoctorService();
    const { getToken, rememberGet } = TokenService();
    useEffect(() => {
        // console.log(processBooked, 'processss');
        if (processBooked) {
            toast.error("Invalid Promo")
        }
    }, [processBooked])


    // console.log(onlineDoctorState[0], 'heyy');
    return (
        <React.Fragment>
            <main >
                {getToken(rememberGet()) &&
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
                };
                {isLoading
                    ?
                    <Loader />
                    :
                    <form className="bookDoctor mainServiceContainer" onSubmit={formSubmit}>
                        <section className="bookDoctorBanner">
                            <Slider {...settings}>
                                {
                                    bannersDesk.map((item, keyId) => {
                                        let desktopImage = `${imageUrl}/${item.image}`
                                        return (
                                            <div className="banner" key={keyId}>
                                                <div className="bannerInner">
                                                    <img loading="lazy" src={desktopImage} alt="reload page" />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>

                        </section>
                        <>

                            {/* Whose Booking for? */}
                            {currentStep === 1 && (
                                <div className="switchDiv ">
                                    <section>
                                        <div className="container">

                                            <div className="mainBody">
                                                <div className="mainBodyHeading">
                                                    <h1>
                                                        Who Are You <span>Booking</span> For?
                                                    </h1>
                                                </div>
                                                <div className="mainBodyInner">
                                                    <div className="rowButton wrapper ">
                                                        <div className='radioButtonCheck'>
                                                            <input type="radio" id="option0" name="LabBookedFor" value="self" onChange={getTestFor} />
                                                            <label className="radio-button" htmlFor="option0">
                                                                <div className="imgDiv">
                                                                    <img loading="lazy" src={self} alt="reload page" />
                                                                </div>
                                                                Self
                                                            </label>
                                                        </div>
                                                        <div className='radioButtonCheck'>
                                                            <input type="radio" id="option2" name="LabBookedFor" value="family" onChange={getTestFor} />
                                                            <label className="radio-button" htmlFor="option2">
                                                                <div className="imgDiv">
                                                                    <img loading="lazy" src={family} alt="reload page" />
                                                                </div>
                                                                Beneficiary
                                                            </label>
                                                        </div>

                                                    </div>
                                                    {
                                                        beneOption &&
                                                        <div className="selectBeneficiary">
                                                            {allBeneficiary.length >= 1 ?

                                                                <select name="selectBeneficiaryBook" id="" onChange={onChangeBeneficiary}>
                                                                    <option disabled selected>Select Beneficiary</option>
                                                                    {allBeneficiary.map((item, keyId) => {
                                                                        return (
                                                                            <option key={keyId} value={item?.id}>{item?.fullname}</option>
                                                                        )
                                                                    })}
                                                                </select>


                                                                :
                                                                <div className="missingBene">
                                                                    <Link to={ROUTING.BENEFICIARY}><i className="ri-add-line"></i> Add Beneficiary</Link>
                                                                </div>

                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section>
                                        <div className="pagging">
                                            <div className="container">
                                                <div className="wrapper">
                                                    <div className="buttons">
                                                        <div>
                                                            <button href="#" className='nextButton' onClick={handleStepNext} disabled={!isBeneficiary}><i className="bi bi-arrow-right"></i></button>
                                                        </div>
                                                        <div className="progressBar">
                                                            <progress min="0" max="70" value="10" id='pageProgress' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </section>
                                </div>
                            )}
                            {/* Appointment Type?  */}
                            {currentStep === 2 && (
                                <div className="switchDiv">
                                    <section>
                                        <div className="container">

                                            <div className="mainBody">
                                                <div className="mainBodyHeading">
                                                    <h1>
                                                        <span>Appointment</span> Type
                                                    </h1>
                                                </div>
                                                <div className="mainBodyInner">
                                                    <div className="rowButton wrapper ">
                                                        {/* {consultationType?.map((item, keyid) => {
                                                return (
                                                    <div className="columnButtons" key={keyid}>
                                                        <div className='radioButton'>
                                                            <input type="radio" id="onlineId" name="consultation_type" value={item.description} onChange={getInput} />
                                                            <label className="radio-button" htmlFor="onlineId">
                                                                <div className="imgDiv">

                                                                    <img loading="lazy" src={item?.image} />
                                                                </div>
                                                                {item?.title}
                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                            })} */}
                                                        <div className="columnButtons">
                                                            <div className='radioButtonCheck'>
                                                                <input type="radio" id="onlineId" name="type" value="6" onChange={getInput} />
                                                                <label className="radio-button" htmlFor="onlineId" >
                                                                    <div className="imgDiv">
                                                                        <img loading="lazy" src={online} alt="reload page" />
                                                                    </div>
                                                                    Online
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="columnButtons">
                                                            <div className='radioButtonCheck'>
                                                                <input type="radio" id="physicalId" name="type" value="1" onChange={getInput} />
                                                                <label className="radio-button" htmlFor="physicalId" >
                                                                    <div className="imgDiv">
                                                                        <img loading="lazy" src={physical} alt="reload page" />
                                                                    </div>
                                                                    Physical Visit
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section>
                                        <div className="pagging">
                                            <div className="container">
                                                <div className="wrapper">
                                                    {/* <div className="progressBar">
                                            <label htmlFor="pageProgress">2 of 7 answered</label>
                                            <progress min="0" max="70" value="20" id='pageProgress' />
                                        </div> */}
                                                    <div className="buttons">
                                                        <div className='buttonRowDiv'>
                                                            <button href="#" className='backButton' onClick={handleStepBack} ><i className="bi bi-arrow-left"></i></button>
                                                            <button href="#" className='nextButton' onClick={handleStepNext} disabled={!doctorBooking.type}><i className="bi bi-arrow-right"></i></button>
                                                        </div>
                                                        <div className="progressBar">
                                                            {/* <label htmlFor="pageProgress">2 of 7 answered</label> */}
                                                            <progress min="0" max="70" value="20" id='pageProgress' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </section>
                                </div>
                            )}
                            {/* Physical Doctor Type  */}
                            {currentStep === 3 && (
                                <div className="switchDiv">
                                    <section>
                                        <div className="container">

                                            <div className="mainBody">
                                                <div className="mainBodyHeading">
                                                    <h1>
                                                        Type of <span> Doctors</span>
                                                    </h1>
                                                </div>
                                                <div className="mainBodyInner">
                                                    <div className="rowButton wrapper ">
                                                        {doctorType?.map((item, key) => {
                                                            return (
                                                                <div className="columnButtons" key={key}>
                                                                    <div className='radioButtonCheck'>
                                                                        <input type="radio" id={item?.id} name="consultation_type" value={item?.id} onChange={getInput} />
                                                                        <label className="radio-button" htmlFor={item?.id} >
                                                                            <div className="imgDiv">
                                                                                <img loading="lazy" src={`${imageUrl}/${item?.image}`} alt="reload page" />
                                                                            </div>
                                                                            {item?.title}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                        {/* <div className="columnButtons">
                                                <div className='radioButton'>
                                                    <input type="radio" id="physioId" name="doctorType" value="2" onChange={getInput} />
                                                    <label className="radio-button" htmlFor="physioId">
                                                        <div className="imgDiv">
                                                            <img loading="lazy" src={physio} />
                                                        </div>
                                                        Physiotherapist
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="columnButtons">
                                                <div className='radioButton'>
                                                    <input type="radio" id="nurseId" name="doctorType" value="3" onChange={getInput} />
                                                    <label className="radio-button" htmlFor="nurseId">
                                                        <div className="imgDiv">
                                                            <img loading="lazy" src={nurse} />
                                                        </div>
                                                        Get A Nurse
                                                    </label>
                                                </div>
                                            </div> */}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section>
                                        <div className="pagging">
                                            <div className="container">
                                                <div className="wrapper">
                                                    {/* <div className="progressBar">
                                            <label htmlFor="pageProgress">2 of 7 answered</label>
                                            <progress min="0" max="70" value="20" id='pageProgress' />
                                        </div> */}
                                                    <div className="buttons">
                                                        <div className='buttonRowDiv'>
                                                            <button href="#" className='backButton' onClick={handleStepBack} ><i className="bi bi-arrow-left"></i></button>
                                                            <button href="#" className='nextButton' onClick={handleStepNext} disabled={!doctorBooking.consultation_type}><i className="bi bi-arrow-right"></i></button>
                                                        </div>
                                                        <div className="progressBar">
                                                            {/* <label htmlFor="pageProgress">2 of 7 answered</label> */}
                                                            <progress min="0" max="70" value="30" id='pageProgress' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </section>
                                </div>
                            )}
                            {/* Doctor Time for Physical Appointment  */}
                            {currentStep === 4 && (
                                <div className="switchDiv">
                                    <section>
                                        <div className="container">

                                            <div className="mainBody">
                                                <div className="mainBodyHeading">
                                                    <h1>
                                                        Select <span>Date & Time </span>
                                                    </h1>
                                                </div>
                                                <div className="mainBodyInner">
                                                    <div className="rowButton wrapper ">

                                                        <div className="columnButtons">
                                                            <div className='selectDateTimePicker'>
                                                                <DatePicker
                                                                    selected={physicalDocDate}
                                                                    onChange={(date) => setPhysicalDocDate(date)}
                                                                    minDate={tomorrow}
                                                                    inline
                                                                />

                                                                <div className='TimePickerDiv'>
                                                                    <div className='TimePickerDivInner'>
                                                                        <TimePicker onChange={setOnSiteTime} value={onSiteTime} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section>
                                        <div className="pagging">
                                            <div className="container">
                                                <div className="wrapper">
                                                    <div className="buttons">
                                                        <div className='buttonRowDiv'>
                                                            <button href="#" className='backButton' onClick={handleStepBack} ><i className="bi bi-arrow-left"></i></button>
                                                            <button href="#" className='nextButton' onClick={handleStepNext} disabled={!onSiteTime}><i className="bi bi-arrow-right"></i></button>
                                                        </div>
                                                        <div className="progressBar">
                                                            <progress min="0" max="70" value="50" id='pageProgress' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </section>
                                </div>
                            )}
                            {/* Online Doctor Specialist  */}
                            {currentStep === 5 && (
                                <div className="switchDiv">
                                    <section>
                                        <div className="container">

                                            <div className="mainBody">
                                                <div className="mainBodyHeading">
                                                    <h1>
                                                        Specialist <span>Doctors </span>
                                                    </h1>
                                                </div>
                                                <div className="mainBodyInner">
                                                    <div className="rowButton wrapper ">
                                                        {
                                                            specialities?.map((item, keyId) => {
                                                                return (
                                                                    <div key={keyId} className="columnButtons">
                                                                        <div className='radioButtonCheck'>
                                                                            <input type="radio" id={item?.id} name="specialist_category" value={item?.id} onChange={getInput} />
                                                                            <label className="radio-button" htmlFor={item?.id}>
                                                                                <div className="imgDiv">
                                                                                    <img loading="lazy" src={`${imageUrl}/${item?.image}`} alt="reload page" />
                                                                                </div>
                                                                                {item.title}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section>
                                        <div className="pagging">
                                            <div className="container">
                                                <div className="wrapper">
                                                    {/* <div className="progressBar">
                                            <label htmlFor="pageProgress">2 of 7 answered</label>
                                            <progress min="0" max="70" value="20" id='pageProgress' />
                                        </div> */}
                                                    <div className="buttons">
                                                        <div className='buttonRowDiv'>
                                                            <button href="#" className='backButton' onClick={handleStepBack} ><i className="bi bi-arrow-left"></i></button>
                                                            <button href="#" className='nextButton' onClick={handleStepNext} disabled={!doctorBooking.specialist_category}><i className="bi bi-arrow-right"></i></button>
                                                        </div>
                                                        <div className="progressBar">
                                                            {/* <label htmlFor="pageProgress">2 of 7 answered</label> */}
                                                            <progress min="0" max="70" value="30" id='pageProgress' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </section>
                                </div>
                            )}
                            {/* All Doctors For specialist  */}
                            {currentStep === 6 && (
                                <div className="switchDiv" >
                                    <section>
                                        <div className="container">

                                            <div className="mainBody">
                                                <div className="mainBodyHeading">
                                                    <h1>
                                                        {/* Specialist */}
                                                        <span>Doctors </span>
                                                    </h1>
                                                </div>
                                                <div className="mainBodyInner">
                                                    <div className="rowButton wrapper ">

                                                        {
                                                            onlineDoctorState?.map((item, keyId) => {
                                                                return (

                                                                    < div className="columnButtons" key={keyId}>
                                                                        <div className='radioButtonCheck selectDocDiv'>
                                                                            <input type="radio" id={`doc1${keyId}`} name="bookedDoctorId" value={item?.id} onChange={(e) => getInput(e, item?.start_time, item?.end_time, item?.specialist_category)} />
                                                                            <label className="radio-button" htmlFor={`doc1${keyId}`} >
                                                                                <div className="imgDiv">
                                                                                    <img loading="lazy" className="selectDoc" src={`${imageUrl}/${item?.image}`} alt="reload page" />
                                                                                    <img loading="lazy" className="verify" src={verified} alt="reload page" />
                                                                                </div>
                                                                                <div className='info'>
                                                                                    <p className='docName'>{item?.fullname}</p>
                                                                                    {/* <p className='docPara'>{item?.specialist_category}</p> */}
                                                                                    <p className='docPara'>{item?.qualification}</p>
                                                                                    {/* <p className='docPara'>Health Advice, Family Practice</p> */}
                                                                                    <p className='docPara'>Experience: <span>{item?.experience}</span> </p>
                                                                                    {/* <p className='docPara'>Reviews: <span>6+</span> </p> */}
                                                                                </div>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }




                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section>
                                        <div className="pagging">
                                            <div className="container">
                                                <div className="wrapper">
                                                    {/* <div className="progressBar">
                                            <label htmlFor="pageProgress">2 of 7 answered</label>
                                            <progress min="0" max="70" value="20" id='pageProgress' />
                                        </div> */}
                                                    <div className="buttons">
                                                        <div className='buttonRowDiv'>
                                                            <button href="#" className='backButton' onClick={handleStepBack} ><i className="bi bi-arrow-left"></i></button>
                                                            <button href="#" className='nextButton' onClick={handleStepNext} disabled={!doctorBooking.bookedDoctorId}><i className="bi bi-arrow-right"></i></button>
                                                        </div>
                                                        <div className="progressBar">
                                                            {/* <label htmlFor="pageProgress">2 of 7 answered</label> */}
                                                            <progress min="0" max="70" value="40" id='pageProgress' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </section>
                                </div>
                            )}
                            {/* Doctor Time for Online Appointment  */}
                            {currentStep === 7 && (
                                <div className="switchDiv" >
                                    <section>
                                        <div className="container">
                                            <div className="mainBody">
                                                <div className="mainBodyHeading">
                                                    <h1>
                                                        Select <span>Date & Time </span>
                                                    </h1>
                                                </div>
                                                <div className="mainBodyInner">
                                                    <div className="rowButton wrapper ">

                                                        <div className="columnButtons columnForDateTimeChooser">
                                                            <div className='selectDateTimePicker'>
                                                                <DatePicker
                                                                    selected={bookDate}
                                                                    minDate={tomorrow}
                                                                    onChange={(date) => setBookDate(date)}
                                                                    inline
                                                                    filterDate={(date) => !isDisabledDay(date, disabledDays)}
                                                                />

                                                                <div className='TimePickerDiv'>
                                                                    <select name="onlineDoctorTime" id="" className='doctorTime' onChange={(e) => { setSelectedTime(e.target.value) }}>
                                                                        <option value="" selected disabled>select time </option>
                                                                        {/* {console.log(timeSlots, 'timeslots')}
                                                                        {console.log(appointedTime, 'appointedTime')} */}
                                                                        {timeSlots.slice(0, -1).map((timeSlot, keyId) => {
                                                                            const nextTimeSlot = timeSlots[keyId + 1];
                                                                            const isAppointed = appointedTime.some(
                                                                                (appTime) => appTime.booked_slots_time === timeSlot
                                                                            );

                                                                            if (isAppointed) {
                                                                                return null;
                                                                            }
                                                                            return (

                                                                                <option key={keyId} value={timeSlot}>
                                                                                    {timeSlot} - {nextTimeSlot}
                                                                                </option>
                                                                            );
                                                                        })}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section>
                                        <div className="pagging">
                                            <div className="container">
                                                <div className="wrapper">
                                                    <div className="buttons">
                                                        <div className='buttonRowDiv'>
                                                            <button href="#" className='backButton' onClick={handleStepBack} ><i className="bi bi-arrow-left"></i></button>
                                                            <button href="#" className='nextButton' onClick={handleStepNext} disabled={!selectedTime}><i className="bi bi-arrow-right"></i></button>
                                                        </div>
                                                        <div className="progressBar">
                                                            <progress min="0" max="70" value="50" id='pageProgress' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </section>
                                </div>
                            )}
                            {/* Details Confirmation  */}
                            {currentStep === 8 && (
                                <div className="switchDiv" >
                                    <section>
                                        <div className="container">
                                            <div className="mainBody">
                                                <div className="mainBodyHeading">
                                                    <h1>
                                                        Details <span>Confirmation</span>
                                                    </h1>
                                                </div>
                                                <div className="mainBodyInner">
                                                    <div className="bookingConfirmationFormOuter">

                                                        <div className="bookingConfirmationForm">
                                                            <div className="bookingFormFields">
                                                                <label htmlFor=""> Date & Time </label>
                                                                {
                                                                    doctorBooking.type === '6' ?
                                                                        <p>{BookingOnlineDate} - {selectedTime}</p>
                                                                        :
                                                                        <p>{BookingOnsiteDate} - {onSiteTime}</p>
                                                                }
                                                            </div>
                                                            {/* <div className="bookingFormFields">
                                                        <label htmlFor=""> Total Price </label>
                                                        <p>450 Rs</p>
                                                    </div> */}
                                                            <div className="bookingFormFields">
                                                                <label htmlFor=""> Reciept </label>
                                                                <p>{reciepentName}</p>
                                                            </div>
                                                            <div className="bookingFormFields">
                                                                <label htmlFor=""> Payment Method </label>
                                                                <select name="paymentMethod" id="" onChange={getInput} >
                                                                    <option value="Cash">Cash </option>
                                                                    <option value="Online">Online Transfer </option>
                                                                </select>
                                                            </div>
                                                            <div className="bookingFormFields">
                                                                <label htmlFor=""> Promo Code </label>
                                                                <input type="text" name="promo_code" onChange={getInput} placeholder='Enter Promo Code' />
                                                            </div>
                                                            {doctorBooking?.paymentMethod === 'Online' &&
                                                                <div className="bookingFormFields cardNumberDiv">
                                                                    <label htmlFor=""> Card Name </label>
                                                                    <input type="number" placeholder='Enter Card Name...' />
                                                                </div>
                                                            }
                                                            {doctorBooking?.paymentMethod === 'Online' &&
                                                                <div className="bookingFormFields cardNumberDiv">
                                                                    <label htmlFor=""> Card Number </label>
                                                                    <input type="number" placeholder='Enter Card Number...' />
                                                                    <img loading="lazy" className='cardNumberImg' src={visaMaster} alt="reload page" />
                                                                </div>
                                                            }
                                                            {doctorBooking?.paymentMethod === 'Online' &&
                                                                <div className="bookingFormFields">
                                                                    <label htmlFor=""> CVV </label>
                                                                    <input type="number" placeholder='Enter Cvv...' />
                                                                </div>
                                                            }
                                                            {doctorBooking?.paymentMethod === 'Online' &&
                                                                <div className="bookingFormFields">
                                                                    <label htmlFor=""> Expiration </label>
                                                                    <input type="date" />
                                                                </div>
                                                            }


                                                        </div>
                                                        <div className='bookingConfirmButton '>
                                                            <button className="done" type='submit'>
                                                                Done
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* <div className="row wrapper ">
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 " align="center">
                                                <div className='selectDateTime '>
                                                    <label htmlFor="selectDateId" className='selectDateTimeLabel'> Date & Time</label>
                                                    <p>{BookingDate} - {bookedTime}</p>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 " align="center">
                                                <div className='selectDateTime '>
                                                    <label htmlFor="selectTimeId" className='selectDateTimeLabel'>Total Price</label>
                                                    <p>450 Rs</p>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 " align="center">
                                                <div className='selectDateTime '>
                                                    <label htmlFor="selectTimeId" className='selectDateTimeLabel' >Receipt</label>
                                                    <p>John Doe</p>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 " align="center">
                                                <div className='selectDateTime '>
                                                    <label htmlFor="selectTimeId" className='selectDateTimeLabel'>Phone</label>
                                                    <p>+92 313 1372654</p>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 " align="center">
                                                <div className='selectDateTime '>
                                                    <label htmlFor="selectTimeId" className='selectDateTimeLabel'>Payment Method</label>
                                                    <select name="paymentMethod" id="" onChange={getInput} >
                                                        <option value="Cash">Cash </option>
                                                        <option value="Online">Online Transfer </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 " align="center">
                                                <div className='selectDateTime promoOuter'>
                                                    <label htmlFor="selectTimeId" className='selectDateTimeLabel'>Promo Code</label>
                                                    <input autoComplete='off' type="text" id='selectTimeId' className='selectDateTimeInput' placeholder='Enter Promo Code...' name='promoCode' onChange={getInput} />
                                                    <button className='promoSubmitButton'>Submit</button>
                                                </div>
                                            </div>
                                            {doctorBooking?.paymentMethod === 'Online' &&
                                                < div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 " align="center">
                                                    <div className='selectDateTime cardNumberDiv'>
                                                        <label htmlFor="selectTimeId" className='selectDateTimeLabel'>Card Number</label>
                                                        <input type="text" id='selectTimeId' className='selectDateTimeInput' placeholder='Enter Card Number...' name='cardNumber' onChange={getInput} />
                                                        <img loading="lazy" className='cardNumberImg' src={visaMaster} alt="reload page" />
                                                    </div>
                                                </div>
                                            }
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " align="center">
                                                <div className='appointmentButton '>
                                                    <button className="done" type='submit'>
                                                        Done
                                                    </button>

                                                </div>
                                            </div>

                                        </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section>
                                        <div className="pagging">
                                            <div className="container">
                                                <div className="wrapper">
                                                    <div className="buttons">
                                                        <div className='buttonRowDiv'>
                                                            <button href="#" className='backButton' onClick={handleStepBack} ><i className="bi bi-arrow-left"></i></button>
                                                        </div>
                                                        <div className="progressBar">
                                                            <progress min="0" max="70" value="60" id='pageProgress' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </section>
                                </div>
                            )}
                            {/* Confirm Bookings */}
                            {/* <div className="switchDiv" ref={buttonRef8}>
                        <section>
                            <div className="container">

                                <div className="mainBody">
                                    <div className="mainBodyHeading">
                                        <h1>    
                                            Appointment <span>Successful</span>
                                        </h1>
                                    </div>
                                    <div className="mainBodyInner">
                                        <div className="row wrapper ">

                                            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 " align="center">
                                                <div className='selectDateTime '>
                                                    <label htmlFor="selectDateId" className='selectDateTimeLabel'> Date & Time</label>
                                                    <p>{BookingDate} - {bookedTime}</p>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 " align="center">
                                                <div className='selectDateTime '>
                                                    <label htmlFor="selectTimeId" className='selectDateTimeLabel'>Booking ID</label>
                                                    <p>5123</p>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 " align="center">
                                                <div className='selectDateTime '>
                                                    <label htmlFor="selectTimeId" className='selectDateTimeLabel'>Patient</label>
                                                    <p>{doctorBooking.foruser}</p>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 " align="center">
                                                <div className='selectDateTime '>
                                                    <label htmlFor="selectTimeId" className='selectDateTimeLabel'>Status</label>
                                                    <p>Pending</p>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 " align="center">
                                                <div className='selectDateTime '>
                                                    <label htmlFor="selectTimeId" className='selectDateTimeLabel'>Payment Method</label>
                                                    <p>{doctorBooking.paymentMethod}</p>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 " align="center">
                                                <div className='selectDateTime '>
                                                    <label htmlFor="selectTimeId" className='selectDateTimeLabel'>Card Number</label>
                                                    <p>{doctorBooking.cardNumber}</p>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 " align="center">
                                                <div className='selectDateTime '>
                                                    <label htmlFor="selectTimeId" className='selectDateTimeLabel'>Address</label>
                                                    <p>{doctorBooking.address}</p>
                                                </div>
                                            </div>

                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " align="center">
                                                <div className='appointmentButton '>
                                                    <button className="done" type='submit'>
                                                        Done
                                                    </button>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="pagging">
                                <div className="container">
                                    <div className="wrapper">
                                  
                                        <div className="buttons">
                                            <div className='buttonRowDiv'>
                                                <button href="#" className='backButton' onClick={appointmentSuccBack} ><i className="bi bi-arrow-left"></i></button>

                                            </div>
                                            <div className="progressBar">
                                               
                                                <progress min="0" max="70" value="70" id='pageProgress' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div> */}
                            {/* {
                            console.log(currentStep, 'stepp')
                        } */}
                            {currentStep === 9 && (

                                <div className="switchDiv">
                                    <section>
                                        <div className="container">
                                            <div className="mainBody">
                                                <Greeting />
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            )}
                        </>
                    </form>
                }
            </main >

            <LoginPopup myDialogRef1={myDialogRef1} onRegisteredBeneChange={handleRegisteredBeneChange} />
            <AddBeneficiary myDialogRef3={myDialogRef3} sendDataToParent={handleDataBenePopup} />
            <SignupPopup myDialogRef={myDialogRef} />
        </React.Fragment >
    )
}
export default BookDoctor