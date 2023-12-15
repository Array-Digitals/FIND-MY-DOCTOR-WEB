import React, { useState, useEffect, useRef } from 'react'
import AdminService from '../../../services/adminApi';
import profilePic from '../../../assets/images/guy.png'
import { toast, ToastContainer } from 'react-toastify';
import { Loader } from '../../Component/loader';
// import LabLogoImg from '../../../assets/images/Lab'


export const AddAssitant = () => {


    const { postAssitant, getLab } = AdminService();
    const formRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [cnicError, setCnicError] = useState(false);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [labs, setLabs] = useState([]);
    const [image, setImage] = useState();
    const [assitantData, setAssitantData] = useState({
        fullname: "",
        phone: "",
        email: "",
        cnic: "",
        lab: 0,
        password: "",
    })

    const getImage = e => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);
        };
    }

    const getLoginInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        // Apply digit-only restriction for input with data-number attribute
        // if (e.target.getAttribute('data-number')) {
        //     const digitsOnlyValue = value.replace(/[^0-9]/g, ''); // Allow only digits
        //     setAssitantData({ ...assitantData, [name]: digitsOnlyValue });
        // } else {
        //     setAssitantData({ ...assitantData, [name]: value });
        // }

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
        setAssitantData({ ...assitantData, [name]: value })
    }

    const formSubmit = (e) => {
        setIsLoading(false)
        e.preventDefault()
        const assitantSubmits = { ...assitantData, image }
        console.log(assitantSubmits)
        postAssitant(assitantSubmits).then((res) => {
            console.log(res)
            toast.success('Assitant Added');
            formRef.current.reset();

        }).catch((err) => {
            console.log(err.message)

            toast.error('Assitant Failed to Added');

        }).finally(() => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getLab().then((res) => {
            console.log(res?.data?.data);
            setLabs(res?.data?.data);
        })
    }, [])


    return (
        <React.Fragment>
            <section className='mainSection'>
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <p>
                                Add Phlebotomist
                            </p>
                        </div>
                        <div className="card cardForm">
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
                            <div className="card-body">
                                {isLoading ?
                                    <Loader />
                                    :
                                    <form className="additionForm" onSubmit={formSubmit} ref={formRef}>
                                        <div className="row g-4">
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                <div className="fields">
                                                    <div className="profileImage">
                                                        <img src={profilePic} alt="" className='profileImage' />
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="doctorName">Upload Profile</label>
                                                    <input type="file" className='form-control' id='doctorName' name='image' required onChange={getImage} />
                                                </div>
                                            </div>

                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="doctorName">Assitant Name</label>
                                                    <input type="text" id='doctorName' name='fullname' placeholder='Enter Name...' required onChange={getLoginInput} />
                                                </div>
                                            </div>

                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className={`formInputRelative fields ${cnicError ? 'error' : ''}`}>
                                                    <label htmlFor="doctorName">CNIC</label>
                                                    <input type="text" id='doctorName' name='cnic' placeholder='Enter CNIC...' required onChange={getLoginInput} />
                                                    {cnicError && <p className="errorMessage">Enter Valid Cnic Number</p>}
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="doctorName">Email</label>
                                                    <input type="email" id='doctorName' name='email' placeholder='Enter Email...' required onChange={getLoginInput} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className={`formInputRelative fields ${phoneError ? 'error' : ''}`}>
                                                    <label htmlFor="">Phone</label>
                                                    <input type="number" data-number id='' name='phone' placeholder='Enter Phone...' required onChange={getLoginInput} />
                                                    {phoneError && <p className="errorMessage">Enter Valid Phone Number</p>}
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="">Password</label>
                                                    <input type="password" id='' name='password' placeholder='Enter Password...' required onChange={getLoginInput} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="">Labs</label>
                                                    <select name="lab" id="" onChange={getLoginInput}>
                                                        <option value="0">Select Labs</option>
                                                        {
                                                            labs?.map((item, keyId) => {
                                                                return (
                                                                    <option value={item?.lab_id} key={keyId}>
                                                                        {item?.fullname}
                                                                    </option>
                                                                );
                                                            })

                                                        }
                                                    </select>
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
        </React.Fragment>
    )
}
