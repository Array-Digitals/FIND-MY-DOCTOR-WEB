import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminService from '../../../services/adminApi';
import ReactPaginate from 'react-paginate';
import { ROUTES } from '../../../utils/Routes';

export const ManageLab = () => {
    const { getLab, deleteLab, getTestByLab, deleteTestFromLab } = AdminService();
    const [data, setData] = useState([]);
    const [labDeleteEvent, setLabDeleteEvent] = useState(null)
    const [searchTerm, setSearchTerm] = useState('');
    const [labId, setLabId] = useState(null);
    const [tests, setTests] = useState([])
    const [deletedTest, setDeletedTestId] = useState('')

    useEffect(() => {
        onDeleteTest();
        // fetchTests(labId)
        // closePhysicalDoctorModal();
    }, [deletedTest])

    useEffect(() => {
        fetchData()
    }, []);
    const fetchData = () => {
        getLab()
            .then((res) => {
                console.log(res.data.data)
                setData(res?.data?.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const onDeleteTest = () => {
        if (deletedTest) {
            deleteTestFromLab({lab: labId , test: deletedTest}).then((res) => {
                console.log(res, 'response');
                fetchTests(labId)
            }).catch((res) => {
                console.log(res, 'error');
            })
        }
    }
    const fetchTests = (labId) => {
        getTestByLab(labId).then((res) => {
            console.log(res.data.data, 'response');
            setTests(res.data.data)
        }).catch((res) => {
            console.log(res, 'error');
        })
    }

    const deleteLabSingle = () => {
        let data = JSON.stringify({
            "id": labDeleteEvent
        });

        deleteLab(data).then((res) => {
            console.log(res.data.data)
            fetchData()
            // fetchTests();
        }).catch((res) => {
            console.log(res, "error")
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
            item.fullname.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return item;
        }
    }).slice(startIndex, endIndex);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPageNumber(0);
    };


    const openPhysicalDoctorModal = (labId) => {
        const myDialog = document.getElementById('physicalDoctorPatientId');
        myDialog.showModal();
        fetchTests(labId);

    };

    const closePhysicalDoctorModal = () => {
        const myDialog = document.getElementById('physicalDoctorPatientId');
        myDialog.close();
    };
    return (
        <>
            <section className='mainSection'>
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <p>
                                Manage Lab
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
                                                <th scope="col">Lab ID</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Phone Number</th>
                                                <th scope="col">Address</th>
                                                <th scope="col">Representative Name</th>
                                                <th scope="col">Tests</th>
                                                {/* <th scope="col">Representative Number</th> */}
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.map((item, keyid) => {
                                                return (
                                                    <tr key={keyid}>
                                                        <td>{item?.lab_id}</td>
                                                        <td>{item?.name}</td>
                                                        <td>{item?.email}</td>
                                                        <td>{item?.phone}</td>
                                                        <td>{item?.lab_address}</td>
                                                        <td>{item?.fullname}</td>
                                                        {/* <td>{item?.phone}</td> */}
                                                        <td><button onClick={() => { openPhysicalDoctorModal(item.lab_id); setLabId(item.lab_id); }}>View Tests</button></td>
                                                        <td>
                                                            <Link to={`/${ROUTES?.UPDATE_LAB_FORM}/${item?.id}`}><i className="bi bi-pen"></i></Link>
                                                            <Link onClick={() => { setLabDeleteEvent(item?.id) }} data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi bi-trash3"></i></Link>
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
                                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={deleteLabSingle} >Yes</button>
                                    </div>
                                </div>
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
                                    {tests.length > 0 ?
                                        <div className="modalInnerContent modalInnerContent2">
                                            {
                                                tests.map((item, keyId) => (
                                                    <React.Fragment>
                                                        <div className="modalDataOuter">
                                                            <div className="modalData" key={keyId}>
                                                                <p>Test Name: {item.test_name}</p>
                                                                <p>Test Amount: {item.test_amount}</p>
                                                            </div>
                                                            <button className='deleteTestButton' onClick={() => { setDeletedTestId(item.test_id) }}>
                                                                <i className="bi bi-trash3"></i>
                                                            </button>
                                                        </div>
                                                        <hr />
                                                    </React.Fragment>
                                                ))
                                            }
                                        </div>
                                        :
                                        // <div className="modalInnerContent">
                                        <p>
                                            No Tests
                                        </p>
                                        // </div>
                                    }
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </section>

        </>
    )
}
