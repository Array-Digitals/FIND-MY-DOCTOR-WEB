import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import family from "../../assets/images/BookDoctor/parents.png";
import wife from "../../assets/images/BookDoctor/wife.png";
import children from "../../assets/images/BookDoctor/children.png";
import { ROUTING } from '../../utils/routes'
import self from "../../assets/images/BookDoctor/self.png";
import someone from "../../assets/images/BookDoctor/family.png";
import InsuranceService from '../../services/insurance'
import { imageUrl } from "../../services/baseUrl";
import visaMaster from '../../assets/images/visaAndMasterCard.png'
import { LoginPopup } from "../Component/loginPopup";
import { AddBeneficiary } from "../Component/addBeneficiary";
import { SignupPopup } from "../Component/RegisterPopup";
import { BannerService, Greeting, TokenService } from "../BookLab/labImports";
import UserData from '../../services/userData'
import { Link } from "react-router-dom";



const Insure = () => {
  const { getBeneficiary, getUserData } = UserData();
  const { getAllProviders, getPackageByProvider, postInsuranceBooking, } = InsuranceService();
  const { getToken, getStorageData, rememberGet } = TokenService();
  const [beneSession, setBeneSession] = useState();
  const [isBeneficiary, setisBeneficiary] = useState("");
  const myDialogRef = useRef(null);
  const [beneOption, setBeneOption] = useState(false);
  const [allBeneficiary, setAllBeneficiary] = useState([]);
  const [selectedBene, setSelectedBene] = useState();
  const [registeredBene, setRegisteredBene] = useState();
  const [currentStep, setCurrentStep] = useState(1);


  useLayoutEffect(() => {
    setStorageItem(getStorageData())
    console.log(getStorageData(), 'jbasjkd');
  }, [])

  const forwardStep = (e) => {
    e.preventDefault();

    if (currentStep === 4) {
      setCurrentStep(currentStep);
    } else if (currentStep === 3) {
      if (getToken(rememberGet())) {
        setStorageItem(getStorageData())
        setCurrentStep(currentStep + 1);
      } else {
        triggerLoginPopup1();
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const backwardStep = (e) => {
    e.preventDefault()
    setCurrentStep(currentStep - 1)
  }


  const [allProviders, setAllProviders] = useState([]);
  const [selectedProvider, setSelectedProviders] = useState('');
  const [packages, setPackages] = useState([]);

  const [insurance, setInsurance] = useState({
    packageOf: "1",
    address: "",
  });


  const getInsuranceInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInsurance({ ...insurance, [name]: value });
  };
  const [storageItem, setStorageItem] = useState([]);

  // console.log(storageItem, 'dkka');





  useEffect(() => {
    getAllProviders().then((res) => {
      const response = res.data.data;
      console.log(response, 'itemmmm');
      // Use Promise.all to wait for all getUserData calls to finish
      Promise.all(response.map(item => getUserData(item.id)))
        .then(metaValueResponses => {
          // Use map to combine the meta_value with the original provider data
          const providersWithImages = response.map((item, index) => ({
            ...item,
            image: metaValueResponses[index]?.data?.data[0]?.meta_value,
          }));

          console.log(providersWithImages, 'providersWithImages');

          // Set the state with the updated array
          setAllProviders(providersWithImages);
        })
        .catch((error) => {
          console.log(error, 'error');
        });
    }).catch((error) => {
      console.log(error, 'error');
    });
  }, []);

  // console.log(packages, 'packageeee');
  useEffect(() => {
    if (selectedProvider) {
      getPackageByProvider(selectedProvider).then((res) => {
        const packagesSorted = res?.data?.data.map(packageItem => ({
          ...packageItem,
          features: JSON.parse(packageItem.features), // Convert features to JSON
        }));
        // console.log(packagesSorted, 'ressre');

        // const filteredData = packagesSorted.filter(packageItem => packageItem.for_parents == insurance.packageOf);
        // console.log(filteredData, 'dgw');
        setPackages(packagesSorted);
      }).catch((error) => {
        console.log(error, 'error');
      });
    }
  }, [selectedProvider])




  const myDialogRef1 = useRef(null);
  const triggerLoginPopup1 = () => {
    if (myDialogRef1.current) {
      myDialogRef1.current.showModal();
    }
  };
  const myDialogRef3 = useRef(null);
  const triggerBenePopup3 = () => {
    if (myDialogRef3.current) {
      myDialogRef3.current.showModal();
    }
  };
  const handleDataBenePopup = (data) => {
    if (data) {
      setisBeneficiary('yes');
    }
  };
  const handleRegisteredBeneChange = (value) => {
    setRegisteredBene(value);
  };
  const getTestFor = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "LabBookedFor" && value === "self") {
      setisBeneficiary("no");
      setBeneOption(false)
    } else {
      console.log("beneficiary selected")
      //is user Logged in?
      if (getToken(rememberGet())) {

        setBeneOption(true);
        if (selectedBene) {
          setisBeneficiary('yes');
        }
        else {
          setisBeneficiary('');
        }
      }
      else {
        if (beneSession) {
          console.log('user not Logged In beneficiary exist');
          setisBeneficiary('yes');
        }
        else {
          console.log('user not Logged In beneficiary not exist');
          triggerBenePopup3();
          setisBeneficiary('');

        }
      }
    }
  };
  const onChangeBeneficiary = e => {
    setSelectedBene(e.target.value)
    setisBeneficiary('yes');
  }
  useEffect(() => {
    setBeneSession(localStorage.getItem("temporaryBeneficiary"))
  }, [beneSession, isBeneficiary])
  useEffect(() => {
    if (getToken(rememberGet())) {
      getBeneficiary().then((res) => {
        setAllBeneficiary(res?.data?.data);
      }).catch((err) => {
        console.log('error', err);
      })
    }
  }, [])

  const [paymentType, setPaymentType] = useState(1)

  const paymentTypeOnChange = (e) => {
    setPaymentType(e.target.value)
  }



  const getCurrentDateFunction = () => {
    // Create a Date object for the current date and time
    var currentDate = new Date();

    // Extract the date components
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1; // Month is 0-based, so add 1
    var day = currentDate.getDate();

    // Extract the time components
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();

    var formattedDate = year + "-" + (month < 10 ? '0' : '') + month + "-" + (day < 10 ? '0' : '') + day;
    var formattedTime = (hours < 10 ? '0' : '') + hours + ":" + (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;

    // Display the formatted date in the result element
    let resultElement = formattedDate + " " + formattedTime

    return resultElement
  }

  // console.log(isBeneficiary, 'issss');
  const formSubmit = (e) => {
    e.preventDefault();

    let insurance_for;
    let beneficiary;
    if (isBeneficiary === 'yes') {
      insurance_for = selectedBene
      beneficiary = 1
    } else {
      insurance_for = storageItem?.id
      beneficiary = 0
    }

    const date_time = getCurrentDateFunction()

    console.log(currentStep, 'jabsd');
    const plan = selectedPlan.plan;
    const amount = selectedPlan.amount;
    const insuranceVar = { ...insurance, plan, amount, beneficiary, payment_method: paymentType, insurance_for, recepient: storageItem?.id, date_time };
    console.log(insuranceVar);
    postInsuranceBooking(insuranceVar).then((res) => {
      setCurrentStep(5)
      console.log(currentStep, 'steppp');
      console.log(res, 'response');
    }).catch((res) => {
      console.log(res, 'error');
    })
  };

  const [selectedPlan, setSelectedPlan] = useState({
    plan: "",
    amount: ""
  });


  return (
    <React.Fragment>
      <main >
        <form className="bookDoctor mainServiceContainer" onSubmit={formSubmit}>

          {
            currentStep === 1 &&
            <div className="switchDiv firstSwitchDiv" >
              <section>
                <div className="container">
                  <div className="mainBody">
                    <div className="mainBodyHeading">
                      <h1>
                        Select<span> Provider</span>
                      </h1>
                    </div>
                    <div className="mainBodyInner">
                      {/* {
                        console.log(allProviders,'providesrss')
                      } */}
                      <div className="rowButton wrapper ">
                        {
                          allProviders.map((item, keyId) => (
                            <div className="columnButtons" key={keyId}>
                              <div className="radioButton">
                                <input
                                  type="radio"
                                  id={`providerItemId${item.id}`}
                                  name="providerType"
                                  onChange={() => setSelectedProviders(item.id)}
                                  value={item.id}
                                />
                                <label className="radio-button" htmlFor={`providerItemId${item.id}`}>
                                  <div className="imgDiv">
                                    <img loading="lazy" src={`${imageUrl}/${item.image}`} className="providerClass" alt="reload page" />
                                  </div>
                                  {item.fullname}
                                </label>
                              </div>
                            </div>
                          ))
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
                      <div className="buttons">
                        <div className="buttonRowDiv">
                          <button
                            className="backButton"
                            onClick={backwardStep}
                          >
                            <i className="bi bi-arrow-left"></i>
                          </button>
                          <button
                            className="nextButton"
                            onClick={forwardStep}
                            disabled={!selectedProvider}
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
          }
          {
            currentStep === 2 &&
            <div className="switchDiv firstSwitchDiv">
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
                              id="bookingForSelf"
                              name="packageOf"
                              value="1"
                              onChange={getInsuranceInput}
                              // selected
                              defaultChecked
                            />
                            <label
                              className="radio-button"
                              htmlFor="bookingForSelf"
                            >
                              {/* <div className="imgDiv">
                                <img loading="lazy" src={self} />
                              </div> */}
                              Parents
                            </label>
                          </div>
                        </div>
                        <div className="columnButtons">
                          <div className="radioButton">
                            <input
                              type="radio"
                              id="bookingForUnknown"
                              name="packageOf"
                              value="0"
                              onChange={getInsuranceInput}
                            />
                            <label
                              className="radio-button"
                              htmlFor="bookingForUnknown"
                            >
                              {/* <div className="imgDiv1">
                                <img loading="lazy" src={someone} />
                              </div> */}
                              Spouse/ Children
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="rowButton wrapper ">
                        {
                          packages.filter(item => item.for_parents === parseInt(insurance.packageOf)).map((item, keyId) => (
                            <div className="columnButtons" key={keyId} >
                              <div className="radioButton">
                                <input
                                  type="radio"
                                  id="plan1"
                                  name="plan"
                                  value={item.id}
                                  onChange={() => setSelectedPlan({ plan: item.id, amount: item.annual_cost })}
                                />
                                <label
                                  className="radio-button radioplan"
                                  htmlFor="plan1"
                                >
                                  <div className="imgDiv">
                                    <div className="imgPlan">
                                      <img loading="lazy" src={diamond} alt="reload page" />
                                    </div>

                                    <div className="plan">
                                      <p>
                                        {/* Plan <span>"A"</span> */}
                                        {item.name}
                                      </p>
                                      <small>Subscription</small>
                                    </div>
                                    <div className="duration">
                                      <p>{item.annual_cost}</p>
                                      <small>/ month</small>
                                    </div>
                                  </div>
                                  <hr />

                                  <div className="info">
                                    {
                                      item.features.map((item, keyId) => (
                                        <div key={keyId} className="planDescription">
                                          <i className="bi bi-check2"></i>
                                          <p className="docPara">
                                            {item.featureKey} <span>{item.featureValue}</span>
                                          </p>
                                        </div>
                                      ))
                                    }
                                  </div>
                                </label>
                              </div>
                            </div>
                          ))
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
                      <div className="buttons">
                        <div className="buttonRowDiv">
                          <button
                            href="#"
                            className="backButton"
                            onClick={backwardStep}
                          >
                            <i className="bi bi-arrow-left"></i>
                          </button>
                          <button
                            href="#"
                            className="nextButton"
                            onClick={forwardStep}
                            disabled={!selectedPlan.plan}
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
          }
          {
            currentStep === 3 &&
            <div className="switchDiv firstSwitchDiv" >
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

                  {/* <div className="mainBody">
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
              </div> */}

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
                            onClick={backwardStep}
                          >
                            <i className="bi bi-arrow-left"></i>
                          </button>
                          <button
                            href="#"
                            className="nextButton"
                            disabled={!isBeneficiary}
                            onClick={forwardStep}
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
          }

          {
            currentStep === 4 &&

            <div className="switchDiv firstSwitchDiv" >
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
                            <label htmlFor="">  Type of Takaful </label>
                            <p>Insurance</p>
                          </div>
                          <div className="bookingFormFields">
                            <label htmlFor=""> Recipent </label>
                            <p>{storageItem?.fullname}</p>
                          </div>
                          <div className="bookingFormFields">
                            <label htmlFor=""> Email </label>
                            <p>{storageItem?.email}</p>
                          </div>
                          <div className="bookingFormFields">
                            <label htmlFor=""> Address </label>
                            <input type="text" required name="address" placeholder="Enter Address" onChange={getInsuranceInput} />
                          </div>
                          <div className="bookingFormFields">
                            <label htmlFor=""> Payment Method </label>
                            <select name="paymentMethod" id="" onChange={(e) => paymentTypeOnChange(e)} >
                              <option value="1">Cash </option>
                              <option value="2">Online Transfer </option>
                            </select>
                          </div>

                          {/* <div className="bookingFormFields">
                            <label htmlFor=""> Promo Code </label>
                            <input type="text" placeholder='Enter Promo Code' />
                          </div> */}

                          {paymentType?.paymentMethod == '2' &&
                            <div className="bookingFormFields cardNumberDiv">
                              <label htmlFor=""> Card Name </label>
                              <input type="number" placeholder='Enter Card Name...' />
                            </div>
                          }
                          {paymentType == '2' &&
                            <div className="bookingFormFields cardNumberDiv">
                              <label htmlFor=""> Card Number </label>
                              <input type="number" placeholder='Enter Card Number...' />
                              <img loading="lazy" className='cardNumberImg' src={visaMaster} alt="reload page" />
                            </div>
                          }
                          {paymentType == '2' &&
                            <div className="bookingFormFields">
                              <label htmlFor=""> CVV </label>
                              <input type="number" placeholder='Enter Cvv...' />
                            </div>
                          }
                          {paymentType == '2' &&
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
                          <button href="#" className='backButton' onClick={backwardStep}  ><i className="bi bi-arrow-left"></i></button>
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

          }

          {
            currentStep === 5 &&


            <div className="switchDiv firstSwitchDiv">
              <section>
                <div className="container">
                  <div className="mainBody">
                    <Greeting />
                  </div>
                </div>
              </section>
            </div>
          }
        </form>
      </main>

      <LoginPopup myDialogRef1={myDialogRef1} onRegisteredBeneChange={handleRegisteredBeneChange} />
      <AddBeneficiary myDialogRef3={myDialogRef3} sendDataToParent={handleDataBenePopup} />
      <SignupPopup myDialogRef={myDialogRef} />
    </React.Fragment>
  );
};
export default Insure
