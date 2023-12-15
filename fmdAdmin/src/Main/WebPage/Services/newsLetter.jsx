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


export const NewsLetter = () => {

    const form = useRef();


    const { newLetterAllGet } = portalServices();
    const [data, setEmailList] = useState([
        '0.abdulraffaay', 'shaikhburhanali29@gmail.com'
    ])
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        fetchData();
    }, [])


    const fetchData = () => {
        newLetterAllGet().then((res) => {
            console.log(res.data, 'newsLetter');
            setEmailList(res?.data?.data)
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


    //     const sendEmail = (e) => {
    //         e.preventDefault();
    // console.log(form.current, 'formmmm');
    //         emailjs.sendForm('service_gjywzgx', 'template_i2oj5tt', form.current, '4-gMyLVEhjW6m1OYl')
    //             .then((result) => {
    //                 console.log(result.text);
    //             }, (error) => {
    //                 console.log(error.text);
    //             });
    //     };

    // const sendEmail = (e) => {
    //     e.preventDefault();
    //     const emailList = data.map((item) => item);
    //     console.log(emailList)
    //     emailList.forEach((email) => {
    //         const formData = new FormData(form.current);
    //         formData.set('user_email', email);

    //         emailjs.sendForm('service_gjywzgx', 'template_i2oj5tt', form.current, '4-gMyLVEhjW6m1OYl')
    //             .then(
    //                 (result) => {
    //                     console.log(result);
    //                     console.log(form.current);
    //                     // toast.success(`Email sent to ${email}`);
    //                 },
    //                 (error) => {
    //                     console.log(error.text);
    //                     // toast.error(`Failed to send email to ${email}`);
    //                 }
    //             );
    //     });
    // };


    const sendEmail = (event) => {
        event.preventDefault();

        const message = form.current.message.value;
        const encodedMessage = encodeURIComponent(message);
        const mailtoLink = `mailto:shaikhburhanali29@gmail.com?subject=Subject%20of%20the%20email&body=${encodedMessage}`;

        window.location.href = mailtoLink;
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
                                News Letter
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
                                                        <th scope="col">Email</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentItems.map((item, keyId) => {
                                                        // console.log(item, 'itemmm')
                                                        return (
                                                            <tr key={keyId}>
                                                                <td>{item.id}</td>
                                                                <td>{item.email}</td>
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

                    <div className="mainSectionWrapper spaceMainSectionWrapper">
                        <div className="heading">
                            <p>
                                Email
                            </p>
                        </div>
                        <div className="card cardForm">
                            <div className="card-body">
                                <form className='emailSection' ref={form} onSubmit={sendEmail}>
                                    <textarea placeholder='Write an email...' type="text" name="message" id="" />
                                    <button type="submit">Send</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
