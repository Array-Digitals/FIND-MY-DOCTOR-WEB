import React, { useEffect, useState } from 'react'
import pharmacyService from '../../../services/pharmacy';
import pharmacyPicLogo from '../../../assets/images/Pharmacy.svg'
import profilePic from "../../../assets/images/guy.png";
import { useParams } from 'react-router';
import { toast, ToastContainer } from "react-toastify";
import { Loader } from '../../Component/loader';
import { imageUrl } from '../../../services/baseUrl';

export const UpdateCategoryForm = () => {
    const { categoryUpdate, getSingleCategory } = pharmacyService();
    const { categoryId } = useParams();
    // let imageUrl = "http://fmd.arraydigitals.com"

    const [categoryData, setCategoryData] = useState({})
    const [image, setCategoryImage] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    // const [linkImg, setLinkImg] = useState('');

    const [apiimage, setApiImage] = useState("")

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
        let categorySubmit;
        if(image){
            categorySubmit = { ...categoryData, image, id: categoryId }
        }
        else{
            categorySubmit = { ...categoryData, id: categoryId }
        }
        console.log(categorySubmit)
        setIsLoading(true)

        categoryUpdate(categorySubmit).then((res) => {
            console.log(res)
            toast.success("Category Updated");

        }).catch((err) => {
            console.log(err.message)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getSingleCategory(categoryId)
            .then((res) => {
                const { id, image, ...restOfResponse } = res?.data?.data[0];
                setCategoryData(restOfResponse)
                setApiImage(res?.data?.data[0]?.image)
            })
            .catch((res) => { console.log(res, 'response'); })
    }, [categoryId])

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
                                Update Category
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
                                                            <img
                                                                src={image ? image : (apiimage ? `${imageUrl}/${apiimage}` : profilePic)}
                                                                alt=""
                                                                className="profileImage"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Category Name</label>
                                                        <input type="text" id='doctorName' name='name' placeholder={categoryData.name} onChange={getLoginInput} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Category Image</label>
                                                        <input type="file" id='doctorName' name='image' className='form-control' onChange={categoryImageSet} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Category Description</label>
                                                        <input type="text" id='doctorName' name='desciption' placeholder={categoryData.description} onChange={getLoginInput} />
                                                    </div>
                                                </div>


                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                    <div className="fields">
                                                        <button type='Submit'>Submit</button>
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
