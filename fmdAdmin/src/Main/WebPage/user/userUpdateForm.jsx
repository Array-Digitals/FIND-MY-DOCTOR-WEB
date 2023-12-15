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
import { useParams } from 'react-router';
import { imageUrl } from '../../../services/baseUrl';

export const UserUpdateForm = () => {

    const { adminId } = useParams();
    // console.log(adminId, 'paramms');
    const { generatePassword } = GeneratePassword();
    const [isLoading, setIsLoading] = useState(false);
    const { createAdmin, updateAdmin } = AuthService();
    // const {getSingleAdmin } = AdminService();
    const { postUserMeta, updateUserMeta, getUserMeta, getSingleAdmin } = AdminService();


    const [adminImage, setAdminImage] = useState('')
    const [userData, setUserData] = useState({})

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
    const [adminMetaImage, setAdminMetaImage] = useState('')

    useEffect(() => {
        getUserMeta(adminId).then((res) => {
            setAdminMetaImage(res.data.data[0].meta_value)
            console.log(res.data.data, 'respMets');
        }).catch((res) => {
            console.log(res, 'response');
        })
        getSingleAdmin(adminId).then((res) => {
            const userObjects = res.data.data[0]
            const userPerms = JSON.parse(userObjects.access.permissions)

            setAdminPerm(userPerms.admin);
            setDoctorPerm(userPerms.doctor);
            setInsurePerm(userPerms.insurance);
            setPharmPerm(userPerms.pharmacy);
            setLabPerm(userPerms.lab)

            const { access, password, ...userData } = userObjects

            setUserData(userData)
            // console.log(userData, 'userrrr');

        }).catch((res) => {
            console.log(res.data, 'error');
        })
    }, [adminId])



    const getInput = (e) => {
        const name = e.target.name;
        const value = e.target.value
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
        updateAdmin(adminRegister).then((res) => {
            console.log(res, 'res');
            // const userId = res?.data?.data?.insertId
            const userMeta = {
                user: userData?.id, key: 'image', value: adminImage
            }
            // console.log(userMeta, 'asddddddd');
            if (adminImage) {
                updateUserMeta(userMeta)
                    .then((res) => {
                        console.log(res, 'res');
                    })
                    .catch((res) => {
                        console.log(res, 'err');
                    })
            }
            toast.success("Admin Updated");
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
                                Update User
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
                                                            src={adminImage ? adminImage : (adminMetaImage ? `${imageUrl}/${adminMetaImage}` : profilePic)}
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
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="userName">Name</label>
                                                    <input type="text" id='userName' name='fullname' placeholder={userData.fullname} onChange={getInput} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="userEmail">Email</label>
                                                    <input type="email" id='userEmail' name='email' placeholder={userData.email} onChange={getInput} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="userPhone">Phone</label>
                                                    <input type="number" id='userPhone' name='phone' placeholder={userData.phone} onChange={getInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" checked={doctorPerm?.add} name='add' onChange={getDoctorPermInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" checked={doctorPerm?.manage} name='manage' onChange={getDoctorPermInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" checked={doctorPerm?.assign} name='assign' onChange={getDoctorPermInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" checked={doctorPerm?.report} name='report' onChange={getDoctorPermInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" checked={labPerm?.add} name='add' onChange={getLabPermInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" checked={labPerm?.manage} name='manage' onChange={getLabPermInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" checked={labPerm?.addTest} name='addTest' onChange={getLabPermInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" checked={labPerm?.assign} name='assign' onChange={getLabPermInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" checked={labPerm?.testOrder} name='testOrder' onChange={getLabPermInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" checked={labPerm?.manageOrder} name='manageOrder' onChange={getLabPermInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" name='reportOrder' checked={labPerm?.reportOrder} onChange={getLabPermInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" name='reportPhlebotomist' checked={labPerm?.reportPhlebotomist} onChange={getLabPermInput} />
                                                            <span className="slider round"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                <div className="fields">
                                                    <h3 className='innerSubHeading'> Pharmacy Permissions</h3>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                                                <div className="fields">
                                                    <div className="toggleInner">
                                                        Add Pharmacy
                                                    </div>
                                                    <div className="toggleButton">
                                                        <label className="switch">
                                                            <input type="checkbox" checked={pharmPerm?.add} id="adminRightsCheckbox" name='add' onChange={getPharmPermInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" checked={pharmPerm?.manage} name='manage' onChange={getPharmPermInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" checked={pharmPerm?.track} name='track' onChange={getPharmPermInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" name='allOrder' checked={pharmPerm?.allOrder} onChange={getPharmPermInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" name='orderReporting' checked={pharmPerm?.orderReporting} onChange={getPharmPermInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" checked={insurePerm?.managePkg} name='managePkg' onChange={getInsurePermInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" checked={insurePerm?.manageProv} name='manageProv' onChange={getInsurePermInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" checked={insurePerm?.addProv} name='addProv' onChange={getInsurePermInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" checked={insurePerm?.insureReport} name='insureReport' onChange={getInsurePermInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" name='manageBooking' checked={insurePerm?.manageBooking} onChange={getInsurePermInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" checked={adminPerm?.manage} name='manage' onChange={getAdminPermInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" name='add' checked={adminPerm?.add} onChange={getAdminPermInput} />
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
                                                            <input type="checkbox" id="adminRightsCheckbox" name='services' checked={adminPerm?.services} onChange={getAdminPermInput} />
                                                            <span className="slider round"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                <div className="fields">
                                                    <button type='Submit' >Submit</button>
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
    )
}
