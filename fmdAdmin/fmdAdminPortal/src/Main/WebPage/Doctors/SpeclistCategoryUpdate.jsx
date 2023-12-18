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
import { data } from 'jquery'
import { imageUrl } from '../../../services/baseUrl'

export const UpdateSpecilistCategory = () => {

  const { specialistId } = useParams();
  // let imageUrl = "http://fmd.arraydigitals.com"


  const { addSpecilitY, patchSpecilitY, getSingleSpecialistCategory, deleteSpecialistCategory } = AdminService();
  const [image, setSpecilistImage] = useState();
  // const [data, setAllCategories] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const [speclistData, setSpeclistData] = useState({
    title: "",
    description: "",
    consultation_type: "2",
  })
  const [speclistImage, setSpeclistImage] = useState({
    image: ""
  })


  const getLoginInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSpeclistData({ ...speclistData, [name]: value })
  }

  const setConImage = e => {
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSpecilistImage(reader.result);
    };
  }

  const submitForm = (e) => {
    setIsLoading(true)
    e.preventDefault();
    const specialistDataPost = { ...speclistData, image, id: specialistId }
    console.log(specialistDataPost, "doctorRegisterData");
    patchSpecilitY(specialistDataPost).then((res) => {
      toast.success("Category Updated");
      console.log(res)
    }).catch((err) => {
      toast.error("Category Failed to Update");
      console.log(err, "Doctor Register Error")
    }).finally(() => {
      setIsLoading(false)
    })
  }

  useEffect(() => {
    getSingleSpecialistCategory(specialistId).then((res) => {
      console.log(res?.data?.data, 'response');
      const specialistData = { ...res?.data?.data[0] };
      const { image, ...restOfData } = specialistData;
      setSpeclistData(restOfData);
      setSpeclistImage({ ...speclistImage, image: res?.data?.data[0]?.image });
    }).catch((res) => {
      console.log(res)
    })
  }, [specialistId])

  return (
    <>
      <section className='mainSection'>
        <div className="container">
          <div className="mainSectionWrapper">
            <div className="heading">
              <img src={DoctorLogoImg} alt="" />

              <p>
                Update Online Category
              </p>
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
            </div>
            {
              isLoading ?
                <Loader />
                :
                <div className="card cardForm">
                  <div className="card-body">
                    <form className="additionForm" onSubmit={submitForm}>
                      <div className="row g-4">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                          <div className="fields">
                            <div className="profileImage">
                              <img
                                src={image ? image : (speclistImage.image ? `${imageUrl}/${speclistImage.image}` : profilePic)}
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
                            <input type="text" id='doctorName' name='title' placeholder={speclistData.title} onChange={getLoginInput} />
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label htmlFor="doctorEmail">Description</label>
                            <input type="text" id='doctorEmail' name='description' placeholder={speclistData.description} onChange={getLoginInput} />
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
                </div>
            }

          </div>
        </div>
      </section>
    </>
  )
}
