import React, { useState } from 'react'
import AdminService from '../../../services/adminApi';
import profilePic from '../../../assets/images/guy.png'
import insurancePicLogo from '../../../assets/images/Insurance.svg'
import insuranceService from '../../../services/insurance';
import { Loader } from '../../Component/loader';
import { ToastContainer, toast } from 'react-toastify';

export const InsuranceProvider = () => {
  const { postUserMeta } = AdminService();

  const { insuranceProviderPost } = insuranceService();

  const [insuranceImg, setInsuranceImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [contactPhoneError, setContactPhoneError] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [testData, setTestData] = useState({
    fullname: "",
    email: "",
    password: "",
    logo: 'data:image/png;base64,i',
    name: "",
    website: "",
    headofficeAddress: "",
    contactPersonNumber: "",
  })

  const userPerm = {
    insureBooking: 1,
    addPkg: 1
  }

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
    if (name === 'contactPersonNumber') {
      const contactsValue = value.trim();
      // Check if the value is empty or exactly 13 characters long
      if (contactsValue.length === 11 || contactsValue.length === 12) {
        setContactPhoneError(false);
        setSubmitButtonDisabled(false);
      } else {
        setContactPhoneError(true);
        setSubmitButtonDisabled(true);
      }
    }

    setTestData({ ...testData, [name]: value })
  }

  const setInsuranceImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setInsuranceImg(reader.result);
    };
  };

  const formSubmit = (e) => {
    e.preventDefault()
    const testSubmit = { ...testData, permissions: { insurance: userPerm } }
    setIsLoading(true);
    console.log(testSubmit)
    insuranceProviderPost(testSubmit).then((res) => {
      const userId = res?.data?.data?.insertId
      postUserMeta({ user: userId, key: 'image', value: insuranceImg })
        .then((res) => {
          console.log(res, 'res');
        })
        .catch((res) => {
          console.log(res, 'err');
        })
      toast.success("Provider Added")
    }).catch((err) => {
      console.log(err.message)
    }).finally(() => {
      setIsLoading(false)
    })
  }
  return (
    <React.Fragment>
      <section className='mainSection'>
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
        <div className="container">
          <div className="mainSectionWrapper">
            <div className="heading">
              <img src={insurancePicLogo} alt="" />
              <p>
                Insurance Provider
              </p>
            </div>
            <div className="card cardForm">
              <div className="card-body">
                {
                  isLoading
                    ?
                    <Loader />
                    :
                    <form className="additionForm" onSubmit={formSubmit}>
                      <div className="row g-4">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                          <div className="fields">
                            <div className="profileImage">
                              <img src={insuranceImg || profilePic} alt="" className='profileImage' />
                            </div>

                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label htmlFor="doctorName">Name</label>
                            <input type="text" id='doctorName' name='fullname' placeholder='Enter Provider Name...' required onChange={getLoginInput} />
                          </div>
                        </div>

                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label htmlFor="doctorName">Email</label>
                            <input type="email" id='doctorName' name='email' placeholder='Enter Email...' required onChange={getLoginInput} />
                          </div>
                        </div>

                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label htmlFor="doctorName">Logo</label>
                            <input type="file" className='form-control' id='doctorName' name='logo' required onChange={setInsuranceImage} />
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className={`formInputRelative fields ${phoneError ? 'error' : ''}`}>
                            <label htmlFor="doctorName">Phone</label>
                            <input type="number" id='doctorName' name='phone' placeholder='Enter number...' required onChange={getLoginInput} />
                            {phoneError && <p className="errorMessage">Enter Valid Phone Number</p>}
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label htmlFor="doctorName">Website</label>
                            <input type="text" id='doctorName' name='website' placeholder='Enter website Link...' required onChange={getLoginInput} />
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label htmlFor="doctorName">Head Office Address</label>
                            <input type="text" id='doctorName' name='headofficeAddress' placeholder='Enter Head Office Address...' required onChange={getLoginInput} />
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          {/* <div className="fields"> */}
                          <div className={`formInputRelative fields ${contactPhoneError ? 'error' : ''}`}>
                            <label htmlFor="doctorName">Contact Person Number</label>
                            <input type="number" id='doctorName' name='contactPersonNumber' placeholder='Enter Contact Person Number...' required onChange={getLoginInput} />
                            {contactPhoneError && <p className="errorMessage">Enter Valid Contact's Number</p>}
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label htmlFor="doctorName">Contact Person Name</label>
                            <input type="text" id='doctorName' name='name' placeholder='Enter Contact Person Name...' required onChange={getLoginInput} />
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label htmlFor="doctorName">Password</label>
                            <input type="password" id='doctorName' name='password' placeholder='Password...' required onChange={getLoginInput} />
                          </div>
                        </div>

                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                          <div className="fields">
                            <button type='Submit' disabled={submitButtonDisabled} >Submit</button>
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
    </React.Fragment>
  )
}
