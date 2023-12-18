import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import pharmacyService from '../../../services/pharmacy';
import { ROUTES } from '../../../utils/Routes';
import dataNotFound from '../../../assets/images/noData.png'
import pharmacyPicLogo from '../../../assets/images/Pharmacy.svg'

export const ManagePharmacy = () => {

    const { ProductGet, deleteProducts, productActivity } = pharmacyService()
    const [isDeleted, setIsDeleted] = useState(false);

    const [data, setProductData] = useState([])
    const fetchData = () => {
        ProductGet()
            .then((res) => {
                setProductData(res?.data?.data);
                console.log(res.data.data, 'response');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchData();
    }, [isDeleted])


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
        deleteProducts(data).then((res) => {
            // console.log(res.data.data)
            setIsDeleted(true);
        }).catch((res) => {
            console.log(res.message)
        }).finally(() => {
            setIsDeleted(false);
            fetchData();
        })
    }

    const [productActivityId, setProductActivityId] = useState('')

    console.log('productActivityId',productActivityId)
    useEffect(()=>{
        if(productActivityId){
            activityStatus(productActivityId);
        }
    },[productActivityId])


    const activityStatus = (idProduct) => {
        productActivity({id: idProduct}).then((res) => {
            console.log(res, 'response');
            fetchData();
        }).catch((res) => {
            console.log(res, 'error');
        })
    }


    return (
        <>
            <section className='mainSection'>
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <img src={pharmacyPicLogo} alt="" />
                            <p>
                                Manage Product
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
                                                        <th scope="col">Name</th>
                                                        {/* <th scope="col">Description</th> */}
                                                        <th scope="col">Title</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Brand</th>
                                                        <th scope="col">Category</th>
                                                        <th scope="col">Tag</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Discount</th>
                                                        <th scope="col">Batch Number</th>
                                                        <th scope="col">Active</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentItems.map((item, keyid) => {
                                                        return (
                                                            <tr key={keyid}>
                                                                <td>{item.name}</td>
                                                                {/* <td>{item.description}</td> */}
                                                                <td>{item?.title}</td>
                                                                <td>{item?.quantity}</td>
                                                                <td>{item?.brand_name}</td>
                                                                <td>{item?.cat_name}</td>
                                                                <td>{item?.tags}</td>
                                                                <td>{item?.price}</td>
                                                                <td>{item?.discounted_price}</td>
                                                                <td>{item?.batch_number}</td>
                                                                <td>
                                                                    <label className="switch2">
                                                                        <input type="checkbox" name='activity' checked={item?.activity == 0} value={item?.id}  onChange={(e) => setProductActivityId(e.target.value)} />
                                                                        <span className="slider round"></span>
                                                                    </label>
                                                                </td>
                                                                <td>
                                                                    <Link to={`/${ROUTES?.PRODUCT_UPDATE_FORM}/${item?.id}`}><i className="bi bi-pen"></i></Link>
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

        </>
    )
}
