import React from 'react'
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import reportImageLogo from '../../../assets/images/Repot.svg'

export const LabortionistReport = () => {

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

    const openRejectedOrderModal = () =>{
        const myDialog = document.getElementById('rejectedOrderModalId2');
        myDialog.showModal();
    }
    const closeRejectedOrderModal = () =>{
        const myDialog = document.getElementById('rejectedOrderModalId2');
        myDialog.close();
    }
    const openCompletedOrderModal = () =>{
        const myDialog = document.getElementById('completedOrderModalId2');
        myDialog.showModal();
    }
    const closeCompletedOrderModal = () =>{
        const myDialog = document.getElementById('completedOrderModalId2');
        myDialog.close();
    }
    


    return (
        <React.Fragment>
            <section className='mainSection'>
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <img src={reportImageLogo} alt="" />
                            <p>
                                Insurance Report
                            </p>
                        </div>
                        <div className="card cardForm">
                            <div className="card-body">
                                <div className="tableSearch">
                                    {/* <div className="tableInnerHeading">
                                    Physical Doctor
                                </div> */}
                                    <input type="text" placeholder="Search..." onChange={handleSearch} />
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Lab Id</th>
                                                <th scope="col">Lab Name</th>
                                                <th scope="col">Lab Assigned</th>
                                                <th scope="col">Order Completed</th>
                                                <th scope="col">Order Rejected</th>
                                                <th scope="col">Rejected Orders</th>
                                                <th scope="col">Completed Orders</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.map((item, keyid) => {
                                                return (
                                                    <tr key={keyid}>
                                                        <td>{item?.id}</td>
                                                        <td>{item?.name}</td>
                                                        <td>{item?.date}</td>
                                                        <td>{item?.Qualification}</td>
                                                        <td>{item?.city}</td>
                                                        <td><button onClick={openRejectedOrderModal}>View Rejected Orders</button></td>
                                                        <td><button onClick={openCompletedOrderModal}>View Completed Orders</button></td>
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
                        <dialog id='rejectedOrderModalId2' className='CustomModal'>
                            <div className="modalInner">

                                <button className='modalCloseButton' onClick={closeRejectedOrderModal}>X</button>
                                <div className="modalContent">
                                <div className="modalHeading">
                                        Orders
                                    </div>
                                    <hr />
                                    <div className="modalInnerContent">
                                        <div className="modalData">
                                            <p>Order Id: 1</p>
                                            <p>Order Name: name</p>
                                            <p>Reject Reason: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut adipisci ad hic doloribus, nulla vel? Inventore, voluptatem? Blanditiis, molestiae minus!</p>
                                        </div>
                                       <hr />
                                       <div className="modalData">
                                            <p>Order Id: 1</p>
                                            <p>Order Name: name</p>
                                            <p>Reject Reason: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut adipisci ad hic doloribus, nulla vel? Inventore, voluptatem? Blanditiis, molestiae minus!</p>
                                        </div>
                                       <hr />
                                       <div className="modalData">
                                            <p>Order Id: 1</p>
                                            <p>Order Name: name</p>
                                            <p>Reject Reason: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut adipisci ad hic doloribus, nulla vel? Inventore, voluptatem? Blanditiis, molestiae minus!</p>
                                        </div>
                                       <hr />
                                       <div className="modalData">
                                            <p>Order Id: 1</p>
                                            <p>Order Name: name</p>
                                            <p>Reject Reason: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut adipisci ad hic doloribus, nulla vel? Inventore, voluptatem? Blanditiis, molestiae minus!</p>
                                        </div>
                                       <hr />
                                     
                                        
                                    </div>
                                </div>
                            </div>
                        </dialog>


                        <dialog id='completedOrderModalId2' className='CustomModal'>
                            <div className="modalInner">

                                <button className='modalCloseButton' onClick={closeCompletedOrderModal}>X</button>
                                <div className="modalContent">
                                    <div className="modalHeading">
                                        Orders
                                    </div>
                                    <hr />
                                    <div className="modalInnerContent">
                                        <div className="modalData">
                                            <p>Order Id: 1</p>
                                            <p>Order Name: name</p>
                                        </div>
                                       <hr />
                                       <div className="modalData">
                                            <p>Order Id: 1</p>
                                            <p>Order Name: name</p>
                                        </div>
                                       <hr />
                                       <div className="modalData">
                                            <p>Order Id: 1</p>
                                            <p>Order Name: name</p>
                                        </div>
                                       <hr />
                                       <div className="modalData">
                                            <p>Order Id: 1</p>
                                            <p>Order Name: name</p>
                                        </div>
                                       <hr />
                                       <div className="modalData">
                                            <p>Order Id: 1</p>
                                            <p>Order Name: name</p>
                                        </div>
                                       <hr />
                                        
                                        
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
