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


export const SpecilistCategory = () => {

  const { addSpecilitY, getAllSpecialistCategory, deleteSpecialistCategory } = AdminService();
  const [image, setSpecilistImage] = useState();
  const [data, setAllCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const [speclistData, setSpeclistData] = useState({
    title: "",
    description: "",
    consultation_type: "2",
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
    const specialistDataPost = { ...speclistData, image }
    console.log(specialistDataPost, "doctorRegisterData");

    addSpecilitY(specialistDataPost).then((res) => {
      console.log(res)
      fetchData()
      toast.success('Category Added')
    }).catch((err) => {
      console.log(err, "Doctor Register Error")
    }).finally(() => {
      setIsLoading(false)
    })
  }





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

  const deleteCategory = (itemId) => {
    deleteSpecialistCategory({ id: itemId }).then((res) => {
      console.log(res, 'res');
      fetchData()
    }).catch((res) => {
      console.log(res, 'err');
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    getAllSpecialistCategory().then((res) => {
      setAllCategories(res?.data?.data)
    }).catch((res) => {
      console.log(res)
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
              <img src={DoctorLogoImg} alt="" />

              <p>
                Add Online Category
              </p>
            </div>
            {isLoading
              ?
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
                              src={image ? image : profilePic}
                              alt=""
                              className="profileImage"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                        <div className="fields">
                          <label htmlFor="doctorImage">Image</label>
                          <input type="file" className='form-control' id='doctorImage' name='image' onChange={setConImage} required />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                        <div className="fields">
                          <label htmlFor="doctorName">Category</label>
                          <input type="text" id='doctorName' name='title' placeholder='Enter Category...' onChange={getLoginInput} required />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                        <div className="fields">
                          <label htmlFor="doctorEmail">Description</label>
                          <input type="text" id='doctorEmail' name='description' placeholder='Enter Description...' onChange={getLoginInput} required />
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
          <div className="mainSectionWrapper spaceMainSectionWrapper">
            <div className="heading">
              <img src={DoctorLogoImg} alt="" />
              <p>
                Manage Categories
              </p>
            </div>
            <div className="card cardForm">
              <div className="card-body">

                <>



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
                                  <td>
                                    <Link to={`/${ROUTES?.SPECIALIST_DOCTOR_UPDATE}/${item?.id}`}><i className="bi bi-pen"></i></Link>
                                    <Link onClick={() => { deleteCategory(item?.id) }}><i className="bi bi-trash3"></i></Link> </td>
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
                </>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
