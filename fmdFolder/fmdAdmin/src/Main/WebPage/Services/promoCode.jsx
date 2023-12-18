import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../utils/Routes';
import promoServices from '../../../services/promos';
import AdminService from '../../../services/adminApi';
import { ToastContainer, toast } from 'react-toastify';
import { Loader } from '../../Component/loader';

export const PromoCode = () => {

    const { getPromoCode, getPromoCodeType, addPromoCode, deletePromoCode } = promoServices()
    const { getAllCity } = AdminService();
    const [data, setData] = useState([]);
    const [promoType, setPromoType] = useState([]);
    const [isLoading, setIsLoading ] = useState(false);


    const fetchData = () => {
        getPromoCode().then((res) => {
            setData(res.data.data)
            console.log(res.data.data, 'response');
        }).catch((res) => {
            console.log(res.data.data, 'error');
        })
        getPromoCodeType().then((res) => {
            setPromoType(res.data.data)
            console.log(res.data.data, 'response');
        }).catch((res) => {
            console.log(res.data.data, 'error');
        })
    }
    useEffect(() => {
        fetchData();
    }, [])

    // related to pagination and search of Promo Code
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
            item.code.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return item;
        }
    }).slice(startIndex, endIndex);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPageNumber(0);
    };

    const [promoData, setPromoData] = useState({
        code: "",
        datefrom: "",
        dateto: "",
        minamount: "",
        percentage: "",
        promo_type: "",
        city: "",
    })

    // console.log(promoData, 'proommm');
    const getInput = (e) => {
        setPromoData({ ...promoData, [e.target.name]: e.target.value })
    }

    const formSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        // console.log(promoData, 'ddddd');
        addPromoCode(promoData)
            .then((res) => {
                console.log(res, 'response');
                toast.success('Promo Added')
                fetchData(); 
            }).catch((res) => {
                console.log(res, 'error');
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const [allCities, setAllCities] = useState([])
    useEffect(() => {
        getAllCity().then((res) => {
            setAllCities(res.data.data)
            console.log(res.data.data, 'response');
        }).catch((res) => {
            console.log(res, 'error');
        })
    }, [])

    const [deleteDoctorEvent, setDeleteDoctor] = useState(null)

    const deleteBeneficiary = () => {
        // let data = JSON.stringify({
        //     "id": deleteDoctorEvent
        // });
        console.log({id:deleteDoctorEvent});
        deletePromoCode({id:deleteDoctorEvent}).then((res) => {
            console.log(res, 'responseeee')
            fetchData();
        }).catch((res) => {
            console.log(res.message)
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
                                Add Promo
                            </p>
                        </div>
                        {
                            isLoading ?
                                <Loader />
                                :
                                <div className="card cardForm">
                                    <div className="card-body">
                                        <form className="additionForm" onSubmit={formSubmit}>
                                            <div className="row g-4">
                                                {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label >Promo Name</label>
                                                <input type="text" name='name' placeholder='Enter Name...' onChange={getInput} required />
                                            </div>
                                        </div> */}
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label >Promo Code</label>
                                                        <input type="text" name='code' placeholder='Enter Code...' required onChange={getInput} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label >On Amount</label>
                                                        <input type="number" name='minamount' placeholder='Enter minimum amount...' required onChange={getInput} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label >Starting Date</label>
                                                        <input type="datetime-local" name='datefrom' required onChange={getInput} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label >End Date</label>
                                                        <input type="datetime-local" name='dateto' required onChange={getInput} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label >Percentage</label>
                                                        <input type="number" name='percentage' placeholder='Enter Percentage...' required onChange={getInput} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label >City</label>
                                                        <select name="city" id="" onChange={getInput} required >
                                                            <option value="">Select City</option>
                                                            {
                                                                allCities.map((item, keyId) => {
                                                                    return (

                                                                        <option key={keyId} value={item.id}>{item.name}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label >Promo For</label>
                                                        <select name="promo_type" id="" onChange={getInput} required >
                                                            <option value="">Select Option</option>
                                                            {
                                                                promoType.map((item, keyId) => {
                                                                    return (

                                                                        <option key={keyId} value={item.id}>{item.name}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
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

                    </div>
                    <div className="mainSectionWrapper spaceMainSectionWrapper">
                        <div className="heading">
                            <p>
                                Manage Promo
                            </p>
                        </div>
                        <div className="card cardForm">
                            <div className="card-body">
                                <div className="tableSearch">

                                    <input type="text" placeholder="Search..." onChange={handleSearch} />
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Promo ID</th>
                                                <th scope="col">Code</th>
                                                <th scope="col">Promo For</th>
                                                <th scope="col">Starting Date</th>
                                                <th scope="col">End Date</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Percentage</th>
                                                {/* <th scope="col">Actions</th> */}


                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.map((item, keyid) => {
                                                return (
                                                    <tr key={keyid}>
                                                        <td>{item?.id}</td>
                                                        <td>{item?.code}</td>
                                                        <td>{item?.promo_for}</td>
                                                        <td>{item?.datefrom}</td>
                                                        <td>{item?.dateto}</td>
                                                        <td>{item?.minamount}</td>
                                                        <td>{item?.percentage}</td>
                                                        {/* <td>
                                                            <Link onClick={() => { setDeleteDoctor(item?.id) }} data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi bi-trash3"></i></Link> </td> */}
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
