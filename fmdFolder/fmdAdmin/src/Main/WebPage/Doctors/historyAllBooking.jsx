import React, {useEffect} from 'react'
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import reportImageLogo from '../../../assets/images/Repot.svg'
import DoctorLogoImg from '../../../assets/images/Doctor.svg'
import AdminService from '../../../services/adminApi';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../utils/Routes';


export const HistoryDoctorBooking = () => {

    const {doctorHistoryBookingApi} = AdminService();
    const [data, setData] = useState([]);


    useEffect(() => {
        doctorHistoryBookingApi().then((res)=>{
            setData(res?.data?.data)
            console.log(res?.data?.data, 'rs');
        })
    }, [])
    
 
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
            item.resepient_name.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <img src={DoctorLogoImg} alt="" />
                            <p>
                                Doctor Booking
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
                                                <th scope="col">Booking Id</th>
                                                <th scope="col">Recipent Name</th>
                                                <th scope="col">Appointment User</th>
                                                <th scope="col">Appointment Type</th>
                                                <th scope="col">Doctor Category</th>
                                                <th scope="col">Doctor</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.map((item, keyid) => {
                                                return (
                                                    <tr key={keyid}>
                                                        <td>{item?.id}</td>
                                                        <td>{item?.resepient_name}</td>
                                                        <td>{item?.appointment_user}</td>
                                                        <td>{item?.appoint_type}</td>
                                                        <td>{item?.doctor_consultation_type}</td>
                                                        <td>{item?.doctor_name ? item?.doctor_name : 'Not Assigned'}</td>
                                                        <td>{item?.amount}</td>
                                                        <td>{item?.status}</td>
                                                        <td> <Link className='labBookingDetails' to={`/${ROUTES.DOCTOR_BOOKING_DETAIL}/${item?.id}`}> Details </Link></td>

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
            </section>
        </React.Fragment>
    )
}
