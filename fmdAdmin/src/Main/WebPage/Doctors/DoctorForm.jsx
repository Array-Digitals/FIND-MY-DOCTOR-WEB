import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router";
import profilePic from "../../../assets/images/guy.png";
import GeneratePassword from "../../../services/generatePassword";
import AdminService from "../../../services/adminApi";
import TagsInput from 'react-tagsinput';
import DoctorLogoImg from '../../../assets/images/Doctor.svg'
import 'react-tagsinput/react-tagsinput.css';
import { Loader } from "../../Component/loader";

export const DoctorForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  //PUT CONDIOTION ON SUBMIT FUNCTION ON DOCID or docUpdate pass krwado API k parameter main
  const { generatePassword } = GeneratePassword();
  const {
    doctorRegister,
    getSpecilistCategory,
    getDoctorType,
  } = AdminService();
  let { docId } = useParams();
  // let imageUrl = "http://fmd.arraydigitals.com"
  const [phoneError, setPhoneError] = useState(false);
  const [cnicError, setCnicError] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  // const [password, setPassword] = useState("");
  const [image, setdoctorImage] = useState();
  const formRef = useRef(null);
  const [isChecked, setIsChecked] = useState(true);
  const [consultation, setConsultation] = useState("online");
  const [specilistCategory, setSpecilistCategory] = useState();
  const [doctorTypeGet, setDoctorTypeGet] = useState();
  const [chips, setChips] = useState([]);
  // const [qualification, setQualification ] = useState()
  const handleChangeQualification = (newChips) => {
    if (newChips.length <= 8) {
      setChips(newChips);
    }
    // setQualification(chips.join(', '));
  };
  const qualification = chips.join(', ');
  // console.log(chipsString, 'quali');
  const [doctorData, setDoctorData] = useState({
    fullname: "",
    email: "",
    phone: "",
    // qualification: chipsString,
    experience: "",
    specialist_category: null,
    pdma_id: "",
    cnic: "",
    shift: "none",
    fee: "0",
    specility: "",
    doctor_type: null,
    start_time: "00:00",
    end_time: "00:00",
    password: ""
  });

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

    setDoctorData({ ...doctorData, [name]: value });

  };

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
    const DoctorRegister = { ...doctorData, image, consultation, qualification };
    console.log(DoctorRegister, "doctorRegister");
    setIsLoading(true);
    doctorRegister(DoctorRegister)
      .then((res) => {
        console.log(res);
        toast.success("Doctor Added");
        formRef.current.reset();
        setChips([]);
      })
      .catch((err) => {
        console.log(err, "Doctor Register Error");
      }).finally(() => {
        setIsLoading(false);
      })
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

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setIsChecked(value === "online");
    setConsultation(value);
  };

  return (
    <>
      <section className="mainSection">
        <div className="container">
          <div className="mainSectionWrapper">
            <div className="heading">
              <img src={DoctorLogoImg} alt="" />  <p>Add Doctor</p>
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

                {isLoading ?
                  <Loader />
                  :
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
                              src={image ? image : profilePic}
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
                            required
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
                            placeholder="Enter Name..."
                            onChange={getLoginInput}
                            required
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
                            placeholder="Enter Email..."

                            onChange={getLoginInput}
                            required
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
                            placeholder="Enter Number..."
                            onChange={getLoginInput}
                            required
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
                            placeholder="Enter PMDA ID..."
                            name="pdma_id"
                            onChange={getLoginInput}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                        <div className={`formInputRelative fields ${cnicError ? 'error' : ''}`}>
                          <label htmlFor="doctorCNIC">CNIC</label>
                          <input
                            type="number"
                            id="doctorCNIC"
                            placeholder="Enter CNIC Number..."
                            name="cnic"

                            onChange={getLoginInput}
                            required
                          />
                          {cnicError && <p className="errorMessage">Enter Valid Cnic Number</p>}
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
                              <input
                                type="radio"
                                id="doctorOnline"
                                checked={isChecked}
                                value="online"
                                name="consultation"
                                onClick={() => {
                                  setDoctorData((prev) => ({
                                    ...prev,
                                    doctor_type: null,
                                  }));
                                }}
                                onChange={handleRadioChange}
                                required
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
                                checked={!isChecked}
                                id="doctorPhysical"
                                onClick={() => {
                                  setDoctorData((prev) => ({
                                    ...prev,
                                    specialist_category: null,
                                  }));
                                }}
                                onChange={handleRadioChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                        {isChecked && (
                          <div className="fields">
                            <label htmlFor="doctorSpecility">Speciality</label>
                            <select
                              name="specialist_category"
                              id=""
                              onChange={getLoginInput}
                              required
                            >
                              <option value="">Select Speciality</option>
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
                        {!isChecked && (
                          <div className="fields">
                            <label htmlFor="doctor_typeId">Doctor Type</label>
                            <select
                              name="doctor_type"
                              id="doctor_typeId"
                              onChange={getLoginInput}
                              required
                            >
                              <option value="">Select Doctor Type</option>
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
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                        <div className="fields">
                          <label htmlFor="doctorPmdaNo">Experience</label>
                          <input
                            type="number"
                            id="doctorPmdaNo"
                            placeholder="Enter Experience (In Years)..."
                            name="experience"

                            onChange={getLoginInput}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                        <div className="fields">
                          <label htmlFor="doctorPmdaNo">Qualification</label>
                          <TagsInput
                            value={chips}
                            onChange={handleChangeQualification}
                            addOnBlur={true}
                            addKeys={[9, 13, 32]}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                        <div className="fields">
                          <label htmlFor="doctorPmdaNo">Password</label>
                          <input
                            type="number"
                            id="doctorPmdaNo"
                            placeholder="Password"
                            name="password"
                            onChange={getLoginInput}
                            required
                          />
                        </div>
                      </div>
                      {isChecked && (
                        <React.Fragment>

                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                            <div className="fields">
                              <label htmlFor="doctorPmdaNo">Start Time</label>
                              <input
                                type="time"
                                id="doctorPmdaNo"
                                // placeholder="Enter Experience (In Years)..."
                                name="start_time"
                                onChange={getLoginInput}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                            <div className="fields">
                              <label htmlFor="doctorPmdaNo">End Time</label>
                              <input
                                type="time"
                                id="doctorPmdaNo"
                                // placeholder="Enter Experience (In Years)..."
                                name="end_time"
                                onChange={getLoginInput}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                            <div className="fields">
                              <label htmlFor="doctorPmdaNo">Fees</label>
                              <input
                                type="number"
                                id="doctorPmdaNo"
                                // placeholder="Enter Experience (In Years)..."
                                placeholder="Enter Fees"
                                name="fee"
                                onChange={getLoginInput}
                                required
                              />
                            </div>
                          </div>

                        </React.Fragment>
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
                }

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
