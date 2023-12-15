import React, { useState, useEffect, useRef } from 'react'
import ReactPaginate from 'react-paginate';
import pharmacyService from '../../../services/pharmacy';
import pharmacyPicLogo from '../../../assets/images/Pharmacy.svg'
import { Link } from 'react-router-dom';
import AdminService from '../../../services/adminApi';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dataNotFound from '../../../assets/images/noData.png'



export const Cities = () => {

  const formRef = useRef(null);

  const { cityPost, getAllCity, cityDelete } = AdminService();
  const [data, setProductData] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [cityData, setCityData] = useState({
    name: "",
  })

  const getLoginInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCityData({ ...cityData, [name]: value })
  }

  const formSubmit = (e) => {
    e.preventDefault()
    const citySubmit = { ...cityData }
    console.log(citySubmit)
    cityPost(citySubmit).then((res) => {
      console.log(res)
      toast.success("City Added");
      formRef.current.reset();
    }).catch((err) => {
      console.log(err.message)
    })
  }



  useEffect(() => {
    fetchData();
  }, [data])


  const fetchData = () => {
    getAllCity().then((res) => {
      setProductData(res?.data?.data)
    }).catch((res) => {
      console.log(res)
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
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return item;
    }
  }).slice(startIndex, endIndex);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPageNumber(0);
  };

  const [deleteDoctorEvent, setDeleteDoctor] = useState(null)

  const deleteBeneficiary = () => {
    let data = JSON.stringify({
      "id": deleteDoctorEvent
    });

    console.log(data, 'dataaa');
    cityDelete(data).then((res) => {
      console.log(res)
      fetchData();
    }).catch((res) => {
      console.log(res.message)
    })
  }


  return (
    <React.Fragment>
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
              <p>
                Add City
              </p>
            </div>
            <div className="card cardForm">
              <div className="card-body">
                <form ref={formRef} className="additionForm" onSubmit={formSubmit}>
                  <div className="row g-4">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                      <div className="fields">
                        <label >City Name</label>
                        <input type="text" name='name' placeholder='Enter City...' required onChange={getLoginInput} />
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                      <div className="fields">
                        <button type='Submit' >Submit</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="mainSectionWrapper spaceMainSectionWrapper">
            <div className="heading">
              <img src={pharmacyPicLogo} alt="" />
              <p>
                Manage Cities
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
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((item, keyid) => {
                            return (
                              <tr key={keyid}>
                                <td>{item?.id}</td>
                                <td>{item.name}</td>
                                <td><Link onClick={() => { setDeleteDoctor(item?.id) }} data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi bi-trash3"></i></Link> </td>
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

          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Do You want to delete?</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  Are You sure?
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={deleteBeneficiary} >Yes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}
