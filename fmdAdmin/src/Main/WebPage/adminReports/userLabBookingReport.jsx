import React from 'react'
import ReactPaginate from 'react-paginate';
import reportImageLogo from '../../../assets/images/Repot.svg'
import { useState } from 'react';

export const UserLabBookingReport = () => {
    // Physical Doctor ALL data 
    const data = [
        { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
        { name: "doctor", id: "2", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
        { name: "doctor", id: "3", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
        { name: "doctor", id: "4", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
        { name: "doctor", id: "5", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
        { name: "doctor", id: "6", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
        { name: "doctor", id: "7", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    ]


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


    // Modal open and close 
    const openPhysicalDoctorModal = () => {
        const myDialog = document.getElementById('physicalDoctorPatientId');
        myDialog.showModal();
    };
    const closePhysicalDoctorModal = () => {
        const myDialog = document.getElementById('physicalDoctorPatientId');
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
                                Lab Booking
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
                                                <th scope="col">Booking Id</th>
                                                <th scope="col">User Name</th>
                                                <th scope="col">Booked For</th>
                                                <th scope="col">Lab Name</th>
                                                <th scope="col">Test Time</th>
                                                <th scope="col">Booking Status</th>
                                                <th scope="col">Tests Name</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.map((item, keyid) => {
                                                return (
                                                    <tr key={keyid}>
                                                        <td>{item?.id}</td>
                                                        <td>{item?.name}</td>
                                                        <td>{item?.date}</td>
                                                        <td>{item?.date}</td>
                                                        <td>{item?.Qualification}</td>
                                                        <td>{item?.city}</td>
                                                        <td><button onClick={openPhysicalDoctorModal}>View Tests</button></td>

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
                        <dialog id='physicalDoctorPatientId' className='CustomModal'>
                            <div className="modalInner">

                                <button className='modalCloseButton' onClick={closePhysicalDoctorModal}>X</button>
                                <div className="modalContent">
                                    <div className="modalHeading">
                                        Tests
                                    </div>
                                    <hr />
                                    <div className="modalInnerContent">
                                        <div className="modalData">
                                            <p>Test Id: 1</p>
                                            <p>Test Name: name</p>
                                         
                                        </div>
                                        <hr />
                                        <div className="modalData">
                                            <p>Test Id: 1</p>
                                            <p>Test Name: name</p>
                                         
                                        </div>
                                        <hr />
                                        <div className="modalData">
                                            <p>Test Id: 1</p>
                                            <p>Test Name: name</p>
                                         
                                        </div>
                                        <hr />
                                        <div className="modalData">
                                            <p>Test Id: 1</p>
                                            <p>Test Name: name</p>
                                         
                                        </div>
                                        <hr />
                                        <div className="modalData">
                                            <p>Test Id: 1</p>
                                            <p>Test Name: name</p>
                                         
                                        </div>
                                     
                                    </div>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
