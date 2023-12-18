import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import insurancePicLogo from '../../../assets/images/Insurance.svg'
import insuranceService from '../../../services/insurance';
import { ROUTES } from '../../../utils/Routes';
import ReactPaginate from 'react-paginate';

export const AllInsuranceBooking = () => {

    const { insuranceAllBookingGet } = insuranceService();
    const [data, setData] = useState();
    const [data2, setData2] = useState();


    const fetchData = () => {
        insuranceAllBookingGet(0).then((res) => {
            console.log(res?.data?.data, 'data');
            setData(res?.data?.data)
        }).catch((res) => {
            console.log(res, 'error');
        })
        insuranceAllBookingGet(1).then((res) => {
            console.log(res?.data?.data, 'data');
            setData2(res?.data?.data)
        }).catch((res) => {
            console.log(res, 'error');
        })
    }
    useEffect(() => {
        fetchData();
    }, [])





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
            item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
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
            item?.fullname?.toLowerCase().includes(searchTerm2.toLowerCase())
        ) {
            return item;
        }
    }).slice(startIndex2, endIndex2);
    const handleSearch2 = (event) => {
        setSearchTerm2(event.target.value);
        setPageNumber2(0);
    };

    return (
        <React.Fragment>
            <section className='mainSection'>
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <img src={insurancePicLogo} alt="" />
                            <p>
                                Insurance Booking
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

                                                {/* <th scope="col">ID</th> */}
                                                <th scope="col">User Name</th>
                                                <th scope="col">Package Name</th>
                                                <th scope="col">Annual Cost</th>
                                                {/* <th scope="col">Details</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems?.map((item, keyid) => {
                                                return (
                                                    <tr key={keyid}>
                                                        <td>{item.fullname}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.amount}</td>
                                                        {/* <td>
                                                            <Link to={`/${ROUTES?.UPDATE_INSURANCE_PACKAGE}/${item?.id}`}><i className="bi bi-pen"></i></Link>
                                                        </td> */}
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

                                                {/* <th scope="col">ID</th> */}
                                                <th scope="col">User Name</th>
                                                <th scope="col">Package Name</th>
                                                <th scope="col">Annual Cost</th>
                                                {/* <th scope="col">Details</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems2?.map((item, keyid) => {
                                                return (
                                                    <tr key={keyid}>
                                                        <td>{item.fullname}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.amount}</td>
                                                       
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
