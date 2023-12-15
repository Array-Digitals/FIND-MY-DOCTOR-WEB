import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import insurancePicLogo from '../../../assets/images/Insurance.svg'
import insuranceService from '../../../services/insurance';
import { ROUTES } from '../../../utils/Routes';
import ReactPaginate from 'react-paginate';
import TokenService from '../../../services/tokenService';
import { ToastContainer } from 'react-toastify';

// import self from '../ '

export const InsuranceProviderBooking = () => {

    const { getStorageData } = TokenService();
    const localData = getStorageData();
    const { insuranceProviderBookingGet, bookingVerifyPatch } = insuranceService();
    const [data, setData] = useState();
    const [data2, setData2] = useState();

    // console.log(localData.id, 'local');

    const fetchData = () => {

        insuranceProviderBookingGet(0).then((res) => {
            console.log(res?.data?.data, 'data');
            setData(res?.data?.data)
        }).catch((res) => {
            console.log(res, 'error');
        })

        insuranceProviderBookingGet(1).then((res) => {
            console.log(res?.data?.data, 'data');
            setData2(res?.data?.data)
        }).catch((res) => {
            console.log(res, 'error');
        })
    }
    useEffect(() => {
        fetchData(localData.id);
    }, [localData.id])





    const [pageNumber, setPageNumber] = useState(0);
    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setPageNumber(selectedPage);
    };

    const [searchTerm, setSearchTerm] = useState('');

    const itemsPerPage = 8;
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageCount = Math.ceil(data?.length / itemsPerPage);
    const currentItems = data?.filter((item) => {
        if (searchTerm === '') {
            return item;
        } else if (
            item.provider_name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return item;
        }
    }).slice(startIndex, endIndex);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPageNumber(0);
    };




    const [pageNumber2, setPageNumber2] = useState(0);
    const handlePageClick2 = (data) => {
        const selectedPage = data.selected;
        setPageNumber2(selectedPage);
    };

    const [searchTerm2, setSearchTerm2] = useState('');

    const itemsPerPage2 = 8;
    const startIndex2 = pageNumber2 * itemsPerPage2;
    const endIndex2 = startIndex2 + itemsPerPage2;
    const pageCount2 = Math.ceil(data2?.length / itemsPerPage2);
    const currentItems2 = data2?.filter((item) => {
        if (searchTerm2 === '') {
            return item;
        } else if (
            item.user_name.toLowerCase().includes(searchTerm2.toLowerCase())
        ) {
            return item;
        }
    }).slice(startIndex2, endIndex2);
    const handleSearch2 = (event) => {
        setSearchTerm2(event.target.value);
        setPageNumber2(0);
    };

    const [idForVerify, setIdForVerify] = useState(null)
    const verifyBooking = () => {
        const data = {
            id: idForVerify,
            is_verified: 1
        }
        bookingVerifyPatch(data).then((res) => {
            console.log(res, 'response');
            fetchData();
        }).catch((res) => {
            console.log(res, 'error');
        })
    }

    useEffect(() => {
        if (idForVerify) {
            verifyBooking();
        }
    }, [idForVerify])

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
                            <img src={insurancePicLogo} alt="" />
                            <p>
                                Your Booking
                            </p>
                        </div>
                        <div className="card cardForm">
                            <div className="card-body">
                                <div className="tableSearch2">
                                    <div className="tableInnerHeading">
                                        Not Verified
                                    </div>
                                    <input type="text" placeholder="Search..." onChange={handleSearch} />
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>

                                                <th scope="col">Recepient ID</th>
                                                <th scope="col">Recepient Name</th>
                                                <th scope="col">Recepient Email</th>
                                                <th scope="col">Package Name</th>
                                                <th scope="col">Package For</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Annual Cost</th>
                                                <th scope="col">Verification</th>
                                                <th scope="col">Verify</th>

                                                {/* <th scope="col">Details</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems?.map((item, keyid) => {
                                                return (
                                                    <tr key={keyid}>

                                                        <td>{item.recepient}</td>
                                                        <td>{item.user_name}</td>
                                                        <td>{item.user_email}</td>
                                                        <td>{item.plan_name}</td>
                                                        <td>{item.for_parents == 1 ? 'Parents' : 'Children'}</td>
                                                        <td>{item.amount}</td>
                                                        <td>{item.annual_cost}</td>
                                                        <td>{item.is_verified == 0 ? "Not Verified" : "Verified"}</td>
                                                        <td>
                                                            <button onClick={() => setIdForVerify(item.id)} >Verify</button>
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
                        <div className="card cardForm lowerCardTable">
                            <div className="card-body">
                                <div className="tableSearch2">
                                    <div className="tableInnerHeading">
                                        Verified
                                    </div>
                                    <input type="text" placeholder="Search..." onChange={handleSearch2} />
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>

                                                <th scope="col">Recepient ID</th>
                                                <th scope="col">Recepient Name</th>
                                                <th scope="col">Recepient Email</th>
                                                <th scope="col">Package Name</th>
                                                <th scope="col">Package For</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Annual Cost</th>
                                                <th scope="col">Verification</th>
                                                {/* <th scope="col">Verify</th> */}

                                                {/* <th scope="col">Details</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems2?.map((item, keyid) => {
                                                return (
                                                    <tr key={keyid}>

                                                        <td>{item.recepient}</td>
                                                        <td>{item.user_name}</td>
                                                        <td>{item.user_email}</td>
                                                        <td>{item.plan_name}</td>
                                                        <td>{item.for_parents == 1 ? 'Parents' : 'Children'}</td>
                                                        <td>{item.amount}</td>
                                                        <td>{item.annual_cost}</td>
                                                        <td>{item.is_verified == 0 ? "Not Verified" : "Verified"}</td>
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

        </React.Fragment>
    )
}
