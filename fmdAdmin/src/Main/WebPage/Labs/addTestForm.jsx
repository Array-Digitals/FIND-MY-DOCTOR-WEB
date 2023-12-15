import React, { useState, useEffect, useRef } from 'react'
import AdminService from '../../../services/adminApi';
import { toast, ToastContainer } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

export const AddTest = () => {


  const { testRegister, getAllTest, deleteTest } = AdminService();
  const formRef = useRef(null);
  const [testData, setTestData] = useState({
    name: "",
  })

  const getLoginInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTestData({ ...testData, [name]: value })
  }

  const formSubmit = (e) => {
    e.preventDefault()
    const testSubmit = { ...testData }
    console.log(testSubmit)
    testRegister(testSubmit).then((res) => {
      console.log(res)
      fetchData();
      toast.success('Test Added');
      formRef.current.reset();
    }).catch((err) => {
      console.log(err.message)
    })
  }

  const [labDeleteEvent, setLabDeleteEvent] = useState(0);

  const [data, setData] = useState([])

  // related to pagination and search of physcial doctor
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


  useEffect(() => {
    fetchData();
  }, [])
  const fetchData = () => {
    getAllTest().then((res) => {
      setData(res?.data?.data)
      console.log(res?.data?.data,'testss');
    })
  }

  const deleteTestHandle = () => {
    deleteTest({ id: labDeleteEvent })
      .then((res) => {
        console.log(res, 'res')
        fetchData()
      })
      .catch((res) => {
        console.log(res, 'res');
      })
  }

  return (
    <React.Fragment>
      <section className='mainSection'>
        <div className="container">
          <div className="mainSectionWrapper">
            <div className="heading">
              <p>
                Add Test
              </p>
            </div>
            <div className="card cardForm">
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
              <div className="card-body">
                <form className="additionForm" onSubmit={formSubmit} ref={formRef}>
                  <div className="row g-4">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                      <div className="fields">
                        <label htmlFor="doctorName">Test Name</label>
                        <input type="text" id='doctorName' name='name' placeholder='Enter Name...' required onChange={getLoginInput} />
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

            <div className="card cardForm lowerCardTable">
              <div className="card-body">
                <div className="tableSearch2">
                  <div className="tableInnerHeading">
                    Manage Test
                  </div>
                  <input type="text" placeholder="Search..." onChange={handleSearch} />
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope='col'>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((item, keyid) => {
                        return (
                          <tr key={keyid}>
                            <td>{item?.id}</td>
                            <td>{item?.name}</td>
                            <td>                            <Link onClick={() => { setLabDeleteEvent(item?.id) }} data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi bi-trash3"></i></Link>
                            </td>
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
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={deleteTestHandle} >Yes</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}
