import React, { useState, useEffect, useRef } from 'react'
import AdminService from '../../../services/adminApi';
import GeneratePassword from '../../../services/generatePassword';
import profilePic from '../../../assets/images/guy.png'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router';
import { Loader } from '../../Component/loader';
import { imageUrl } from '../../../services/baseUrl';

export const LabUpdate = () => {
    const { generatePassword } = GeneratePassword();
    let { labId } = useParams();
    const { labUpdate, getSingleLab, getSingleCity, getAllCity } = AdminService();
    const [AllCities, setAllCities] = useState([])
    const [phoneError, setPhoneError] = useState(false);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [logo, setLabLogo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const formRef = useRef(null);
    const [labData, setLabData] = useState({})
    const [labCity, setLabCity] = useState({})
    const setLabImage = e => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setLabLogo(reader.result);
        };
    }
    useEffect(() => {
        getAllCity().then((res) => {
            setAllCities(res.data.data)
        }).catch((res) => {
            console.log(res, 'error');
        })
    }, [])
    const getLoginInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
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
        setLabData({ ...labData, [name]: value })
    }

    const formSubmit = (e) => {
        e.preventDefault()
        const { city, type, ...labDataUpdated } = labData;
        console.log(labDataUpdated, 'updateeeddd');
        const labNewData = { ...labDataUpdated, logo };

        console.log(labNewData, "labsubmitteddd")
        formRef.current.reset();
        setIsLoading(true);
        labUpdate(labNewData).then((res) => {
            toast.success('Lab Updated');
            console.log(res)
        }).catch((err) => {
            toast.error('Lab Update Failed');
            console.log(err.message)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const [urlImage, setUrlImage] = useState('')

    // console.log(urlImage, 'URLLL');
    useEffect(() => {
        getSingleLab(labId).then((res) => {
            const response = res?.data?.data[0]
            
            setUrlImage(response.logo)
            console.log(res?.data?.data[0], "data")
            setLabData({ logo, ...response })
            getSingleCity(response.city).then((res) => {
                console.log(res.data.data[0], 'cities');
                setLabCity(res.data.data[0])
            }).catch((res) => {
                console.log(res, 'error');
            })

        }).catch((res) => {
            console.log(res, 'err');
        })
    }, [])

    return (
        <>
            <section className='mainSection'>
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <p>
                                Update Lab
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
                                    <form className="additionForm" onSubmit={formSubmit} ref={formRef}>
                                        <div className="row g-4">
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                <div className="fields">
                                                    <div className="profileImage">
                                                        <img src={logo ? logo : (urlImage ? `${imageUrl}/${urlImage}` : profilePic)} alt="" className='profileImage' />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="doctorName">Lab Image</label>
                                                    <input type="file" className='form-control' id='doctorName' name='logo' placeholder='Enter Name...' onChange={setLabImage} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="doctorName">Lab Name</label>
                                                    <input type="text" id='doctorName' name='name' placeholder={labData?.name} onChange={getLoginInput} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="doctorEmail">Email</label>
                                                    <input type="email" id='doctorEmail' name='email' placeholder={labData?.email} onChange={getLoginInput} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className={`formInputRelative fields ${phoneError ? 'error' : ''}`}>
                                                    <label htmlFor="doctorPhone">Phone</label>
                                                    <input type="number" id='doctorPhone' name='phone' placeholder={labData?.phone} onChange={getLoginInput} />
                                                    {phoneError && <p className="errorMessage">Enter Valid Phone Number</p>}
                                                </div>
                                            </div>

                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="doctorSpecility">Lab Representative Name</label>
                                                    <input type="text" id='doctorCNIC' placeholder={labData?.fullname} name='fullname' onChange={getLoginInput} />
                                                </div>
                                            </div>

                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="doctorCNIC">Lab Address</label>

                                                    <p className='inputFieldsStatic'>{labData?.lab_address}</p>
                                                    {/* <input type="text" id='doctorCNIC' name='lab_address' placeholder={labData?.lab_address} onChange={getLoginInput} /> */}
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="doctorCNIC">Lab City</label>
                                                    <p className='inputFieldsStatic'> {labCity?.name} </p>
                                                    {/* <select name="" id="" >
                                                        <option value={labCity?.id}>Default: {labCity?.name}</option>
                                                        {
                                                            AllCities.map((item, keyId) => (
                                                                <option key={keyId} value={item.id}>{item.name}</option>
                                                            ))
                                                        }
                                                    </select> */}
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
            </section>
        </>
    )
}
