import React, { useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import reportImageLogo from '../../../assets/images/Repot.svg'
import { useState } from 'react';
import reportServices from '../../../services/reportingService';
import AdminService from '../../../services/adminApi';

export const LabReport = () => {

    const { LabStatsReport } = reportServices()
    const { getAppointmentDetailsLab, getTestAssign } = AdminService()
    const [data, setData] = useState([]);
    const [orders, setOrders] = useState([]);
    const [data2, setData2] = useState([])

    const fetchData = () => {
        LabStatsReport().then((res) => {
            console.log(res.data.data, 'response');
            setData(res?.data?.data)
        }).catch((res) => {
            console.log(res, 'error');
        })

        getTestAssign().then((res) => {
            setData2(res?.data?.data)
            // console.log(res.data.data, 'response');
        }).catch((res)=>{
            console.log(res, 'error');
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    // Physical Doctor ALL data 
    // const data = [
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "2", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "3", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "4", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "5", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "6", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "7", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    // ]

    // Physical Doctor ALL data 
    // const data2 = [
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "2", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "3", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "4", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "5", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "6", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "7", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    // ]

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

    // related to pagination and search of physcial doctor
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
            item.lab_name.toLowerCase().includes(searchTerm2.toLowerCase())
        ) {
            return item;
        }
    }).slice(startIndex2, endIndex2);
    const handleSearch2 = (event) => {
        setSearchTerm2(event.target.value);
        setPageNumber2(0);
    };

    const LabOrderModalOpen = (id) => {
        const myDialog = document.getElementById('LabOrderModalId2');
        myDialog.showModal();

        getAppointmentDetailsLab(id).then((res) => {
            console.log(res.data.data, 'responseLab');
            setOrders(res?.data?.data)
        }).catch((res) => {
            console.log(res, 'error');
        })
    };
    const LabOrderModalClose = () => {
        const myDialog = document.getElementById('LabOrderModalId2');
        myDialog.close();
    };

    return (
        <React.Fragment>
            <section className='mainSection'>
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <img src={reportImageLogo} alt="" />
                            <p>
                                Lab Reports
                            </p>
                        </div>
                        <div className="card cardForm">
                            <div className="card-body">
                                <div className="tableSearch2">
                                    <div className="tableInnerHeading">
                                        Labs
                                    </div>
                                    <input type="text" placeholder="Search..." onChange={handleSearch} />
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Lab ID</th>
                                                <th scope="col">Booking ID</th>
                                                <th scope="col">Lab Name</th>
                                                <th scope="col">Lab City</th>
                                                {/* <th scope="col">Lab Total Assitant</th>
                                                <th scope="col">Lab Assitant</th> */}
                                                <th scope="col">Tests</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.map((item, keyid) => {
                                                return (
                                                    <tr key={keyid}>
                                                        <td>{item?.id}</td>
                                                        <td>{item?.booking_id}</td>
                                                        <td>{item?.name}</td>
                                                        <td>{item?.city}</td>
                                                        <td>{item?.tests}</td>
                                                        {/* <td>{item?.Qualification}</td>
                                                        <td><button onClick={LabModalOpen}>View Assitants</button></td> */}
                                                        {/* <td><button onClick={() => LabOrderModalOpen()}>View Orders</button></td> */}
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
                                        All Orders
                                    </div>
                                    <input type="text" placeholder="Search..." onChange={handleSearch2} />
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                            <th scope="col">ID</th>
                                                <th scope="col">Lab Name</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Beneficiary</th>
                                                <th scope="col">Phlebotomist</th>
                                                <th scope="col">Amount</th>
                                                {/* <th scope="col">Details</th> */}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {currentItems2.map((item, keyid) => {
                                                return (
                                                    <tr key={keyid}>
                                                    <td>{item?.id}</td>
                                                    <td>{item?.lab_name}</td>
                                                    <td>{item?.b_status}</td>
                                                    <td>{item?.is_beneficiary}</td>
                                                    <td>{item?.labortionist}</td>
                                                    <td>{item?.amount}</td>
                                                    {/* <td> <Link className='labBookingDetails' to={`/${ROUTES.LAB_BOOKING}/${item?.id}`}> Details </Link></td> */}
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


                        {/* <dialog id='LabModalId' className='CustomModal'>
                            <div className="modalInner">

                                <button className='modalCloseButton' onClick={LabModalClose}>X</button>
                                <div className="modalContent">
                                    <div className="modalHeading">
                                        Assitant
                                    </div>
                                    <hr />
                                    <div className="modalInnerContent">
                                        <div className="modalData">
                                            <p>Assitant Id: 1</p>
                                            <p>Assitant Name: name</p>
                                            <p>Assitant Phone: 12312312312</p>
                                            <p>Order Accepted: 123</p>
                                            <p>Order Rejected: 11</p>
                                        </div>
                                        <hr />
                                        <div className="modalData">
                                            <p>Assitant Id: 1</p>
                                            <p>Assitant Name: name</p>
                                            <p>Assitant Phone: 12312312312</p>
                                            <p>Order Accepted: 123</p>
                                            <p>Order Rejected: 11</p>
                                        </div>
                                        <hr />
                                        <div className="modalData">
                                            <p>Assitant Id: 1</p>
                                            <p>Assitant Name: name</p>
                                            <p>Assitant Phone: 12312312312</p>
                                            <p>Order Accepted: 123</p>
                                            <p>Order Rejected: 11</p>
                                        </div>
                                        <hr />
                                        <div className="modalData">
                                            <p>Assitant Id: 1</p>
                                            <p>Assitant Name: name</p>
                                            <p>Assitant Phone: 12312312312</p>
                                            <p>Order Accepted: 123</p>
                                            <p>Order Rejected: 11</p>
                                        </div>
                                        <hr />
                                        <div className="modalData">
                                            <p>Assitant Id: 1</p>
                                            <p>Assitant Name: name</p>
                                            <p>Assitant Phone: 12312312312</p>
                                            <p>Order Accepted: 123</p>
                                            <p>Order Rejected: 11</p>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </dialog> */}
                        {/* 
                        {
                            isModal && */}
                        {/* <dialog id='LabOrderModalId2' className='CustomModal' > */}
                        <dialog id='LabOrderModalId2' className='CustomModal'>
                            <div className="modalInner">

                                <button className='modalCloseButton' onClick={LabOrderModalClose}>X</button>
                                <div className="modalContent">
                                    <div className="modalHeading">
                                        Order
                                    </div>
                                    <hr />
                                    <div className="modalInnerContent">
                                        {
                                            orders.length > 0 ?
                                            orders.map((item, keyId) => (

                                                <React.Fragment>
                                                    <div key={keyId} className="modalData">
                                                        <p>Order Id: {item.id}</p>
                                                        <p>Amount: {item.amount}</p>
                                                        <p>Patient: {item.name}</p>
                                                        <p>Phlebotomist: {item.labortionist}</p>
                                                    </div>
                                                    <hr />
                                                </React.Fragment>
                                            ))
                                            :
                                            <p>No Orders</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </dialog>
                        {/* } */}

                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
