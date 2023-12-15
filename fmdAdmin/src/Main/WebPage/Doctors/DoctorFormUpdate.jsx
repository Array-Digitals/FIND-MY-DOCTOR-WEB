import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import sunImg from "../../../assets/images/sun1.png";
import profilePic from "../../../assets/images/guy.png";
import moonImg from "../../../assets/images/moon.png";
import GeneratePassword from "../../../services/generatePassword";
import AdminService from "../../../services/adminApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DoctorLogoImg from '../../../assets/images/Doctor.svg'
import { useParams } from "react-router";
import { imageUrl } from "../../../services/baseUrl";

export const DoctorFormUpdate = () => {
  //PUT CONDIOTION ON SUBMIT FUNCTION ON DOCID or docUpdate pass krwado API k parameter main
  const { generatePassword } = GeneratePassword();
  const [phoneError, setPhoneError] = useState(false);
  const [cnicError, setCnicError] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    doctorRegister,
    doctorUpdate,
    getDoctorSingle,
    getSingleCategories,
    getSpecilistCategory,
    getDoctorType,
    getSingleSpecialistCategory,
  } = AdminService();
  let { docId } = useParams();
  // let imageUrl = "http://fmd.arraydigitals.com"
  // const [password, setPassword] = useState("");
  const [image, setdoctorImage] = useState(null);
  const formRef = useRef(null);
  const [isChecked, setIsChecked] = useState(true);
  const [docUpdate, setDocUpdate] = useState({

    id: "",
    fullname: " ",
    email: "",
    phone: "",
    qualification: "",
    experience: "",
    specialist_category: "",
    pdma_id: "",
    cnic: "",
    shift: "",
    fee: "0",
    specility: "",
    doctor_type: "",
    start_time: "",
    end_time: "",

  });
  const [consultation, setConsultation] = useState("");
  const [specilistCategory, setSpecilistCategory] = useState();
  const [doctorTypeGet, setDoctorTypeGet] = useState();
  const [singleSpeciality, setSingleSpeciality] = useState({})
  const [SingleCategories, setSingleCategory] = useState({})

  const setDoctorImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setdoctorImage(reader.result);
    };
  };

  // function handlePassword() {
  //   const newPassword = generatePassword(10);
  //   // setPassword(newPassword);
  //   setPassword("123");
  // }

  const submitForm = (e) => {
    e.preventDefault();
    const { password, availability, PMDA_ID, CNIC, ...docUpdatePassword } = docUpdate;
    const DoctorRegister = { ...docUpdatePassword, image, consultation };
    console.log(DoctorRegister, "doctorRegisterasfaeg");
    setIsLoading(true);
    doctorUpdate(DoctorRegister)
      .then((res) => {
        toast.success("Doctor Updated");
        console.log(res);
      })
      .catch((err) => {
        console.log(err, "Doctor Register Error");
      }).catch(() => {
        setIsLoading(false);
      })
  };

  useEffect(() => {
    getDoctorSingle(docId)
      .then((res) => {
        console.log(res?.data?.data[0], "Asfasfaf")
        const responseData = res?.data?.data[0]
        setDocUpdate({ ...responseData, shift: responseData?.availability, pdma_id: responseData?.PMDA_ID, cnic: responseData?.CNIC });
        setConsultation(responseData.consultation)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const getLoginInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;


    if (name === 'phone') {
      const phoneValue = value.trim();
      // Check if the value is empty or exactly 13 characters long
      if (phoneValue.length === 11 || phoneValue.length === 12) {
        setPhoneError(false);
        setSubmitButtonDisabled(false);
      } else {
        setPhoneError(true);
        setSubmitButtonDisabled(true);
      }
    }

    if (name === 'cnic') {
      const cnicValue = value.trim();
      // Check if the value is empty or exactly 13 characters long
      if (cnicValue === '' || cnicValue.length === 13) {
        setCnicError(false);
        setSubmitButtonDisabled(false);
      } else {
        setCnicError(true);
        setSubmitButtonDisabled(true);
      }
    }

    setDocUpdate({ ...docUpdate, [name]: value });
  };

  useLayoutEffect(() => {
    getSpecilistCategory()
      .then((res) => {
        setSpecilistCategory(res?.data?.data);
      })
      .catch((res) => {
        console.log(res);
      });
    getDoctorType()
      .then((res) => {
        setDoctorTypeGet(res?.data?.data);

      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  useEffect(() => {
    getSingleSpecialistCategory(docUpdate.specialist_category).then((res) => {
      setSingleSpeciality(res?.data?.data[0])
    })
  }, [docUpdate.specialist_category])
  useEffect(() => {
    getSingleCategories(docUpdate.doctor_type).then((res) => {
      setSingleCategory(res?.data?.data[0])
    })
  }, [docUpdate.doctor_type])

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setIsChecked(value === "online");
    setConsultation(value);

    // Update docUpdate with the new consultation value
    setDocUpdate((prevDocUpdate) => ({
      ...prevDocUpdate,
      consultation: value,
    }));
  };





  return (
    <>
      <section className="mainSection">
        <div className="container">
          <div className="mainSectionWrapper">
            <div className="heading">
              <img src={DoctorLogoImg} alt="" />
              <p>Update Doctor</p>
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
                <form
                  className="additionForm"
                  onSubmit={submitForm}
                  ref={formRef}
                >
                  <div className="row g-4">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                      <div className="fields">
                        <div className="profileImage">

                          <img
                            src={docUpdate?.image ? `${imageUrl}/${docUpdate?.image}` : profilePic}
                            alt=""
                            className="profileImage"
                          />

                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                      <div className="fields">
                        <label htmlFor="doctorImage">Image</label>
                        <input
                          type="file"
                          className="form-control"
                          id="doctorImage"
                          name="image"
                          onChange={setDoctorImage}

                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                      <div className="fields">
                        <label htmlFor="doctorName">Name</label>
                        <input
                          type="text"
                          id="doctorName"
                          name="fullname"
                          // placeholder="Enter Name..."
                          placeholder={docUpdate?.fullname}
                          // value={docUpdate[0]?.fullname}
                          onChange={getLoginInput}

                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                      <div className="fields">
                        <label htmlFor="doctorEmail">Email</label>
                        <input
                          type="email"
                          id="doctorEmail"
                          name="email"
                          placeholder={docUpdate?.email}
                          // value={docUpdate[0]?.email}
                          onChange={getLoginInput}

                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                      <div className={`formInputRelative fields ${phoneError ? 'error' : ''}`}>
                        <label htmlFor="doctorPhone">Phone</label>
                        <input
                          type="number"
                          id="doctorPhone"
                          name="phone"
                          placeholder={docUpdate?.phone}
                          // value={docUpdate[0]?.phone}
                          onChange={getLoginInput}

                        />
                        {phoneError && <p className="errorMessage">Enter Valid Phone Number</p>}
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                      <div className="fields">
                        <label htmlFor="doctorPmdaNo">PMDA ID</label>
                        <input
                          type="text"
                          id="doctorPmdaNo"
                          placeholder={docUpdate?.pdma_id}
                          name="pdma_id"
                          // value={docUpdate[0]?.PMDA_ID}
                          onChange={getLoginInput}

                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                      <div className={`formInputRelative fields ${cnicError ? 'error' : ''}`}>
                        <label htmlFor="doctorCNIC">CNIC</label>
                        <input
                          type="number"
                          id="doctorCNIC"
                          placeholder={docUpdate?.cnic}
                          name="cnic"
                          // value={docUpdate[0]?.CNIC}
                          onChange={getLoginInput}
                        />
                        {cnicError && <p className="errorMessage">Enter Valid Cnic Number</p>}
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                      <div className="fields">
                        <label htmlFor="doctorPmdaNo">Qualification</label>
                        <input
                          type="text"
                          id="doctorPmdaNo"
                          placeholder={docUpdate?.qualification}
                          name="qualification"
                          // value={docUpdate[0]?.qualification}
                          onChange={getLoginInput}

                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                      <div className="fields">
                        <label htmlFor="doctorPmdaNo">Experience</label>
                        <input
                          type="number"
                          id="doctorPmdaNo"
                          placeholder={docUpdate?.experience}
                          name="experience"
                          // value={docUpdate[0]?.experience}
                          onChange={getLoginInput}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                      <div className="fields">
                        <label htmlFor="doctorDayAvailability">
                          Consultation
                        </label>
                        <div className="availOuter">
                          <div className="availInner">
                            <div className="labelDiv">
                              <label htmlFor="doctorOnline">Online</label>
                            </div>
                            {/* {console.log(docUpdate.consultation, 'onlineeeeee')} */}
                            <input
                              type="radio"
                              id="doctorOnline"
                              checked={docUpdate.consultation === "online"}
                              value="online"
                              name="consultation"
                              onClick={() => {
                                setDocUpdate((prev) => ({
                                  ...prev,
                                  doctor_type: null,
                                }));
                              }}
                              onChange={handleRadioChange}
                            />
                          </div>
                          <div className="availInner">
                            <div className="labelDiv">
                              <label htmlFor="doctorPhysical">Physical</label>
                            </div>
                            <input
                              type="radio"
                              name="consultation"
                              value="physical"
                              checked={docUpdate.consultation === 'physical'}
                              id="doctorPhysical"
                              onClick={() => {
                                setDocUpdate((prev) => ({
                                  ...prev,
                                  specialist_category: null,
                                }));
                              }}
                              onChange={handleRadioChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                      <div className="fields">
                        <label htmlFor="doctorDayAvailability">
                          Availability
                        </label>

                        <input
                          type="date"
                          id="doctorDayAvailability"
                          value={docUpdate[0]?.availability}
                          name="shift"
                          onChange={getLoginInput}
                          required
                        />
                      </div>
                    </div> */}

                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                      {docUpdate.consultation === "online" && (
                        <div className="fields">
                          <label htmlFor="doctorSpecility">Specility</label>
                          <select
                            name="specialist_category"
                            id=""
                            onChange={getLoginInput}
                            required
                          >
                            {
                              singleSpeciality ?
                                <option value={singleSpeciality.id}>{singleSpeciality.title}</option>
                                :
                                <option value="">Select Specility</option>

                            }
                            {specilistCategory?.map((item, keyId) => {
                              return (
                                <option value={item?.id} key={keyId}>
                                  {item?.title}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      )}
                      {docUpdate.consultation === "physical" && (
                        <div className="fields">
                          <label htmlFor="doctor_typeId">Doctor Type</label>
                          <select
                            name="doctor_type"
                            id="doctor_typeId"
                            onChange={getLoginInput}
                            required
                          >
                            {
                              SingleCategories ?
                                <option value={SingleCategories.id}>{SingleCategories.title}</option>
                                :
                                <option value="">Select Doctor Type</option>

                            }

                            {doctorTypeGet?.map((item, keyId) => {
                              return (
                                <option key={keyId} value={item?.id}>
                                  {item.title}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      )}
                    </div>
                    {docUpdate.consultation === "online" && (
                      <>

                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label htmlFor="startTimeUpdateId">Start Time</label>
                            <input
                              type="time"
                              id="startTimeUpdateId"
                              value={docUpdate?.start_time}
                              name="start_time"
                              onChange={getLoginInput}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label htmlFor="endTimeUpdateId">End Time</label>
                            <input
                              type="time"
                              id="endTimeUpdateId"
                              value={docUpdate?.end_time}
                              name="end_time"
                              onChange={getLoginInput}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label htmlFor="endTimeUpdateId">Fees</label>
                            <input
                              type="number"
                              placeholder={docUpdate?.fee}
                              name="fee"
                              onChange={getLoginInput}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                      <div className="fields">
                        <button type="Submit" disabled={submitButtonDisabled}>
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
