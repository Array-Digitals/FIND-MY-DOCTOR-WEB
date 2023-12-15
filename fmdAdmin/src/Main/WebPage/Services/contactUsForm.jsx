import React, { useState, useEffect, useRef } from 'react'
import ReactPaginate from 'react-paginate';
import pharmacyService from '../../../services/pharmacy';
import pharmacyPicLogo from '../../../assets/images/Pharmacy.svg'
import { Link } from 'react-router-dom';
import AdminService from '../../../services/adminApi';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dataNotFound from '../../../assets/images/noData.png'
import portalServices from '../../../services/portalServices';
import emailjs from '@emailjs/browser';


export const ContactUsForm = () => {

    // const form = useRef();


    const { contactAllGet } = portalServices();
    const [data, setUserList] = useState([])
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        fetchData();
    }, [])


    const fetchData = () => {
        contactAllGet().then((res) => {
            console.log(res.data.data, 'newsLetter');
            setUserList(res?.data?.data)
        }).catch((res) => {
            console.log(res)
        })
    }

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
            item.email.toLowerCase().includes(searchTerm.toLowerCase())
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


                    <div className="mainSectionWrapper spaceMainSectionWrapper">
                        <div className="heading">
                            <p>
                                Contact Us
                            </p>
                        </div>
                        <div className="card cardForm">
                            <div className="card-body">
                                {currentItems ?
                                    <>

                                        <div className="tableSearch">
                                            <input type="text" placeholder="Search..." onChange={handleSearch} />
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Id</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Phone</th>
                                                        <th scope="col">Subject</th>
                                                        <th scope="col">Message</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentItems.map((item, keyId) => {
                                                        return (
                                                            <tr key={keyId}>
                                                                <td>{item.id}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.email}</td>
                                                                <td>{item.phone}</td>
                                                                <td>{item.subject}</td>
                                                                <td>{item.message}</td>
                                                            </tr>
                                                        )
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
