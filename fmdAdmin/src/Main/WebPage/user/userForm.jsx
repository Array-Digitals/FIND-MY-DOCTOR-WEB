import React, { useEffect } from 'react'
import GeneratePassword from '../../../services/generatePassword';
import { useState } from 'react';
import AuthService from '../../../services/authService';
import userImageLogo from '../../../assets/images/User.svg';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profilePic from "../../../assets/images/guy.png";

import { Loader } from '../../Component/loader';
import AdminService from '../../../services/adminApi';

export const UserForm = () => {
  const { generatePassword } = GeneratePassword();
  const [isLoading, setIsLoading] = useState(false);
  const { createAdmin, } = AuthService();
  const { postUserMeta } = AdminService();
  const [phoneError, setPhoneError] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const [adminImage, setAdminImage] = useState('');
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  })

  const [doctorPerm, setDoctorPerm] = useState({
    add: 0,
    manage: 0,
    assign: 0,
    report: 0,
  })
  const [labPerm, setLabPerm] = useState({
    add: 0,
    manage: 0,
    assign: 0,
    addTest: 0,
    testOrder: 0,
    manageOrder: 0,
    reportPhlebotomist: 0,
    reportOrder: 0,
  })
  const [pharmPerm, setPharmPerm] = useState({
    add: 0,
    manage: 0,
    track: 0,
    allOrder: 0,
    orderReporting: 0,
  })
  const [insurePerm, setInsurePerm] = useState({
    addPkg: 0,
    managePkg: 0,
    addProv: 0,
    manageProv: 0,
    manageBooking: 0,
    insureReport: 0,
    insureBooking: 0,
  })
  const [adminPerm, setAdminPerm] = useState({
    manage: 0,
    add: 0,
    services: 0,
  })


  const getDoctorPermInput = (e) => {
    const name = e.target.name;
    const value = e.target.checked ? 1 : 0;
    setDoctorPerm({ ...doctorPerm, [name]: value })
  }
  const getLabPermInput = (e) => {
    const name = e.target.name;
    const value = e.target.checked ? 1 : 0;
    setLabPerm({ ...labPerm, [name]: value })
  }
  const getPharmPermInput = (e) => {
    const name = e.target.name;
    const value = e.target.checked ? 1 : 0;
    setPharmPerm({ ...pharmPerm, [name]: value })
  }
  const getInsurePermInput = (e) => {
    const name = e.target.name;
    const value = e.target.checked ? 1 : 0;
    setInsurePerm({ ...insurePerm, [name]: value })
  }
  const getAdminPermInput = (e) => {
    const name = e.target.name;
    const value = e.target.checked ? 1 : 0;
    setAdminPerm({ ...adminPerm, [name]: value })
  }






  const getInput = (e) => {
    const name = e.target.name;
    const value = e.target.value

    if (name === 'phone') {
      const phoneValue = value.trim();
      // Check if the value is empty or exactly 11 or 12 digits long
      if (phoneValue.length === 11 || phoneValue.length === 12) {
        setPhoneError(false);
        setSubmitButtonDisabled(false);
      } else {
        setPhoneError(true);
        setSubmitButtonDisabled(true);
      }
    }

    setUserData({ ...userData, [name]: value })
  }

  const getAdminImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAdminImage(reader.result);
    };
  };


  const formSubmit = (e) => {
    e.preventDefault();
    // const adminRegister = { ...userData }
    const permObject = {
      doctor: doctorPerm,
      lab: labPerm,
      insurance: insurePerm,
      pharmacy: pharmPerm,
      admin: adminPerm
    }
    const adminRegister = {
      ...userData,
      permissions: permObject
    }
    console.log(adminRegister, "admin register");
    setIsLoading(true);
    createAdmin(adminRegister).then((res) => {
      console.log(res, 'res');
      const userId = res?.data?.data?.insertId
      postUserMeta({ user: userId, key: 'image', value: adminImage })
        .then((res) => {
          console.log(res, 'res');
        })
        .catch((res) => {
          console.log(res, 'err');
        })
      toast.success("Admin Added");
    })
      .catch((res) => {
        console.log(res, 'err');
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>

      <section className='mainSection'>
        <div className="container">
          <div className="mainSectionWrapper">
            <div className="heading">
              <img src={userImageLogo} alt="" />
              <p>
                Add User
              </p>
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
                  <form className="additionForm" onSubmit={formSubmit}>
                    <div className="row g-4">
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                        <div className="fields">
                          <div className="profileImage">
                            <img
                              src={adminImage ? adminImage : profilePic}
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
                            onChange={getAdminImage}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                        <div className="fields">
                          <label htmlFor="userName">Name</label>
                          <input type="text" id='userName' name='fullname' placeholder='Enter Name...' onChange={getInput} />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                        <div className="fields">
                          <label htmlFor="userEmail">Email</label>
                          <input type="email" id='userEmail' name='email' placeholder='Enter Email...' onChange={getInput} />
                        </div>
                      </div>

                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                        <div className={`formInputRelative fields ${phoneError ? 'error' : ''}`}>
                          <label htmlFor="doctorPhone">Phone</label>
                          <input type="number" id='doctorPhone' name='phone' placeholder='Enter Number...' required onChange={getInput} />
                          {phoneError && <p className="errorMessage">Enter Valid Phone Number</p>}
                        </div>
                      </div>

                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                        <div className="fields">
                          <label htmlFor="userPhone">Password</label>
                          <input type="password" autocompleted="none" id='userPhone' name='password' placeholder='Enter Password...' onChange={getInput} />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                        <div className="fields">
                          <h3 className='innerSubHeading'> Doctor Permissions</h3>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            Add Doctor
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='add' onChange={getDoctorPermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            Manage Doctor
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='manage' onChange={getDoctorPermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            Assign Doctor
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='assign' onChange={getDoctorPermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            Report Doctor
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='report' onChange={getDoctorPermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                        <div className="fields">
                          <h3 className='innerSubHeading'> Labs Permissions</h3>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            Add Lab
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='add' onChange={getLabPermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      {/* Working  */}
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            Manage Lab
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='manage' onChange={getLabPermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            Add Test
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='addTest' onChange={getLabPermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            Assign Test
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='assign' onChange={getLabPermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            Test Order
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='testOrder' onChange={getLabPermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            Manage Order
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='manageOrder' onChange={getLabPermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            Report Order
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='reportOrder' onChange={getLabPermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            Report Phlebotomist
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='reportPhlebotomist' onChange={getLabPermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                        <div className="fields">
                          <h3 className='innerSubHeading'> Pharmacy Permissions</h3>
                        </div>
                      </div> <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            Add Pharmacy
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='add' onChange={getPharmPermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            Manage Pharmacy
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='manage' onChange={getPharmPermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            Track Order
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='track' onChange={getPharmPermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            All Order
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='allOrder' onChange={getPharmPermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            Order Reporting
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='orderReporting' onChange={getPharmPermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                        <div className="fields">
                          <h3 className='innerSubHeading'> Insurance Permissions</h3>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            Manage Package
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='managePkg' onChange={getInsurePermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            Manage Provider
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='manageProv' onChange={getInsurePermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            Add Package
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='addPkg' onChange={getInsurePermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div> */}
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            Add Provider
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='addProv' onChange={getInsurePermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            Insurance report
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='insureReport' onChange={getInsurePermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            Manage Booking
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='manageBooking' onChange={getInsurePermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                        <div className="fields">
                          <h3 className='innerSubHeading'> Admin Permissions</h3>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">

                        <div className="fields">
                          <div className="toggleInner">
                            Manage Admin
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='manage' onChange={getAdminPermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">

                        <div className="fields">
                          <div className="toggleInner">
                            Add Admin
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='add' onChange={getAdminPermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <div className="fields">
                          <div className="toggleInner">
                            Services
                          </div>
                          <div className="toggleButton">
                            <label className="switch">
                              <input type="checkbox" id="adminRightsCheckbox" name='services' onChange={getAdminPermInput} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                        <div className="fields">
                          <button type='Submit' disabled={submitButtonDisabled}>Submit</button>
                        </div>
                      </div>
                    </div>
                  </form>

                }

              </div>
            </div>
          </div>
        </div>
      </section >

    </>
  )
}
