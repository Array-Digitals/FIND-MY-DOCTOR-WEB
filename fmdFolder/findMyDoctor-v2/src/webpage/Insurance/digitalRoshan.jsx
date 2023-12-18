import React, { useRef, useState } from "react";
import jubilee from "../../assets/images/Insurance/jubilee.png";
import adam from "../../assets/images/Insurance/adam.png";
import efu from "../../assets/images/Insurance/efu.png";
import alfalah from "../../assets/images/Insurance/alfalah.png";
import diamond from "../../assets/images/Insurance/diamond.png";
import marketImg from "../../assets/images/Insurance/marketPlace.png";
import roshanDigitalImg from "../../assets/images/Insurance/roshanDigital.png";
import sehatCardImg from "../../assets/images/Insurance/sehatCard.png";
import cardImg from "../../assets/images/Insurance/card.png";
import bankImg from "../../assets/images/Insurance/bank.png";
import parent from "../../assets/images/BookDoctor/parents.png";
import wife from "../../assets/images/BookDoctor/wife.png";
import children from "../../assets/images/BookDoctor/children.png";

import self from "../../assets/images/BookDoctor/self.png";
import someone from "../../assets/images/BookDoctor/someoneElse.png";

export const DigitalRoshan = () => {
  const buttonRef1 = useRef(null);
  const buttonRef2 = useRef(null);
  const buttonRef3 = useRef(null);
  const buttonRef4 = useRef(null);
  const buttonRef5 = useRef(null);
  const buttonRef6 = useRef(null);
  const buttonRef7 = useRef(null);
  const buttonRef8 = useRef(null);


  const bookingForNext = (e) => {
    e.preventDefault();
    buttonRef3.current.style.display = "block";
    buttonRef2.current.style.display = "none";
  };
  // ref3
  const detailsBack = (e) => {
    e.preventDefault();
    buttonRef3.current.style.display = "none";
    buttonRef2.current.style.display = "block";
  };
  const detailsNext = (e) => {
    e.preventDefault();
    buttonRef3.current.style.display = "none";
    buttonRef4.current.style.display = "block";
  };
  // ref4
  const AppointmentBack = (e) => {
    e.preventDefault();
    buttonRef4.current.style.display = "none";
    buttonRef3.current.style.display = "block";
  };
  const AppointmentNext = (e) => {
    e.preventDefault();
    buttonRef4.current.style.display = "none";
    buttonRef5.current.style.display = "block";
  };
  // ref5
  const planBack = (e) => {
    e.preventDefault();
    buttonRef5.current.style.display = "none";
    buttonRef4.current.style.display = "block";
  };
  const planNext = (e) => {
    e.preventDefault();
    buttonRef5.current.style.display = "none";
    buttonRef6.current.style.display = "block";
  };
  // ref6
  const membersBack = (e) => {
    e.preventDefault();
    buttonRef6.current.style.display = "none";
    buttonRef5.current.style.display = "block";
  };
  const membersNext = (e) => {
    e.preventDefault();
    buttonRef6.current.style.display = "none";
    buttonRef7.current.style.display = "block";
  };
  // ref7
  const paymentBack = (e) => {
    e.preventDefault();
    buttonRef7.current.style.display = "none";
    buttonRef6.current.style.display = "block";
  };
  const paymentNext = (e) => {
    e.preventDefault();
    buttonRef7.current.style.display = "none";
    buttonRef8.current.style.display = "block";
  };
  // ref8
  const insureSucc = (e) => {
    e.preventDefault();
    buttonRef8.current.style.display = "none";
    buttonRef7.current.style.display = "block";
  };

  const [insurance, setInsurance] = useState({
    takafulType: "",
    personName: "",
    cnicNo: "",
    emailAddress: "",
    phoneNo: "",
    city: "Karachi",
    address: "",
    providerType: "",
    planning: "",
    members: "",
    paymentMethod: "",
    cardNumber: "",
  });
  const getInsuranceInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInsurance({ ...insurance, [name]: value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const insuranceVar = { ...insurance, members };
    console.log(insuranceVar);
  };

  const [members, setMembers] = useState([]);
  const handleMembers = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setMembers([...members, value]);
    } else {
      setMembers(members.filter((val) => val !== value));
    }
  };
  return (
    <React.Fragment>

          <div className="switchDiv firstSwitchDiv" ref={buttonRef2}>
            <section>
              <div className="container">
                <div className="mainBody">
                  <div className="mainBodyHeading">
                    <h1>
                      <span>Booking</span> For?
                    </h1>
                  </div>
                  <div className="mainBodyInner">
                    <div className="rowButton wrapper ">
                      <div className="columnButtons">
                        <div className="radioButtonCheck">
                          <input
                            type="radio"
                            id="bookingForSelf"
                            name="takafulType"
                            value="InsuranceMarket"
                            onChange={getInsuranceInput}
                            selected
                          />
                          <label
                            className="radio-button"
                            htmlFor="bookingForSelf"
                          >
                            <div className="imgDiv">
                              <img loading="lazy" src={self} />
                            </div>
                            Self
                          </label>
                        </div>
                      </div>
                      <div className="columnButtons">
                        <div className="radioButtonCheck">
                          <input
                            type="radio"
                            id="bookingForUnknown"
                            name="takafulType"
                            value="roshanDigital"
                            onChange={getInsuranceInput}
                          />
                          <label
                            className="radio-button"
                            htmlFor="bookingForUnknown"
                          >
                            <div className="imgDiv1">
                              <img loading="lazy" src={someone} />
                            </div>
                            For Someone Else
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
                    <div className="buttons">
                      <div className="buttonRowDiv">
                        <button
                          href="#"
                          className="nextButton"
                          onClick={bookingForNext}
                        >
                          <i className="bi bi-arrow-right"></i>
                        </button>
                      </div>
                      <div className="progressBar">
                        <progress
                          min="0"
                          max="70"
                          value="10"
                          id="pageProgress"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="switchDiv" ref={buttonRef3}>
            <section>
              <div className="container">
                <div className="mainBody">
                  <div className="mainBodyHeading">
                    <h1>
                      Enter <span>Details</span>
                    </h1>
                  </div>
                  <div className="mainBodyInner">
                    <div className="row wrapper ">
                      <div
                        className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 "
                        align="center"
                      >
                        <div className="selectDateTime ">
                          <label
                            htmlFor="selectDateId"
                            className="selectDateTimeLabel"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            id="selectTimeId"
                            className="selectDateTimeInput"
                            placeholder="Enter Name..."
                            name="personName"
                            onChange={getInsuranceInput}
                          />
                        </div>
                      </div>
                      <div
                        className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 "
                        align="center"
                      >
                        <div className="selectDateTime ">
                          <label
                            htmlFor="selectTimeId"
                            className="selectDateTimeLabel"
                          >
                            CNIC NO.
                          </label>
                          <input
                            type="text"
                            id="selectTimeId"
                            className="selectDateTimeInput"
                            placeholder="Enter CNIC NO..."
                            name="cnicNo"
                            onChange={getInsuranceInput}
                          />
                        </div>
                      </div>
                      <div
                        className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 "
                        align="center"
                      >
                        <div className="selectDateTime ">
                          <label
                            htmlFor="selectTimeId"
                            className="selectDateTimeLabel"
                          >
                            Email Address
                          </label>
                          <input
                            type="text"
                            id="selectTimeId"
                            className="selectDateTimeInput"
                            placeholder="Enter Email Address..."
                            onChange={getInsuranceInput}
                            name="emailAddress"
                          />
                        </div>
                      </div>
                      <div
                        className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 "
                        align="center"
                      >
                        <div className="selectDateTime ">
                          <label
                            htmlFor="selectTimeId"
                            className="selectDateTimeLabel"
                          >
                            Phone Number
                          </label>
                          <input
                            type="text"
                            id="selectTimeId"
                            className="selectDateTimeInput"
                            placeholder="Enter Phone Number..."
                            onChange={getInsuranceInput}
                            name="phoneNo"
                          />
                        </div>
                      </div>
                      <div
                        className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 "
                        align="center"
                      >
                        <div className="selectDateTime ">
                          <label
                            htmlFor="selectTimeId"
                            className="selectDateTimeLabel"
                          >
                            City
                          </label>
                          <select
                            name="city"
                            id=""
                            onChange={getInsuranceInput}
                          >
                            <option value="karachi">Karachi</option>
                            <option value="hyderabad">Hyderabad</option>
                            <option value="multan">Multan</option>
                            <option value="islamabad">Islamabad</option>
                          </select>
                        </div>
                      </div>
                      <div
                        className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 "
                        align="center"
                      >
                        <div className="selectDateTime ">
                          <label
                            htmlFor="selectTimeId"
                            className="selectDateTimeLabel"
                          >
                            Address
                          </label>
                          <input
                            type="text"
                            id="selectTimeId"
                            className="selectDateTimeInput"
                            placeholder="Enter Email Address..."
                            onChange={getInsuranceInput}
                            name="address"
                          />
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
                                            <label htmlFor="pageProgress">3 of 8 answered</label>
                                            <progress min="0" max="70" value="10" id='pageProgress' />
                                        </div> */}
                    <div className="buttons">
                      <div className="buttonRowDiv">
                        <button
                          href="#"
                          className="backButton"
                          onClick={detailsBack}
                        >
                          <i className="bi bi-arrow-left"></i>
                        </button>
                        <button
                          href="#"
                          className="nextButton"
                          onClick={detailsNext}
                        >
                          <i className="bi bi-arrow-right"></i>
                        </button>
                      </div>
                      <div className="progressBar">
                        <progress
                          min="0"
                          max="70"
                          value="10"
                          id="pageProgress"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="switchDiv" ref={buttonRef4}>
            <section>
              <div className="container">
                <div className="mainBody">
                  <div className="mainBodyHeading">
                    <h1>
                      Select<span> Provider</span>
                    </h1>
                  </div>
                  <div className="mainBodyInner">
                    <div className="rowButton wrapper ">
                      <div className="columnButtons">
                        <div className="radioButtonCheck">
                          <input
                            type="radio"
                            id="jubileeId"
                            name="providerType"
                            onChange={getInsuranceInput}
                            value="jubilee"
                            selected
                          />
                          <label className="radio-button" htmlFor="jubileeId">
                            <div className="imgDiv">
                              <img loading="lazy" src={jubilee} className="providerClass" />
                            </div>
                            Jubilee Life <br /> Insurance
                          </label>
                        </div>
                      </div>
                      <div className="columnButtons">
                        <div className="radioButtonCheck">
                          <input
                            type="radio"
                            id="efuId"
                            name="providerType"
                            onChange={getInsuranceInput}
                            value="efuLife"
                          />
                          <label className="radio-button" htmlFor="efuId">
                            <div className="imgDiv">
                              <img loading="lazy" src={adam} className="providerClass" />
                            </div>
                            EFU Life
                            <br />
                            Insurance
                          </label>
                        </div>
                      </div>
                      <div className="columnButtons">
                        <div className="radioButtonCheck">
                          <input
                            type="radio"
                            id="adamId"
                            name="providerType"
                            onChange={getInsuranceInput}
                            value="adamJee"
                          />
                          <label className="radio-button" htmlFor="adamId">
                            <div className="imgDiv">
                              <img loading="lazy" src={efu} className="providerClass" />
                            </div>
                            Adamjee
                            <br /> Insurance
                          </label>
                        </div>
                      </div>
                      <div className="columnButtons">
                        <div className="radioButtonCheck ">
                          <input
                            type="radio"
                            id="alfalahId"
                            name="providerType"
                            onChange={getInsuranceInput}
                            value="alfalah"
                          />
                          <label className="radio-button " htmlFor="alfalahId">
                            <div className="imgDiv">
                              <img loading="lazy" src={alfalah} className="providerClass" />
                            </div>
                            Alfalah
                            <br /> Insurance
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
                                            <label htmlFor="pageProgress">4 of 8 answered</label>
                                            <progress min="0" max="70" value="30" id='pageProgress' />
                                        </div> */}
                    <div className="buttons">
                      <div className="buttonRowDiv">
                        <button
                          href="#"
                          className="backButton"
                          onClick={AppointmentBack}
                        >
                          <i className="bi bi-arrow-left"></i>
                        </button>
                        <button
                          href="#"
                          className="nextButton"
                          onClick={AppointmentNext}
                        >
                          <i className="bi bi-arrow-right"></i>
                        </button>
                      </div>
                      <div className="progressBar">
                        <progress
                          min="0"
                          max="70"
                          value="30"
                          id="pageProgress"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="switchDiv" ref={buttonRef5}>
            <section>
              <div className="container">
                <div className="mainBody">
                  <div className="mainBodyHeading">
                    <h1>
                      Select <span>Plan </span>
                    </h1>
                  </div>
                  <div className="mainBodyInner">
                    <div className="rowButton wrapper ">
                      <div className="columnButtons">
                        <div className="radioButton">
                          <input
                            type="radio"
                            id="plan1"
                            name="planning"
                            value="planA"
                            onChange={getInsuranceInput}
                          />
                          <label
                            className="radio-button radioplan"
                            htmlFor="plan1"
                          >
                            <div className="imgDiv">
                              <div className="imgPlan">
                                <img loading="lazy" src={diamond} />
                              </div>

                              <div className="plan">
                                <p>
                                  Plan <span>"A"</span>
                                </p>
                                <small>Subscription</small>
                              </div>
                              <div className="duration">
                                <p>100k </p>
                                <small>/1 months</small>
                              </div>
                            </div>
                            <hr />
                            <div className="info">
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Hospitalization <span>PKR 100,000</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Daily Room & Board Limit -
                                  <span>General Ward</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Limit enhanced in case of accidental
                                  hospitalization - <span>50%</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Death Due to accident coverage -
                                  <span>PKR 100,000</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Pre & Post Hospitalization Expenses -
                                  <span>Covered upto 30 days</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Accidental Death - <span>
                                    PKR 100,000
                                  </span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Accidental Medical Reimbursement -
                                  <span>PKR 20,000</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Discounted Lab Test at home upto -
                                  <span>10%</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Doctors at Home Visits - <span>4</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Net Contribution per covered person and one
                                  beneficiary - <span>PKR 6,999</span>
                                </p>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="columnButtons">
                        <div className="radioButton radioButton1">
                          <input
                            type="radio"
                            id="plan2"
                            name="planning"
                            value="planB"
                            onChange={getInsuranceInput}
                          />
                          <label
                            className="radio-button radioplan"
                            htmlFor="plan2"
                          >
                            <div className="imgDiv">
                              <div className="imgPlan">
                                <img loading="lazy" src={diamond} />
                              </div>

                              <div className="plan">
                                <p>
                                  Plan <span>"B"</span>
                                </p>
                                <small>Subscription</small>
                              </div>
                              <div className="duration">
                                <p>100k </p>
                                <small>/1 months</small>
                              </div>
                            </div>
                            <hr />
                            <div className="info">
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Hospitalization <span>PKR 100,000</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Daily Room & Board Limit -
                                  <span>General Ward</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Limit enhanced in case of accidental
                                  hospitalization - <span>50%</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Death Due to accident coverage -
                                  <span>PKR 100,000</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Pre & Post Hospitalization Expenses -
                                  <span>Covered upto 30 days</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Accidental Death - <span>
                                    PKR 100,000
                                  </span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Accidental Medical Reimbursement -
                                  <span>PKR 20,000</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Discounted Lab Test at home upto -
                                  <span>10%</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Doctors at Home Visits - <span>4</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Net Contribution per covered person and one
                                  beneficiary - <span>PKR 6,999</span>
                                </p>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="columnButtons">
                        <div className="radioButton radioButton1">
                          <input
                            type="radio"
                            id="plan3"
                            name="planning"
                            value="planC"
                            onChange={getInsuranceInput}
                          />
                          <label
                            className="radio-button radioplan"
                            htmlFor="plan3"
                          >
                            <div className="imgDiv">
                              <div className="imgPlan">
                                <img loading="lazy" src={diamond} />
                              </div>

                              <div className="plan">
                                <p>
                                  Plan <span>"C"</span>
                                </p>
                                <small>Subscription</small>
                              </div>
                              <div className="duration">
                                <p>100k </p>
                                <small>/1 months</small>
                              </div>
                            </div>
                            <hr />
                            <div className="info">
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Hospitalization <span>PKR 100,000</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Daily Room & Board Limit -
                                  <span>General Ward</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Limit enhanced in case of accidental
                                  hospitalization - <span>50%</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Death Due to accident coverage -
                                  <span>PKR 100,000</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Pre & Post Hospitalization Expenses -
                                  <span>Covered upto 30 days</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Accidental Death - <span>
                                    PKR 100,000
                                  </span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Accidental Medical Reimbursement -
                                  <span>PKR 20,000</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Discounted Lab Test at home upto -
                                  <span>10%</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Doctors at Home Visits - <span>4</span>
                                </p>
                              </div>
                              <div className="planDescription">
                                <i className="bi bi-check2"></i>
                                <p className="docPara">
                                  
                                  Net Contribution per covered person and one
                                  beneficiary - <span>PKR 6,999</span>
                                </p>
                              </div>
                            </div>
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
                    <div className="buttons">
                      <div className="buttonRowDiv">
                        <button
                          href="#"
                          className="backButton"
                          onClick={planBack}
                        >
                          <i className="bi bi-arrow-left"></i>
                        </button>
                        <button
                          href="#"
                          className="nextButton"
                          onClick={planNext}
                        >
                          <i className="bi bi-arrow-right"></i>
                        </button>
                      </div>
                      <div className="progressBar">
                        <progress
                          min="0"
                          max="70"
                          value="40"
                          id="pageProgress"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="switchDiv" ref={buttonRef6}>
            <section>
              <div className="container">
                <div className="mainBody">
                  <div className="mainBodyHeading">
                    <h1>
                      Add <span>Members</span>
                    </h1>
                  </div>
                  <div className="mainBodyInner">
                    <div className="rowButton wrapper ">
                      <div className="columnButtons">
                        <div className="checkBoxButton">
                          <input
                            type="checkbox"
                            className="checkBoxButtonClass"
                            id="member1"
                            name="members"
                            value="parents"
                            onChange={handleMembers}
                          />
                          <label className="radio-button" htmlFor="member1">
                            <div className="imgDiv">
                              <img loading="lazy" src={parent} />
                            </div>
                            Parents
                            <i className="bi bi-check2"></i>
                          </label>
                        </div>
                      </div>
                      <div className="columnButtons">
                        <div className="checkBoxButton">
                          <input
                            type="checkbox"
                            className="checkBoxButtonClass"
                            id="member2"
                            name="members"
                            value="wife"
                            onChange={handleMembers}
                          />
                          <label className="radio-button" htmlFor="member2">
                            <div className="imgDiv">
                              <img loading="lazy" src={wife} />
                            </div>
                            Wife
                            <i className="bi bi-check2"></i>
                          </label>
                        </div>
                      </div>
                      <div className="columnButtons">
                        <div className="checkBoxButton">
                          <input
                            type="checkbox"
                            className="checkBoxButtonClass"
                            id="member3"
                            name="members"
                            value="son"
                            onChange={handleMembers}
                          />
                          <label className="radio-button" htmlFor="member3">
                            <div className="imgDiv">
                              <img loading="lazy" src={children} />
                            </div>
                            Children
                            <i className="bi bi-check2"></i>
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
                                            <label htmlFor="pageProgress">6 of 8 answered</label>
                                            <progress min="0" max="70" value="50" id='pageProgress' />
                                        </div> */}
                    <div className="buttons">
                      <div className="buttonRowDiv">
                        <button
                          href="#"
                          className="backButton"
                          onClick={membersBack}
                        >
                          <i className="bi bi-arrow-left"></i>
                        </button>
                        <button
                          href="#"
                          className="nextButton"
                          onClick={membersNext}
                        >
                          <i className="bi bi-arrow-right"></i>
                        </button>
                      </div>
                      <div className="progressBar">
                        <progress
                          min="0"
                          max="70"
                          value="50"
                          id="pageProgress"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="switchDiv" ref={buttonRef7}>
            <section>
              <div className="container">
                <div className="mainBody">
                  <div className="mainBodyHeading">
                    <h1>
                      Payment <span>Methods</span>
                    </h1>
                  </div>
                  <div className="mainBodyInner">
                    <div className="rowButton wrapper ">
                      <div className="columnButtons">
                        <div className="radioButtonCheck">
                          <input
                            type="radio"
                            id="cardId"
                            name="paymentMethod"
                            value="card"
                            onChange={getInsuranceInput}
                          />
                          <label className="radio-button" htmlFor="cardId">
                            <div className="imgDiv">
                              <img loading="lazy" src={cardImg} />
                            </div>
                            Card
                          </label>
                        </div>
                      </div>
                      <div className="columnButtons">
                        <div className="radioButtonCheck">
                          <input
                            type="radio"
                            id="bankId"
                            name="paymentMethod"
                            value="bank"
                            onChange={getInsuranceInput}
                          />
                          <label className="radio-button" htmlFor="bankId">
                            <div className="imgDiv">
                              <img loading="lazy" src={bankImg} />
                            </div>
                            Bank
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
                                            <label htmlFor="pageProgress">7 of 8 answered</label>
                                            <progress min="0" max="70" value="60" id='pageProgress' />
                                        </div> */}
                    <div className="buttons">
                      <div className="buttonRowDiv">
                        <button
                          href="#"
                          className="backButton"
                          onClick={paymentBack}
                        >
                          <i className="bi bi-arrow-left"></i>
                        </button>
                        <button
                          href="#"
                          className="nextButton"
                          onClick={paymentNext}
                        >
                          <i className="bi bi-arrow-right"></i>
                        </button>
                      </div>
                      <div className="progressBar">
                        <progress
                          min="0"
                          max="70"
                          value="60"
                          id="pageProgress"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="switchDiv" ref={buttonRef8}>
            <section>
              <div className="container">
                <div className="mainBody">
                  <div className="mainBodyHeading">
                    <h1>
                      <span>Success</span>
                    </h1>
                  </div>
                  <div className="mainBodyInner">
                    <div className="row wrapper ">
                      <div
                        className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 "
                        align="center"
                      >
                        <div className="selectDateTime ">
                          <label
                            htmlFor="selectTimeId"
                            className="selectDateTimeLabel"
                          >
                            Type of Takaful
                          </label>
                          <p>{insurance.takafulType}</p>
                        </div>
                      </div>
                      <div
                        className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 "
                        align="center"
                      >
                        <div className="selectDateTime ">
                          <label
                            htmlFor="selectTimeId"
                            className="selectDateTimeLabel"
                          >
                            Name
                          </label>
                          <p>{insurance.personName}</p>
                        </div>
                      </div>
                      <div
                        className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 "
                        align="center"
                      >
                        <div className="selectDateTime ">
                          <label
                            htmlFor="selectTimeId"
                            className="selectDateTimeLabel"
                          >
                            CNIC
                          </label>
                          <p>{insurance.cnicNo}</p>
                        </div>
                      </div>
                      <div
                        className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 "
                        align="center"
                      >
                        <div className="selectDateTime ">
                          <label
                            htmlFor="selectTimeId"
                            className="selectDateTimeLabel"
                          >
                            Email Address
                          </label>
                          <p>{insurance.emailAddress} </p>
                        </div>
                      </div>
                      <div
                        className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 "
                        align="center"
                      >
                        <div className="selectDateTime ">
                          <label
                            htmlFor="selectTimeId"
                            className="selectDateTimeLabel"
                          >
                            Phone Number
                          </label>
                          <p>{insurance.phoneNo} </p>
                        </div>
                      </div>
                      <div
                        className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 "
                        align="center"
                      >
                        <div className="selectDateTime ">
                          <label
                            htmlFor="selectTimeId"
                            className="selectDateTimeLabel"
                          >
                            Card Number
                          </label>
                          <input
                            type="text"
                            id="selectTimeId"
                            className="selectDateTimeInput"
                            placeholder="Enter Card Number..."
                            name="cardNumber"
                            onChange={getInsuranceInput}
                          />
                        </div>
                      </div>
                      <div
                        className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 "
                        align="center"
                      >
                        <div className="selectDateTime ">
                          <label
                            htmlFor="selectTimeId"
                            className="selectDateTimeLabel"
                          >
                            City
                          </label>
                          <p>{insurance.city} </p>
                        </div>
                      </div>
                      <div
                        className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 "
                        align="center"
                      >
                        <div className="selectDateTime ">
                          <label
                            htmlFor="selectTimeId"
                            className="selectDateTimeLabel"
                          >
                            Address
                          </label>
                          <p>{insurance.address} </p>
                        </div>
                      </div>

                      <div
                        className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 "
                        align="center"
                      >
                        <div className="appointmentButton ">
                          <button className="done" type="submit">
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
                    {/* <div className="progressBar">
                                            <label htmlFor="pageProgress">8 of 8 answered</label>
                                            <progress min="0" max="70" value="70" id='pageProgress' />
                                        </div> */}
                    <div className="buttons">
                      <div className="buttonRowDiv">
                        <button
                          href="#"
                          className="backButton"
                          onClick={insureSucc}
                        >
                          <i className="bi bi-arrow-left"></i>
                        </button>
                      </div>
                      <div className="progressBar">
                        <progress
                          min="0"
                          max="70"
                          value="70"
                          id="pageProgress"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
     
    </React.Fragment>
  );
};
