import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import pharmacyService from '../../../services/pharmacy';
import pharmacyPicLogo from '../../../assets/images/Pharmacy.svg'
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../utils/Routes'
import dataNotFound from '../../../assets/images/noData.png'

export const ManageCategory = () => {
    const { categoriesGet, deleteCategories } = pharmacyService();
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        categoriesGet().then((res) => {
            setData(res?.data?.data)
            // console.log(res?.data , '222');
        }).catch((err) => {
            console.log(err);
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
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return item;
        }
    }).slice(startIndex, endIndex);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPageNumber(0);
    };

    const [pharmacyDeleteEvent, setPharmacyDeleteEvent] = useState();

    const deletePharamSingle = () => {

        let data = { id: pharmacyDeleteEvent }
        console.log(data, 'pharmmmmmm');
        deleteCategories(data).then((res) => {
            console.log(res)
            fetchData()
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
                            <img src={pharmacyPicLogo} alt="" />
                            <p>
                                Manage Category
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
                                                        <th scope="col">ID</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Description</th>
                                                        <th scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentItems.map((item, keyid) => {
                                                        return (
                                                            <tr key={keyid}>
                                                                <td>{item?.id}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.description}</td>
                                                                <td>
                                                                    <Link to={`/${ROUTES.CATEGORY_UPDATE}/${item?.id}`}><i className="bi bi-pen"></i></Link>
                                                                    <Link onClick={() => { setPharmacyDeleteEvent(item?.id) }} data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi bi-trash3"></i></Link>

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
                                    </>
                                    :
                                    <div className="dataNotFoundDiv">
                                        <img className='dataNotFoundImg' src={dataNotFound} alt="" />
                                    </div>
                                }
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
                                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={deletePharamSingle}>Yes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
