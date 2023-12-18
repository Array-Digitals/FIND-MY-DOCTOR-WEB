import React, { useEffect, useState } from 'react'
import AdminService from '../../../services/adminApi';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../utils/Routes';

export const AssignTest = () => {

    const { getTestAssign, getTestAssignHistory } = AdminService();
    const [allLabTest, setAllLabTest] = useState([])
    const handleSearch = () => {
    }
    useEffect(() => {
        getTestAssign().then((res) => {
            setAllLabTest(res?.data?.data)
        }).catch((res) => {
            console.log(res, 'error');
        })
    }, [])
    console.log(allLabTest, 'labTests');
    return (
        <React.Fragment>
            <section className='mainSection'>
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <p>
                                All Tests
                            </p>
                        </div>
                        <div className="card cardForm">
                            <div className="card-body">
                                <div className="tableSearch">
                                    {/* <input type="text" placeholder="Search..." onChange={handleSearch} /> */}
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
                                                <th scope="col">Details</th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allLabTest.map((item, keyid) => {
                                                return (
                                                    <tr key={keyid}>
                                                        <td>{item?.id}</td>
                                                        <td>{item?.lab_name}</td>
                                                        <td>{item?.b_status}</td>
                                                        <td>{item?.is_beneficiary}</td>
                                                        <td>{item?.labortionist}</td>
                                                        <td>{item?.amount}</td>
                                                        <td> <Link className='labBookingDetails' to={`/${ROUTES.LAB_BOOKING}/${item?.id}`}> Details </Link></td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                {/* <ReactPaginate
                                    pageCount={pageCount}
                                    onPageChange={handlePageClick}
                                    containerClassName={'pagination'}
                                    activeClassName={'active'}
                                /> */}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </React.Fragment>
    )
}
