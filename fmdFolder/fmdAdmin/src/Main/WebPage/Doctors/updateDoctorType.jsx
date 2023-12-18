// import React, { useEffect, useRef, useState } from 'react'
// import { toast, ToastContainer } from "react-toastify";
// import profilePic from '../../../assets/images/guy.png'
// import "react-toastify/dist/ReactToastify.css";
// import DoctorLogoImg from '../../../assets/images/Doctor.svg'
// import AdminService from '../../../services/adminApi';
// import { useNavigate } from 'react-router';
// import { useParams } from "react-router";



// export const UpdateDoctorType = () => {
//     const baseUrl = 'http://fmd.arraydigitals.com/'
//     const navigate = useNavigate();
//     const formRef = useRef(null);
//     let { physicalCategoryId } = useParams();

//     const { addDoctorType, getSingleCategories, doctorTypeUpdate } = AdminService()
//     const [image, setTypeImage] = useState();
//     const [docTypeData, setDocTypeData] = useState({
//         title: "",
//         description: "",
//         consultation_type: "1",
//         fee: 0,
//     })
//     const getLoginInput = (e) => {
//         const name = e.target.name;
//         const value = e.target.value;
//         const updatedValue = name === 'fee' ? parseInt(value) : value;
//         setDocTypeData({ ...docTypeData, [name]: updatedValue })
//     }

//     const setConImage = e => {
//         const file = e.target.files[0]
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => {
//             setTypeImage(reader.result);
//         };
//     }

//     const submitForm = (e) => {
//         e.preventDefault();
//         const docTypeDataPost = { ...docTypeData, image, id: physicalCategoryId }
//         console.log(docTypeDataPost, "doctorRegisterData");
//         doctorTypeUpdate(docTypeDataPost).then((res) => {
//             console.log(res?.data?.data)
//             toast.success("Category Added");
//             setTypeImage();
//             formRef.current.reset();
//         }).catch((err) => {
//             console.log(err, "Doctor Register Error")
//         })
//     }
//     useEffect(()=>{
//         console.log(docTypeData,'usssssssss');
//     },[docTypeData])
//     useEffect(() => {   
//         getSingleCategories(physicalCategoryId).then((res) => {
//             const data = res?.data?.data[0];
//             const consultationTypeString = data?.consultation_type.toString();
//             setDocTypeData({...data,  consultation_type:consultationTypeString})
//             console.log(res, "docData");
//         }).catch((res) => {
//             console.log(res);
//         })
//     }, [image])

//     return (
//         <React.Fragment>
//             <section className='mainSection'>
//                 <div className="container">
//                     <div className="mainSectionWrapper">
//                         <div className="heading">
//                             <p>
//                                 <button className='navigateBackButton' onClick={() => { navigate(-1) }}><i className="ri-arrow-left-line"></i></button>    Update Physical Category
//                             </p>
//                         </div>
//                         <div className="card cardForm">
//                             <div className="card-body">
//                                 <ToastContainer
//                                     position="top-center"
//                                     autoClose={5000}
//                                     hideProgressBar={false}
//                                     newestOnTop={false}
//                                     closeOnClick
//                                     rtl={false}
//                                     pauseOnFocusLoss
//                                     draggable
//                                     pauseOnHover
//                                     theme="light"
//                                 />
//                                 <form className="additionForm" ref={formRef} onSubmit={submitForm}>
//                                     <div className="row g-4">
//                                         <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
//                                             <div className="fields">
//                                                 <div className="profileImage">
//                                                     <img
//                                                         src={image ?  image : `${baseUrl}${docTypeData?.image}` }
//                                                         alt=""
//                                                         className="profileImage"
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
//                                             <div className="fields">
//                                                 <label htmlFor="doctorImage">Image</label>
//                                                 <input type="file" className='form-control' id='doctorImage' name='image' onChange={setConImage} />
//                                             </div>
//                                         </div>
//                                         <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
//                                             <div className="fields">
//                                                 <label htmlFor="doctorName">Category</label>
//                                                 <input type="text" id='doctorName' name='title' placeholder={docTypeData?.title} onChange={getLoginInput} />
//                                             </div>
//                                         </div>
//                                         <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
//                                             <div className="fields">
//                                                 <label htmlFor="doctorEmail">Description</label>
//                                                 <input type="text" id='doctorEmail' name='description' placeholder={docTypeData?.description} onChange={getLoginInput} />
//                                             </div>
//                                         </div>
//                                         <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
//                                             <div className="fields">
//                                                 <label htmlFor="doctorEmail">Fees</label>
//                                                 <input type="number" id='doctorEmail' name='fee' placeholder={docTypeData?.fee} onChange={getLoginInput} />
//                                             </div>
//                                         </div>
//                                         <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
//                                             <div className="fields">
//                                                 <button type='Submit'>Submit</button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </React.Fragment>
//     )
// }
