import React, { useState, useRef, useEffect } from 'react'
import AdminService from '../../../services/adminApi';
import GeneratePassword from '../../../services/generatePassword';
import profilePic from '../../../assets/images/guy.png'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from '../../Component/loader';

export const LabForm = () => {
    const { generatePassword } = GeneratePassword();
    const { labRegister, onSuccessLogin, getAllCities } = AdminService();
    const [password, setPassword] = useState('')
    const [phoneError, setPhoneError] = useState(false);
    const [cnicError, setCnicError] = useState(false);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [logo, setLabLogo] = useState();
    const formRef = useRef(null);
    const [allCities, setAllCities] = useState([]);
    const [labData, setLabData] = useState({
        fullname: "",
        email: "",
        phone: "",
        lab_name: "",
        lab_address: "",
        cities: 0,
        password:'ceV@1%vaFW'
    });
    const setLabImage = e => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setLabLogo(reader.result);
        };
    }
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
        setLabData({ ...labData, [name]: value })
    }
    // const handlePassword = (e) => {
    //     const newPassword = generatePassword(10);
    //     setPassword(newPassword);
    // }
    const formSubmit = (e) => {
        e.preventDefault()
        const labSubmit = { ...labData, logo }
        console.log(labSubmit)
        toast.success('Lab Added');
        formRef.current.reset();
        labRegister(labSubmit).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err.message)
        })
    }

    useEffect(() => {
        getAllCities().then((res) => {
            setAllCities(res?.data?.data)
        }).catch((err) => {
            console.log(err);
        }, [])
    })
    return (
        <>
            <section className='mainSection'>
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <p>
                                Add Lab
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
                                <form className="additionForm" onSubmit={formSubmit} ref={formRef}>
                                    <div className="row g-4">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                            <div className="fields">
                                                <div className="profileImage">
                                                    <img src={logo ? logo : profilePic} alt="" className='profileImage' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="doctorName">Lab Image</label>
                                                <input type="file" className='form-control' id='doctorName' name='logo' required placeholder='Enter Name...' onChange={setLabImage} />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="doctorName">Lab Name</label>
                                                <input type="text" id='doctorName' name='lab_name' placeholder='Enter Name...' required onChange={getLoginInput} />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="doctorEmail">Email</label>
                                                <input type="email" id='doctorEmail' name='email' placeholder='Enter Email...' required onChange={getLoginInput} />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                        <div className={`formInputRelative fields ${phoneError ? 'error' : ''}`}>
                                                <label htmlFor="doctorPhone">Phone</label>
                                                <input type="number" id='doctorPhone' name='phone' placeholder='Enter Number...' required onChange={getLoginInput} />
                                                {phoneError && <p className="errorMessage">Enter Valid Phone Number</p>}
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="doctorCNIC">Lab Address</label>
                                                <input type="text" id='doctorCNIC' name='lab_address' placeholder='Enter Address...' required onChange={getLoginInput} />
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="doctorSpecility">Lab Representative Name</label>
                                                <input type="text" id='doctorCNIC' placeholder='Enter Representative Name...' required name='fullname' onChange={getLoginInput} />
                                            </div>
                                        </div>
                                       

                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="doctorSpecility">Cities</label>
                                                <select name="cities" id="" onChange={getLoginInput}>
                                                    <option selected disabled>Choose City</option>
                                                    {allCities.map((item, keyId) => (
                                                        <option key={keyId} value={item.id}>{item.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="doctorSpecility">Password</label>
                                                <input type="password" id='doctorCNIC' placeholder='Password...' required name='password' onChange={getLoginInput} />
                                            </div>
                                        </div> */}

                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                            <div className="fields">
                                                <button type='Submit' disabled={submitButtonDisabled} >Submit</button>
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
    )
}
