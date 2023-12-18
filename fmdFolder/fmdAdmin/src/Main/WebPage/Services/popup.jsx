import React, { useState, useEffect, useRef } from 'react'
import ReactPaginate from 'react-paginate';
import pharmacyService from '../../../services/pharmacy';
import pharmacyPicLogo from '../../../assets/images/Pharmacy.svg'
import { Link } from 'react-router-dom';
import AdminService from '../../../services/adminApi';
import { toast, ToastContainer } from "react-toastify";
import dataNotFound from '../../../assets/images/noData.png'
import "react-toastify/dist/ReactToastify.css";

export const PopupService = () => {
    const [data, setProductData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
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
    return (
        <React.Fragment>
            <section className='mainSection'>
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <p>
                                Add Popup
                            </p>
                        </div>
                        <div className="card cardForm">
                            <div className="card-body">
                                <form className="additionForm" >
                                    <div className="row g-4">
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label >Title</label>
                                                <input type="text" name='name' placeholder='Enter City...' required />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label >Description</label>
                                                <input type="text" name='name' placeholder='Enter City...' required />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label >Link</label>
                                                <input type="text" name='name' placeholder='Enter City...' required />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label >Background Image</label>
                                                <input type="file" className='form-control' name='name' placeholder='Enter City...' required />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label >Start Time</label>
                                                <input type="time" name='name' placeholder='Enter City...' required />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label >End Time</label>
                                                <input type="time" name='name' placeholder='Enter City...' required />
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
              {/* <img src={pharmacyPicLogo} alt="" /> */}
              <p>
                Manage Popup
              </p>
            </div>
            <div className="card cardForm">
              <div className="card-body">
                {!data.length === 0 ?


                  <>

                    <div className="tableSearch">
                      <input type="text" placeholder="Search..." onChange={handleSearch} />
                    </div>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((item, keyid) => {
                            return (
                              <tr key={keyid}>
                                <td>{item?.id}</td>
                                <td>{item.name}</td>
                                <td><Link ><i className="bi bi-pen"></i></Link> <Link href=""><i className="bi bi-trash3"></i></Link> </td>
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
        </React.Fragment>
    )
}
