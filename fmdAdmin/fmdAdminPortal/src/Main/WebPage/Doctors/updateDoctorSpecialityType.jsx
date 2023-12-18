import React, { useState, useRef, useEffect } from 'react'

import AdminService from '../../../services/adminApi'
import DoctorLogoImg from '../../../assets/images/Doctor.svg'
import profilePic from '../../../assets/images/guy.png'
import dataNotFound from '../../../assets/images/noData1.png'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from 'react-paginate';
import { Link, useParams } from 'react-router-dom';
import { ROUTES } from '../../../utils/Routes';
import { Loader } from '../../Component/loader'
import { imageUrl } from '../../../services/baseUrl'


export const UpdateDoctorTypeCategory = () => {
    const { categoryId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const formReference = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { addDoctorType, getAllCategories, doctorTypeUpdate, getSingleCategories, deleteDoctorType } = AdminService()
    const [image, setTypeImage] = useState();
    const [data, setAllCategories] = useState([])
    const [docTypeImage, setDocTypeImage] = useState({
        image: ""
    })
    const [docTypeData, setDocTypeData] = useState({})

    const getLoginInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDocTypeData({ ...docTypeData, [name]: value })
    }

    const setConImage = e => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setTypeImage(reader.result);
        };
    }

    // let imageUrl = "http://fmd.arraydigitals.com"


    const submitForm = (e) => {
        e.preventDefault();
        const docTypeDataPost = { ...docTypeData, image, id: categoryId }
        setIsLoading(true);
        console.log(docTypeDataPost, "doctorRegisterData");
        doctorTypeUpdate(docTypeDataPost).then((res) => {
            // console.log(res, "ress")
            toast.success("Category Updated");
            setTypeImage();
            formReference.current.reset();
        }).catch((err) => {
            console.log(formReference, 'gorasdasd');
            toast.error("Category Failed to Update");
            console.log(err, "Doctor Register Error")
        }).finally(() => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getSingleCategories(categoryId).then((res) => {
            console.log(res?.data?.data, 'response');
            const doctorTypeData = { ...res?.data?.data[0] };

            // Rename the 'fee' property to 'fees'
            const { fee, ...restOfData } = doctorTypeData;
            const fees = fee;

            setDocTypeData({ ...restOfData, fees });
            setDocTypeImage({ ...docTypeImage, image: res?.data?.data[0]?.image });
        }).catch((res) => {
            console.log(res)
        })
    }, [categoryId, isLoading])


    // console.log(categoryId,'CAT');


    return (
        <>
            <section className='mainSection'>
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <img src={DoctorLogoImg} alt="" />
                            <p>
                                Update Onsite Category
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

                                <form className="additionForm" ref={formReference} onSubmit={submitForm}>
                                    {isLoading ?
                                        <Loader />
                                        :
                                        <div className="row g-4">
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                <div className="fields">
                                                    <div className="profileImage">
                                                        <img
                                                            src={image ? image : (docTypeImage.image ? `${imageUrl}/${docTypeImage.image}` : profilePic)}
                                                            alt=""
                                                            className="profileImage"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="doctorImage">Image</label>
                                                    <input type="file" className='form-control' id='doctorImage' name='image' onChange={setConImage} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="doctorName">Category</label>
                                                    <input type="text" id='doctorName' name='title' placeholder={docTypeData.title} onChange={getLoginInput} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="doctorEmail">Description</label>
                                                    <input type="text" id='doctorEmail' name='description' placeholder={docTypeData.description} onChange={getLoginInput} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="doctorEmail">Fees</label>
                                                    <input type="number" id='doctorEmail' name='fees' placeholder={docTypeData.fees} onChange={getLoginInput} />
                                                </div>
                                            </div>

                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                <div className="fields">
                                                    <button type='Submit'>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </form>

                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}
