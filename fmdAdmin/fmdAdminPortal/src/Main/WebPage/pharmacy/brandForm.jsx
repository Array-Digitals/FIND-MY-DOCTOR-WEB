import React, { useState } from 'react'
import AdminService from '../../../services/adminApi'
import pharmacyService from '../../../services/pharmacy';
import pharmacyPicLogo from '../../../assets/images/Pharmacy.svg'
import profileImg from '../../../assets/images/guy.png'
import { toast, ToastContainer } from "react-toastify";
import { Loader } from '../../Component/loader';


export const BrandForm = () => {

    const { brandPost } = pharmacyService();
    const [logo, setCategoryImage] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [brandData, setBrandData] = useState({
        name: "",
        description: "",
    })
    const [is_featured, setIs_featured] = useState(0)
    const categoryImageSet = e => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setCategoryImage(reader.result);
        };
    }
    const getLoginInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setBrandData({ ...brandData, [name]: value })
    }
    const formSubmit = (e) => {
        e.preventDefault();
        const BrandSubmit = { ...brandData, logo, is_featured }
        console.log(BrandSubmit)
        setIsLoading(true)
        brandPost(BrandSubmit).then((res) => {
            console.log(BrandSubmit)
            toast.success("Brand Added");

            console.log(res)
        }).catch((err) => {
            console.log(err.message)
        }).finally(() => {
            setIsLoading(false)
        })
        console.log(BrandSubmit)
    }
    return (
        <section className='mainSection'>
            <div className="container">
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
                <div className="mainSectionWrapper">
                    <div className="heading">
                        <img src={pharmacyPicLogo} alt="" />
                        <p>
                            Add Brand
                        </p>
                    </div>
                    <div className="card cardForm">
                        {
                            isLoading ?
                                <Loader /> :
                                <div className="card-body">

                                    <form className="additionForm" onSubmit={formSubmit}>
                                        <div className="row g-4">
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                <div className="fields">
                                                    <div className="profileImage">
                                                        <img
                                                            src={logo ? logo : profileImg}
                                                            alt=""
                                                            className="profileImage"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="doctorName">Brand Name</label>
                                                    <input type="text" id='doctorName' name='name' placeholder='Enter Name...' onChange={getLoginInput} required />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="doctorName">Brand Logo</label>
                                                    <input type="file" id='doctorName' name='logo' className='form-control' onChange={categoryImageSet} required />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="doctorName">Brand Description</label>
                                                    <input type="text" id='doctorName' name='description' placeholder='Enter Description...' onChange={getLoginInput} required />
                                                </div>
                                            </div>
                                            {/* <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                                                <div className="fields">
                                                    <div className="toggleInner">
                                                        Feature
                                                    </div>
                                                    <div className="toggleButton">
                                                        <label className="switch">
                                                            <input type="checkbox" id="adminRightsCheckbox" name='is_featured' onChange={(e) => { setIs_featured(e.target.checked ? 1 : 0) }} />
                                                            <span className="slider round"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div> */}

                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                <div className="fields">
                                                    <button type='Submit'>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                        }

                    </div>
                </div>
            </div>
        </section>
    )
}
