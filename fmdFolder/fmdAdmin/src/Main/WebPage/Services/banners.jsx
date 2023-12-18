import React, { useEffect, useState } from 'react'
import portalServices from '../../../services/portalServices'
import ReactPaginate from 'react-paginate';
import { imageUrl } from '../../../services/baseUrl';
import bannerImage from '../../../assets/images/contactUsDesk.jpg'
import { Loader } from "../../Component/loader";
import { ToastContainer, toast } from 'react-toastify';

export const Banners = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [deleteDoctorEvent, setDeleteDoctor] = useState(null)
  const { bannerPost, bannerAllGet, bannerDelete } = portalServices();
  const [bannerData, setBannerData] = useState({
    description: "",
    image: ""
  })

  const getUserInput = (e) => {

    const fieldName = e.target.name;
    let fieldValue = e.target.value;

    if (fieldName === 'image') {

      let fieldFile = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(fieldFile);
      reader.onload = () => {
        // setdoctorImage(reader.result);
        setBannerData({ ...bannerData, [fieldName]: reader.result })
      };
    }
    else {
      setBannerData({ ...bannerData, [fieldName]: fieldValue })
    }
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)

    console.log(bannerData, 'BANNER DATA');
    bannerPost(bannerData).then((res) => {
      console.log(res, 'response');
      toast.success('Banner Added')
    }).catch((res) => {
      console.log(res, 'error');
      toast.success('Banner Failed to Add')
    }).finally(() => {
      setIsLoading(false)
      fetchData();
    })
  }


  const [data2, setData2] = useState([]);

  const [searchTerm2, setSearchTerm2] = useState('');
  const [pageNumber2, setPageNumber2] = useState(0);
  const handlePageClick2 = (data2) => {
    const selectedPage2 = data2.selected;
    setPageNumber2(selectedPage2);
  };
  const itemsPerPage2 = 8;
  const startIndex2 = pageNumber2 * itemsPerPage2;
  const endIndex2 = startIndex2 + itemsPerPage2;
  const pageCount2 = Math.ceil(data2.length / itemsPerPage2);
  const currentItems2 = data2.filter((item) => {
    if (searchTerm2 === '') {
      return item;
    } else if (
      item.name.toLowerCase().includes(searchTerm2.toLowerCase())
    ) {
      return item;
    }
  }).slice(startIndex2, endIndex2);
  const handleSearch2 = (event) => {
    setSearchTerm2(event.target.value);
    setPageNumber2(0);
  };

  const deleteBeneficiary = () => {
    let data = JSON.stringify({
      "id": deleteDoctorEvent
    });

    bannerDelete(data).then((res) => {
      console.log(res)
      fetchData();
    }).catch((res) => {
      console.log(res.message)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = () => {
    bannerAllGet().then((res) => {
      console.log(res, 'response');
      setData2(res.data.data)
    }).catch((res) => {
      console.log(res, 'error');
    })
  }



  return (
    <React.Fragment>
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
              <p>
                Add Banner
              </p>
            </div>
            {
              isLoading
                ?
                <Loader />
                :
                <div className="card cardForm">
                  <div className="card-body">
                    <form className="additionForm" onSubmit={onFormSubmit}>
                      <div className="row g-4">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label >Choose Banner Location</label>
                            <select name="description" id="" onChange={getUserInput} required>

                              <option value="">Select Screen</option>

                              <option value="home">Web Home Screen</option>
                              <option value="insurance">Web Insurance Screen</option>
                              <option value="lab">Web Lab Screen</option>
                              <option value="doctor">Web Doctor Screen</option>
                              <option value="pharmacy">Web Pharmacy Screen</option>
                              <option value="pharmacy_offer">Web Pharmacy Offer</option>

                              <option value="mob_home">Mob Home Screen</option>
                              <option value="mob_insurance">Mob Insurance Screen</option>
                              <option value="mob_lab">Mob Lab Screen</option>
                              <option value="mob_doctor">Mob Doctor Screen</option>
                              <option value="mob_pharmacy">Mob Pharmacy Screen</option>
                              <option value="mob_pharmacy_offer">Mob Pharmacy Offer</option>

                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label >Update Banner</label>
                            <input className="form-control" type="file" name='image' required onChange={getUserInput} />
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
            }

            <div className="card cardForm lowerCardTable">
              <div className="card-body">
                <div className="tableSearch2">
                  <div className="tableInnerHeading">
                    Banners
                  </div>
                  <input type="text" placeholder="Search..." onChange={handleSearch2} />
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems2.map((item, keyid) => {
                        return (
                          <tr key={keyid}>
                            <td>{item?.id}</td>
                            <td>{item?.name}</td>
                            <td> <img className='bannerImages' src={`${imageUrl}/${item?.image}`} alt="" />  </td>
                            {/* <td><div className='bannerImage'> <img src={bannerImage} alt=""/> </div></td> */}
                            <td><button onClick={() => { setDeleteDoctor(item?.id) }} data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi bi-trash3" /></button></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <ReactPaginate
                  pageCount={pageCount2}
                  onPageChange={handlePageClick2}
                  containerClassName={'pagination'}
                  activeClassName={'active'}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

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
    </React.Fragment>
  )
}
