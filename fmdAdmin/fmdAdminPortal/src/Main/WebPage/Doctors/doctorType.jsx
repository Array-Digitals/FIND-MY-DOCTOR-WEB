import React, { useState, useRef, useEffect } from 'react'

import AdminService from '../../../services/adminApi'
import DoctorLogoImg from '../../../assets/images/Doctor.svg'
import profilePic from '../../../assets/images/guy.png'
import dataNotFound from '../../../assets/images/noData1.png'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../utils/Routes';
import { Loader } from '../../Component/loader'


export const DoctorTypeCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { addDoctorType, getAllCategories, deleteDoctorType } = AdminService()
  const [image, setTypeImage] = useState();
  const [data, setAllCategories] = useState([])
  const [docTypeData, setDocTypeData] = useState({
    title: "",
    description: "",
    consultation_type: "1",
    fee: 0,
  })

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

  const submitForm = (e) => {
    e.preventDefault();
    const docTypeDataPost = { ...docTypeData, image }
    setIsLoading(true);
    console.log(docTypeDataPost, "doctorRegisterData");
    addDoctorType(docTypeDataPost).then((res) => {
      console.log(res?.data?.data)
      toast.success("Category Added");
      setTypeImage();
      formRef.current.reset();
    }).catch((err) => {
      console.log(err, "Doctor Register Error")
    }).finally(() => {
      setIsLoading(false)
    })
  }


  useEffect(() => {
    getAllCategories().then((res) => {
      setAllCategories(res?.data?.data)
    }).catch((res) => {
      console.log(res)
    })
  }, [data])


  const [pageNumber, setPageNumber] = useState(0);
  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPageNumber(selectedPage);
  };

  const itemsPerPage = 8;
  const startIndex = pageNumber * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.filter((item) => {
    if (searchTerm === '') {
      return item;
    } else if (
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return item;
    }
  }).slice(startIndex, endIndex);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPageNumber(0);
  };

  const deleteDoctorCategory = itemId => {
    deleteDoctorType({ id: itemId }).then((res) => {
      console.log(res, 'res');
    }).catch((err) => {
      console.log(err, 'err');
    })
  }

  return (
    <>
      <section className='mainSection'>
        <div className="container">
          <div className="mainSectionWrapper">
            <div className="heading">
              <img src={DoctorLogoImg} alt="" />
              <p>
                Add Physical Category
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

                  <form className="additionForm" ref={formRef} onSubmit={submitForm}>
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
                          <label htmlFor="doctorImage">Image</label>
                          <input type="file" className='form-control' id='doctorImage' name='image' onChange={setConImage} />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                        <div className="fields">
                          <label htmlFor="doctorName">Category</label>
                          <input type="text" id='doctorName' name='title' placeholder='Enter Category...' onChange={getLoginInput} />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                        <div className="fields">
                          <label htmlFor="doctorEmail">Description</label>
                          <input type="text" id='doctorEmail' name='description' placeholder='Enter Description...' onChange={getLoginInput} />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                        <div className="fields">
                          <label htmlFor="doctorEmail">Fees</label>
                          <input type="number" id='doctorEmail' name='fees' placeholder='Enter fees...' onChange={getLoginInput} />
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
          <div className="mainSectionWrapper spaceMainSectionWrapper">
            <div className="heading">
              <img src={DoctorLogoImg} alt="" />
              <p>
                Manage Categories
              </p>
            </div>
            <div className="card cardForm">
              <div className="card-body">
                {currentItems ?


                  <>

                    <div className="tableSearch">
                      <input type="text" placeholder="Search..." onChange={handleSearch} />
                    </div>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Fee</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((item, keyid) => {
                            return (
                              <tr key={keyid}>
                                <td>{item?.id}</td>
                                <td>{item?.title}</td>
                                <td>{item?.description}</td>
                                <td>{item?.fee}</td>
                                <td>
                                  <Link to={`/${ROUTES?.CATEGORY_DOCTOR_UPDATE}/${item?.id}`}><i className="bi bi-pen"></i></Link>
                                  <Link onClick={() => { deleteDoctorCategory(item?.id) }}><i className="bi bi-trash3"></i></Link> </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <ReactPaginate
                      pageCount={pageCount}
                      onPageChange={handlePageClick}
                      containerClassName={'pagination'}
                      activeClassName={'active'}
                    />
                  </>
                  :
                  <div className="dataNotFoundDiv">
                    <img className='dataNotFoundImg' src={dataNotFound} alt="" />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
