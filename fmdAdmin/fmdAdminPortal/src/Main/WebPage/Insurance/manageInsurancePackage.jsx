import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import insurancePicLogo from '../../../assets/images/Insurance.svg'
import insuranceService from '../../../services/insurance';
import { ROUTES } from '../../../utils/Routes';
import ReactPaginate from 'react-paginate';

export const ManageInsurancePackage = () => {

    const { insurancePlanGetAll, insurancePlanSingleGet, insurancePlanDelete } = insuranceService();
    const [packageDeleteEvent, setPackageDeleteEvent] = useState(null);

    const [data, setData] = useState();


    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        insurancePlanGetAll().then((res) => {
            console.log(res?.data?.data, 'data');
            setData(res?.data?.data)
        }).catch((res) => {
            console.log(res, 'error');
        })
    }

    const [singleInsurance, setSingleInsurance] = useState([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const isViewDetails = (e, id) => {
        insurancePlanSingleGet(id).then((res) => {
            console.log(JSON.parse(res?.data?.data[0]?.features), 'insuranceeee');
            const parsedArray = JSON.parse(res?.data?.data[0]?.features)
            setSingleInsurance(parsedArray)
            setIsDialogOpen(!isDialogOpen)
        }).catch((res) => {
            console.log(res, 'error');
        })
    }
    const closeModal = () => {
        setIsDialogOpen(false)
    }

    // console.log(singleInsurance, 'lll;;');

    const deletePackageSingle = () => {

        let data = { id: packageDeleteEvent }
        // console.log(data, 'pharmmmmmm');
        insurancePlanDelete(data).then((res) => {
            fetchData();
            console.log(res)
        }).catch((res) => {
            console.log(res.message)
        })
    }


    const [pageNumber, setPageNumber] = useState(0);
    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setPageNumber(selectedPage);
    };

    const [searchTerm, setSearchTerm] = useState('');

    const itemsPerPage = 8;
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageCount = Math.ceil(data?.length / itemsPerPage);
    const currentItems = data?.filter((item) => {
        if (searchTerm === '') {
            return item;
        } else if (
            item.provider_name.toLowerCase().includes(searchTerm.toLowerCase())
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
                            <img src={insurancePicLogo} alt="" />
                            <p>
                                Manage Package
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

                                                <th scope="col">ID</th>
                                                <th scope="col">Provider Name</th>
                                                <th scope="col">Package Name</th>
                                                <th scope="col">Annual Cost</th>
                                                <th scope="col">Details</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems?.map((item, keyid) => {
                                                return (
                                                    <tr key={keyid}>
                                                        <td>{item.id}</td>
                                                        <td>{item.provider_name}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.annual_cost}</td>
                                                        <td> <button onClick={(e) => isViewDetails(e, item.id)} >View</button> </td>
                                                        <td>
                                                            <Link to={`/${ROUTES?.UPDATE_INSURANCE_PACKAGE}/${item?.id}`}><i className="bi bi-pen"></i></Link>
                                                            <button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setPackageDeleteEvent(item.id) }}><i className="bi bi-trash3"></i></button> </td>
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
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={deletePackageSingle}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>

            {
                isDialogOpen &&
                <dialog className='detailsDialog' open>
                    <div className="detailsDialogInner">
                        <button type="button" className="btn-close" onClick={closeModal} />
                        <div className="headingDetails">
                            Details
                        </div>
                        <hr />
                        <div className="detaislDialogBody">
                            {
                                singleInsurance?.map((item, keyId) => {
                                    console.log(item, 'itemsss');
                                    return (
                                        <div className="detailsItemsDialog" key={keyId}>
                                            <span >
                                                {item.featureKey}
                                            </span>
                                            <span> </span>
                                            <span className='valueItems'>
                                                {item.featureValue}
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </dialog>
            }

        </React.Fragment>
    )
}
