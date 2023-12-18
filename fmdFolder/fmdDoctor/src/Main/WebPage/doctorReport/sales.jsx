import React, { useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import ReportingService from '../../../services/reportingService';
import TokenService from '../../../services/tokenService';

export const Sales = () => {

  const {getStorageData} = TokenService()
  const { getInCompletedOrders, getCompletedOrders } = ReportingService()
  const [doctorId, setDoctorId] = useState(getStorageData().id)
  // const getDoctor = ;
  useEffect(()=>{
    console.log(doctorId, 'doccccc')
  },[])

  const [data, setData] = useState([])
  useEffect(() => {
    getCompletedOrders(doctorId).then((res) => {
      console.log(res.data.data, 'response');
      setData(res.data.data)
    }).catch((res) => {
      console.log(res.data.data, 'error');
    })
  }, [])

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
      item.patient_name.toLowerCase().includes(searchTerm.toLowerCase())
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
                All Orders
              </p>
            </div>
            <div className="card cardForm">
              <div className="card-body">
                <div className="tableSearch tableSearch2">
                  {/* <div className="tableInnerHeading">
                    Physical Doctor
                  </div> */}
                  <p>
                    Completed Orders
                  </p>
                  <input type="text" placeholder="Search..." onChange={handleSearch} />
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Patient Name</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Prescription</th>
                        <th scope="col">Prescribed Medicine</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((item, keyid) => {
                        return (
                          <tr key={keyid}>
                            <td>{item?.id}</td>
                            <td>{item?.patient_name}</td>
                            <td>{item?.fee_collected}</td>
                            <td>{item?.prescription}</td>
                            <td>{item?.prescribed_medicines}</td>
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}
