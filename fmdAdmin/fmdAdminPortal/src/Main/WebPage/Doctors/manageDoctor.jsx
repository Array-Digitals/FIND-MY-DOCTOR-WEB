import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminService from '../../../services/adminApi';
import { ROUTES } from '../../../utils/Routes';
import ReactPaginate from 'react-paginate';
import DoctorLogoImg from '../../../assets/images/Doctor.svg'

// import { functionalUpdate } from 'react-table';


export const ManageDoctor = () => {

    const { getDoctor, deleteDoctor, getDoctorSingle, getSingleSpecialistCategory } = AdminService();
    const [data, setData] = useState([]);
    const [specialistSingle, setSpecialistSingle] = useState([])

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = () => {
        getDoctor().then((res) => {
            console.log(res, "doc")
            setData(res?.data?.data);

        }).catch((error) => {
            console.log(error);
        });
    }

    // useEffect(() => {
    //     if (data) {
    //         data.forEach((specialist) => {
    //             getSingleSpecialistCategory(specialist.specialist_category)
    //                 .then((res) => {
    //                     // console.log(res?.data?.data, "specialist data for category", specialist.categoryId);
    //                     setSpecialistSingle(specialist.categoryId)
    //                 })
    //                 .catch((error) => {
    //                     console.log(error);
    //                 });
    //         });
    //     }
    // }, [data]);

    const handleGetSingleDoc = (doctorId) => {
        console.log(doctorId, "single Doctor Id")
        console.log("this is working")
        getDoctorSingle(doctorId).then((res) => {
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }

    const [deleteDoctorEvent, setDeleteDoctor] = useState(null)

    const deleteBeneficiary = () => {
        let data = JSON.stringify({
            "id": deleteDoctorEvent
        });

        deleteDoctor(data).then((res) => {
            console.log(res)
            fetchData();
        }).catch((res) => {
            console.log(res.message)
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
    const [searchTerm, setSearchTerm] = useState('');
    const currentItems = data
        .filter((item) => {
            if (searchTerm === '') {
                return item;
            } else if (
                item.fullname.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
                return item;
            }
        }).slice(startIndex, endIndex);
    const pageCount = Math.ceil(data.length / itemsPerPage);



    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPageNumber(0);
    };
    return (
        <>
            <section className='mainSection'>
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <img src={DoctorLogoImg} alt="" />

                            <p>
                                Manage Doctor
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
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Phone Number</th>
                                                <th scope="col">PMDA ID</th>
                                                <th scope="col">CNIC</th>
                                                {/* <th scope="col">Availability</th> */}
                                                <th scope="col">Qualification</th>
                                                <th scope="col">Experience</th>
                                                <th scope="col">Speciality</th>
                                                {/* <th scope="col">DoctorType</th> */}
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.map((item, keyid) => {
                                                return (
                                                    <tr key={keyid}>
                                                        <td>{item?.fullname}</td>
                                                        <td>{item?.email}</td>
                                                        <td>{item?.phone}</td>
                                                        <td>{item?.PMDA_ID}</td>
                                                        <td>{item?.CNIC}</td>
                                                        {/* <td>{item?.availability}</td> */}
                                                        <td>{item?.qualification}</td>
                                                        <td>{item?.experience}</td>
                                                        <td>{item?.speciality}</td>
                                                        {/* <td>{item?.doctor_type}</td> */}
                                                        <td>
                                                            <Link to={`/${ROUTES?.DOCTOR_UPDATE_FORM}/${item?.id}`}><i className="bi bi-pen"></i></Link>
                                                            <Link onClick={() => { setDeleteDoctor(item?.id) }} data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi bi-trash3"></i></Link> </td>
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
                </div>

            </section>

        </>
    )
}
