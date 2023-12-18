import React, { useState } from 'react'
import pharmacyService from '../../../services/pharmacy';
import pharmacyPicLogo from '../../../assets/images/Pharmacy.svg'
import profilePic from "../../../assets/images/guy.png";
import { toast, ToastContainer } from "react-toastify";
import { Loader } from '../../Component/loader';



export const CategoryForm = () => {
    const { categoryPost } = pharmacyService();
    const [isLoading, setIsLoading] = useState(false);

    const [categoryData, setCategoryData] = useState({
        name: "",
        description: ""
    })
    const [image, setCategoryImage] = useState("")
    // console.log(image, "catImg");

    const getLoginInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCategoryData({ ...categoryData, [name]: value })
    }
    const categoryImageSet = e => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setCategoryImage(reader.result);
        };
    }
    const formSubmit = (e) => {
        e.preventDefault();
        const categorySubmit = { ...categoryData, image }
        console.log(categorySubmit)
        setIsLoading(true)

        toast.success("Category Added");

        categoryPost(categorySubmit).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err.message)
        }).finally(() => {
            setIsLoading(false)
        })

    }
    return (
        <>
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
                            <img src={pharmacyPicLogo} alt="" />
                            <p>
                                Add Category
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
                                                                src={image ? image : profilePic}
                                                                alt=""
                                                                className="profileImage"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Category Name</label>
                                                        <input type="text" id='doctorName' name='name' placeholder='Enter Name...' onChange={getLoginInput} required />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Category Image</label>
                                                        <input type="file" id='doctorName' name='image' className='form-control' onChange={categoryImageSet} required />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Category Description</label>
                                                        <input type="text" id='doctorName' name='description' placeholder='Enter Description...' onChange={getLoginInput} required />
                                                    </div>
                                                </div>


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
        </>
    )
}
