import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import insurancePicLogo from '../../../assets/images/Insurance.svg'
import insuranceService from '../../../services/insurance';
import ReactPaginate from 'react-paginate';
import { ROUTES } from '../../../utils/Routes';

export const ManageInsuranceProvider = () => {


    const { insuranceProviderGetAll, insuranceProviderDelete } = insuranceService();

    const [data, setProviderData] = useState([])
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        insuranceProviderGetAll().then((res) => {
            setProviderData(res?.data?.data)
        }).catch((res) => {
            console.log(res)
        })
    }


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
            item.fullname.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return item;
        }
    }).slice(startIndex, endIndex);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPageNumber(0);
    };

    const [providerDeleteEvent, setProviderDeleteEvent] = useState();

    const deleteProvider = () => {
        let data = { id: providerDeleteEvent }
        // console.log(data, 'pharmmmmmm');
        insuranceProviderDelete(data).then((res) => {
            console.log(res)
            fetchData();
        }).catch((res) => {
            console.log(res.message)
        })
    }

    return (
        <React.Fragment>
            <section className='mainSection'>
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <img src={insurancePicLogo} alt="" />
                            <p>
                                Manage Provider
                            </p>
                        </div>
                        <div className="card cardForm">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Phone Number</th>
                                                {/* <th scope="col">Registered ID</th>
                                                <th scope="col">Address</th> */}
                                                <th scope="col">Representative Name</th>
                                                {/* <th scope="col">Representative Number</th> */}
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.map((item, keyid) => {
                                                return (
                                                    <tr key={keyid}>
                                                        <td>{item.fullname}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.phone}</td>
                                                        {/* <td>{item.registration_id}</td> */}
                                                        {/* <td>{item.address}</td> */}
                                                        <td>{item.name}</td>
                                                        {/* <td>{item.re_number}</td> */}
                                                        <td>
                                                            <Link to={`/${ROUTES?.UPDATE_INSURANCE_PROVIDER}/${item?.id}`}><i className="bi bi-pen"></i></Link>

                                                            <button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setProviderDeleteEvent(item.id) }}><i className="bi bi-trash3"></i></button>
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
                    </div>
                </div>
            </section>

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
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={deleteProvider}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>



        </React.Fragment>
    )
}
