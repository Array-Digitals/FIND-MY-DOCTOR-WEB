import { useEffect } from 'react';
import { Loader } from '../Component/loader.jsx';
import { LoginPopup } from '../Component/loginPopup'
import {
    React,
    Greeting, SignupPopup, self, Link, ROUTING,
    AddBeneficiary, Slider, TimePicker, family, confirmTestImg, DatePicker, visaMaster,
    MobBanner1, MobBanner2, MobBanner3,
    banner1, banner2, banner3,
    // processBooked,
    imageUrl,
} from './labImports.js';

import LabService from './labService.js';
import { ToastContainer, toast } from 'react-toastify';

 const BookLab = () => {

    const { settings, settings1, formSubmit,
        getTestFor, beneOption, allBeneficiary, handleStepNext,
        handleStepBack, isBeneficiary, getCityInput, cities,
        selectedCity, currentStep, cityLabs, setBookLabPost,
        visibleLabTest, baseUrl, isVisible, handleSelect, selectRefLabTest,
        getLabTest, testType, handleRemove, onChangeBeneficiary, startDate,
        tomorrow, setStartDate, setLabTime, reciepentName, BookingDate, labTime,
        totalAmount, getInputPayment, labBookingPayment, myDialogRef, myDialogRef1,
        myDialogRef3, handleRegisteredBeneChange, handleDataBenePopup, isLoading, bannersDesk, processBooked
    } = LabService();

    useEffect(() => {
        // console.log(processBooked, 'processss');
        if (processBooked) {
            toast.error("Invalid Promo")
        }
    }, [processBooked])

    console.log(cityLabs, 'citysss');
    console.log(getLabTest, 'tests');

    return (
        <React.Fragment>
            <main >
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
                {
                    isLoading ?
                        <Loader />
                        :
                        <form className="bookLab mainServiceContainer" onSubmit={formSubmit}>
                            <section className="bookDoctorBanner">
                                <Slider {...settings1}>
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
                            {/* Who are You booking for? */}
                            {currentStep === 1 && (
                                <section className="switchDiv ">
                                    <div>
                                        <div className="container">

                                            <div className="mainBody">
                                                <div className="mainBodyHeading">
                                                    <h1>
                                                        Who Are You <span>Booking</span> For?
                                                    </h1>
                                                </div>
                                                <div className="mainBodyInner">
                                                    <div className="rowButton wrapper ">
                                                        <div className="columnButtons">
                                                            <div className='radioButtonCheck'>
                                                                <input type="radio" id="option0" name="LabBookedFor" value="self" onChange={getTestFor} />
                                                                <label className="radio-button" htmlFor="option0">
                                                                    <div className="imgDiv">
                                                                        <img loading="lazy" src={self} alt='' />
                                                                    </div>
                                                                    Self
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="columnButtons">
                                                            <div className='radioButtonCheck'>
                                                                <input type="radio" id="option2" name="LabBookedFor" value="family" onChange={getTestFor} />
                                                                <label className="radio-button" htmlFor="option2">
                                                                    <div className="imgDiv">
                                                                        <img loading="lazy" src={family} alt='' />
                                                                    </div>
                                                                    Beneficiary
                                                                </label>
                                                            </div>
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
                                    </div>
                                    <div>
                                        <div className="pagging">
                                            <div className="container">
                                                <div className="wrapper">
                                                    <div className="buttons">
                                                        <div className="buttonRowDiv">
                                                            <button href="#" className='nextButton' onClick={handleStepNext} disabled={!isBeneficiary}><i className="bi bi-arrow-right"></i></button>
                                                        </div>
                                                        <div className="progressBar">
                                                            <progress min="0" max="50" value="10" id='pageProgress' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}
                            {/* select Location  */}
                            {currentStep === 2 && (
                                <section className="switchDiv" >
                                    <div>
                                        <div className="container">

                                            <div className="mainBody">
                                                <div className="mainBodyHeading">
                                                    <h1>
                                                        Select <span>Location</span>
                                                    </h1>
                                                </div>
                                                <div className="mainBodyInner">
                                                    <div className="row wrapper ">

                                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " align="center">
                                                            <div className='outputDataClass'>
                                                                <label htmlFor="selectLocation" className='chooseLocationClass'>Choose Your City</label>
                                                                <select id="selectLocation" name="location" onChange={getCityInput}>
                                                                    <option disabled selected>Select Your City</option>
                                                                    {
                                                                        cities.map((item, keyId) => {
                                                                            return (
                                                                                <option key={keyId} value={item.id}>{item.name}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="pagging">
                                            <div className="container">
                                                <div className="wrapper">

                                                    <div className="buttons">
                                                        <div className="buttonRowDiv">
                                                            <button href="#" className='backButton' onClick={handleStepBack}><i className="bi bi-arrow-left"></i></button>
                                                            <button href="#" className='nextButton' onClick={handleStepNext} disabled={!selectedCity}><i className="bi bi-arrow-right"></i></button>
                                                        </div>
                                                        <div className="progressBar">
                                                            {/* <label htmlFor="pageProgress">1 of 5 answered</label> */}
                                                            <progress min="0" max="50" value="20" id='pageProgress' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </section>
                            )}
                            {/* select lab And tests  */}
                            {currentStep === 3 && (
                                <section className="switchDiv" >

                                    <div>
                                        <div className="container">

                                            <div className="mainBody">
                                                <div className="mainBodyHeading">
                                                    <h1>
                                                        Choose Your <span> Lab</span>
                                                    </h1>
                                                </div>
                                                <div className="mainBodyInner">
                                                    <div className="row wrapper ">

                                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">

                                                            <div className="LabCarousel">
                                                                <div className="LabCarouselInner">
                                                                    <Slider {...settings}>
                                                                        {
                                                                            cityLabs?.map((item, keyId) => {
                                                                                return (
                                                                                    <div className='carouselItem' key={keyId}>
                                                                                        <div className='carouselItemInner'>
                                                                                            <input type="radio" id={item?.lab_id} value={item?.lab_id} name="lab_id" onChange={(e) => { setBookLabPost((prevState) => ({ ...prevState, lab_id: e.target.value, })); }} />
                                                                                            <label className='imgOuter' htmlFor={item?.lab_id} onClick={visibleLabTest}>
                                                                                                <img loading="lazy" src={`${imageUrl}/${item?.logo}`} alt="reload page" />
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </Slider>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {isVisible &&
                                                            <>
                                                                {/* defaultChecked value */}
                                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " align="center">
                                                                    <div className='outputDataClass radioButtonCheck '>
                                                                        <label htmlFor="chooseTest" className='chooseLabClass'>Choose Test</label>
                                                                        <select name="" id="chooseTest" onChange={handleSelect} ref={selectRefLabTest}>
                                                                            <option selected value="">Select Your Test</option>
                                                                            {getLabTest?.map((item, keyId) => {
                                                                                return (
                                                                                    <option key={keyId} value={item?.test_id} data-test_amount={item?.test_amount} data-fullname={item?.test_name}>
                                                                                        {item?.test_name}
                                                                                    </option>
                                                                                );
                                                                            })}
                                                                        </select>

                                                                    </div>
                                                                </div>
                                                                {!testType.length <= 0 &&
                                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " align="center">
                                                                        <div className='outputDataClass'>

                                                                            <label htmlFor="chooseTest" className='chooseLabClass'>Selected Test</label>
                                                                            <ul className="list-group">

                                                                                {

                                                                                    testType.map((items, key) => (
                                                                                        <li key={key} className="list-group-item">
                                                                                            <p > {items?.fullname} <button onClick={() => handleRemove(items)}>X</button></p>
                                                                                        </li>
                                                                                    )
                                                                                    )
                                                                                }


                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="pagging">
                                            <div className="container">
                                                <div className="wrapper">

                                                    <div className="buttons">
                                                        <div className="buttonRowDiv">
                                                            <button href="#" className='backButton' onClick={handleStepBack}><i className="bi bi-arrow-left"></i></button>
                                                            <button href="#" className='nextButton' type="button" data-bs-toggle="modal" data-bs-target={testType.length !== 0 ? '#modal1' : null} disabled={testType.length <= 0}><i className="bi bi-arrow-right"></i></button>
                                                        </div>
                                                        <div className="progressBar">
                                                            <progress min="0" max="50" value="30" id='pageProgress' />
                                                        </div>
                                                        {/* Modal Start */}
                                                        <div className="modal fade" id="modal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                            <div className="modal-dialog modal-dialog-centered">
                                                                <div className="modal-content">
                                                                    <div className="header">
                                                                        <p> <span>Confirm</span> Test </p>
                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                    </div>
                                                                    <div className="modal-body">

                                                                        <img loading="lazy" src={confirmTestImg} alt="reload page" />
                                                                    </div>
                                                                    <div className="ButtonFooter">
                                                                        <button type="button" data-bs-dismiss="modal" onClick={handleStepNext}>Confirm</button>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Modal End */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </section>
                            )}
                            {/* Book Your Slot time and date */}
                            {currentStep === 4 && (
                                <section className="switchDiv">
                                    <div>
                                        <div className="container">

                                            <div className="mainBody">
                                                <div className="mainBodyHeading">
                                                    <h1>
                                                        Book <span>Slot </span>
                                                    </h1>
                                                </div>
                                                <div className="mainBodyInner">
                                                    <div className="row wrapper ">

                                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " align="center">
                                                            <div className='selectDateTimePicker '>

                                                                <DatePicker
                                                                    selected={startDate}
                                                                    minDate={tomorrow} onChange={(date) => setStartDate(date)}
                                                                    inline
                                                                />

                                                                <div className='TimePickerDiv'>
                                                                    <div className='TimePickerDivInner'>
                                                                        <TimePicker onChange={setLabTime} value={labTime} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="pagging">
                                            <div className="container">
                                                <div className="wrapper">

                                                    <div className="buttons">
                                                        <div className="buttonRowDiv">
                                                            <button href="#" className='backButton' onClick={handleStepBack}><i className="bi bi-arrow-left"></i></button>
                                                            <button href="#" className='nextButton' onClick={handleStepNext} ><i className="bi bi-arrow-right"></i></button>
                                                        </div>
                                                        <div className="progressBar">
                                                            <progress min="0" max="50" value="40" id='pageProgress' />
                                                        </div>
                                                    </div>




                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </section>
                            )}
                            {/* Booking Details  */}
                            {currentStep === 5 && (
                                <section className="switchDiv" >
                                    <div>
                                        <div className="container">

                                            <div className="mainBody">
                                                <div className="mainBodyHeading">
                                                    <h1>
                                                        <span>Booking </span>Details
                                                    </h1>
                                                </div>
                                                <div className="mainBodyInner">
                                                    <div className="bookingConfirmationFormOuter">

                                                        <div className="bookingConfirmationForm">
                                                            <div className="bookingFormFields">
                                                                <label htmlFor=""> Recipent Name </label>
                                                                <p>{reciepentName}</p>
                                                            </div>
                                                            <div className="bookingFormFields">
                                                                <label htmlFor=""> Date & Time </label>
                                                                <p>{BookingDate} - {labTime}</p>
                                                            </div>
                                                            <div className="bookingFormFields">
                                                                <label htmlFor=""> Total Price </label>
                                                                <p>Rs. {totalAmount}</p>
                                                            </div>
                                                            <div className="bookingFormFields">
                                                                <label htmlFor=""> Payment Method </label>
                                                                <select name="payment_method" id="" onChange={getInputPayment} >
                                                                    <option value="Cash">Cash </option>
                                                                    <option value="Online">Online Transfer </option>
                                                                </select>
                                                            </div>
                                                            <div className="bookingFormFields">
                                                                <label htmlFor=""> Promo Code </label>
                                                                <input type="text" placeholder='Enter Promo Code' name='promo_code' onChange={getInputPayment} />
                                                            </div>
                                                            {labBookingPayment?.payment_method === 'Online' &&
                                                                <div className="bookingFormFields cardNumberDiv">
                                                                    <label htmlFor=""> Card Name </label>
                                                                    <input type="number" placeholder='Enter Card Name...' />
                                                                </div>
                                                            }
                                                            {labBookingPayment?.payment_method === 'Online' &&
                                                                <div className="bookingFormFields cardNumberDiv">
                                                                    <label htmlFor=""> Card Number </label>
                                                                    <input type="number" placeholder='Enter Card Number...' />
                                                                    <img loading="lazy" className='cardNumberImg' src={visaMaster} alt="reload page" />
                                                                </div>
                                                            }
                                                            {labBookingPayment?.payment_method === 'Online' &&
                                                                <div className="bookingFormFields">
                                                                    <label htmlFor=""> CVV </label>
                                                                    <input type="number" placeholder='Enter Cvv...' />
                                                                </div>
                                                            }
                                                            {labBookingPayment?.payment_method === 'Online' &&
                                                                <div className="bookingFormFields">
                                                                    <label htmlFor=""> Expiration </label>
                                                                    <input type="date" />
                                                                </div>
                                                            }


                                                        </div>
                                                    </div>
                                                    <div className="row wrapper ">

                                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " align="center">
                                                            <hr className='totalCostingHr' />
                                                            <div className="allTestShow">
                                                                <div className="mainBodyHeading">
                                                                    <h1>
                                                                        <span>Test</span> Details
                                                                    </h1>
                                                                </div>


                                                                <div className="table-responsive">
                                                                    <table className="table">
                                                                        <thead>
                                                                            <tr>
                                                                                <th scope="col">No.</th>
                                                                                <th scope="col">Test Name</th>
                                                                                <th scope="col">Price</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {testType.map((item, keyId) => {
                                                                                return (
                                                                                    <tr key={keyId}>

                                                                                        <td>{keyId}</td>
                                                                                        <td> {item?.test_name}</td>
                                                                                        <td>Rs. {item?.test_amount} (Incl.Tax)</td>
                                                                                    </tr>
                                                                                )
                                                                            })}


                                                                        </tbody>

                                                                    </table>
                                                                </div>

                                                            </div>
                                                        </div>


                                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " >
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
                                    </div>
                                    <div>
                                        <div className="pagging">
                                            <div className="container">
                                                <div className="wrapper">

                                                    <div className="buttons">
                                                        <div className="buttonRowDiv">
                                                            <button href="#" className='backButton' onClick={handleStepBack}><i className="bi bi-arrow-left"></i></button>
                                                        </div>
                                                        <div className="progressBar">

                                                            <progress min="0" max="50" value="50" id='pageProgress' />
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </section>
                            )}
                            {/* Greeting Page  */}
                            {currentStep === 6 && (
                                <section className="switchDiv">
                                    <div>
                                        <div className="container">
                                            <div className="mainBody">
                                                <Greeting />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}
                        </form>
                }
            </main >

            <LoginPopup myDialogRef1={myDialogRef1} onRegisteredBeneChange={handleRegisteredBeneChange} />
            <AddBeneficiary myDialogRef3={myDialogRef3} sendDataToParent={handleDataBenePopup} />
            <SignupPopup myDialogRef={myDialogRef} />

        </React.Fragment>
    )
}

export default BookLab