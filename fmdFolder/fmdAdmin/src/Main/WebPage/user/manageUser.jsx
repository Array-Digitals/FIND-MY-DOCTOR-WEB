import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import AuthService from '../../../services/authService';
import userImageLogo from '../../../assets/images/User.svg'
import { ROUTES } from '../../../utils/Routes';

export const ManageUser = () => {

    const [data, setUserData] = useState([])
    const { getAdmin } = AuthService();
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        getAdmin().then((res) => {
            // const responseFilter = res?.data?.data.filter(data => data.type === 7)
            setUserData(res?.data?.data)
        }).catch((res) => {
            console.log(res)
        })
    }, [])


    const [pageNumber, setPageNumber] = useState(0);
    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setPageNumber(selectedPage);
    };

    const itemsPerPage = 8;
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageCount = Math.ceil(data.length / itemsPerPage);
    const currentItems = data?.filter((item) => {
        // console.log(item, "itemDataaa")
        if (searchTerm === '') {
            return item;
        } else if (
            item?.fullname?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        ) {
            return item;
        }
    }).slice(startIndex, endIndex);
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
                            <img src={userImageLogo} alt="" />
                            <p>
                                Manage Admin
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
                                                <th scope="col">Id</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Phone Number</th>
                                                <th scope="col">Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems?.map((item, keyid) => {
                                                return (
                                                    <tr key={keyid}>
                                                        <td>{item?.id}</td>
                                                        <td>{item?.fullname}</td>
                                                        <td>{item?.email}</td>
                                                        <td>{item?.phone}</td>
                                                        <td>
                                                            <Link to={`/${ROUTES?.USER_UPDATE_FORM}/${item?.id}`}><i className="bi bi-pen"></i></Link>
                                                            {/* <Link onClick={() => { setDeleteDoctor(item?.id) }} data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi bi-trash3"></i></Link> */}
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
        </>
    )
}
