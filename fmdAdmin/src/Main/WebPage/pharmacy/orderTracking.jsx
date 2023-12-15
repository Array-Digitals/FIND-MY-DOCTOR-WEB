import React, { useEffect, useState } from 'react'
import pharmacyPicLogo from '../../../assets/images/Pharmacy.svg'
import pharmacyService from '../../../services/pharmacy';
import ReactPaginate from 'react-paginate';
import { Loader } from '../../Component/loader';

export const OrderTracking = () => {

    const { getOrderTracking, postOrderTracking, postOrderCompletion } = pharmacyService();
    // Modal open and close 
    const openPhysicalDoctorModal = () => {
        const myDialog = document.getElementById('physicalDoctorPatientId');
        myDialog.showModal();
    };
    const closePhysicalDoctorModal = () => {
        const myDialog = document.getElementById('physicalDoctorPatientId');
        myDialog.close();
    };
    const openReasonRejectionModal = () => {
        const myDialog1 = document.getElementById('physicalDoctorPatientId');
        myDialog1.close();
        const myDialog = document.getElementById('reasonRejectionId');
        myDialog.showModal();
    };
    const closeReasonRejectionModal = () => {
        const myDialog = document.getElementById('reasonRejectionId');
        myDialog.close();
    };



    const [userTrackingState, setUserTrackingState] = useState({
        data: 'pending'
    });
    const [data, setUserTracking] = useState([]);

    const [isLoader, setIsLoader] = useState(false);

    const trackingStateChange = e => {
        setIsLoader(true);
        setUserTrackingState({ ...userTrackingState, data: e.target.value })
    }

    useEffect(() => {
        getTrackingFunc();
    }, [userTrackingState])

    const getTrackingFunc = () => {
        getOrderTracking(userTrackingState.data).then((res) => {
            setUserTracking(res?.data?.data)
            console.log(res?.data?.data, 'response');
        }).catch((res) => {
            console.log(res, 'error');
        }).finally(() => {
            setTimeout(() => {
                setIsLoader(false);
            }, 2000);
            // setIsLoader(false);
        })

    }

    // console.log(loader, 'loaded');

    //On accepting Product
    const onAcceptingItem = (statusParam, idParam) => {
        postAcceptOrder(statusParam, idParam);
        getTrackingFunc();
        getInput(statusParam, idParam);
    }
    const postAcceptOrder = (statusParam, idParams) => {
        const dataObj = { reason: "", id: idParams, action: statusParam }
        console.log(dataObj, 'ddd');
        postOrderCompletion(dataObj).then((res) => {
            console.log(res, 'responselll');
            closeReasonRejectionModal();
        }).catch((res) => {
            console.log(res, 'err');
        })
    }

    // On rejecting a product 
    const [rejectedItemId, setRejectedItemId] = useState(null);
    const [rejectingReason, setRejectingReason] = useState('')
    const onRejectingItem = (id) => {
        openPhysicalDoctorModal();
        setRejectedItemId(id)
    }
    const postRejectOrder = () => {
        const dataObj = { reason: rejectingReason, id: rejectedItemId, action: "reject" }
        getInput('reject', rejectedItemId);
        postOrderCompletion(dataObj).then((res) => {
            console.log(res, 'response');
            closeReasonRejectionModal();
        }).catch((res) => {
            console.log(res, 'err');
        })
    }

    //On changing any kind of state of product

    const [trackingState, setTrackingState] = useState({
        status: '',
        id: 0
    })
    const getInput = (statusParam, idParam) => {
        setTrackingState({ status: statusParam, id: idParam })
    }

    useEffect(() => {
        if (trackingState.status) {
            postOrderTracking(trackingState).then((res) => {
                getTrackingFunc();
                console.log(res, 'tracking response');
            }).catch((err) => {
                console.log(err, 'error');
            })
        }
    }, [trackingState]);


    //Pagination and Searching
    const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setPageNumber(selectedPage);
    };

    const itemsPerPage = 5;
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

    return (
        <React.Fragment>

            <section className='mainSection'>
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <img src={pharmacyPicLogo} alt="" />
                            <p>
                                Order Tracking
                            </p>
                        </div>
                        <div className="card cardForm">

                            <div className="card-body">
                                <div className="doctorAppointments">
                                    <input className="radio" value="pending" id="one" name="group" type="radio" defaultChecked onChange={trackingStateChange} />
                                    <input className="radio" value="accept" id="two" name="group" type="radio" onChange={trackingStateChange} />
                                    <input className="radio" value="dispatch" id="three" name="group" type="radio" onChange={trackingStateChange} />
                                    <input className="radio" value="dispatched" id="four" name="group" type="radio" onChange={trackingStateChange} />
                                    <input className="radio" value="delivered" id="five" name="group" type="radio" onChange={trackingStateChange} />
                                    <div className="tabs">
                                        <label className="tab" id="one-tab" htmlFor="one">New Order</label>
                                        <label className="tab" id="two-tab" htmlFor="two">On Going</label>
                                        <label className="tab" id="three-tab" htmlFor="three">Dispatch</label>
                                        <label className="tab" id="four-tab" htmlFor="four">On the way</label>
                                        <label className="tab" id="five-tab" htmlFor="five">Delivered</label>
                                    </div>
                                    {
                                        isLoader ?
                                            <Loader />
                                            :
                                            <div className="panels">
                                                <div className="panel" id="one-panel">
                                                    <div className="list-group">
                                                        {currentItems.map((item, keyId) => {
                                                            // let totalPrice = 0;
                                                            // item.products.forEach(product => {
                                                            //     totalPrice += product.total_amount;
                                                            // });

                                                            // console.log(item.id, 'idddd');
                                                            return (
                                                                <a key={keyId} className="list-group-item list-group-item-action">
                                                                    <div className="rewardList">

                                                                        <div className=" w-100">
                                                                            <h5 className="mb-1">{item.fullname}</h5>
                                                                        </div>
                                                                    </div>

                                                                    <div className='metaDatasDivOuter'>

                                                                        <div className="metaDatasDiv">

                                                                            <div>
                                                                                <p className="metaData"> Payment Method: {item.payment_method === 2 ? 'Online' : 'Cash'}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="metaData"> Total Price: Pkr {item.total_amount}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="metaData"> Address: {item.address}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="metaDatasDiv">
                                                                            {item.products.map((items, keyIds) => (
                                                                                <React.Fragment key={keyIds}>
                                                                                    <div>
                                                                                        <p className="metaData"> Product Name: {items.product_names}</p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <p className="metaData"> Product Quantity: {items.quantity}</p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <p className="metaData"> Product Code: {items.products_id}</p>
                                                                                    </div>
                                                                                    <br />
                                                                                    {/* <div>
                                                                                        <p className="metaData"> Price: {items.total_amount}</p>
                                                                                    </div> */}
                                                                                </React.Fragment>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                    <div className="metaButtons">
                                                                        <button className="acceptButton" onClick={() => onAcceptingItem('accept', item.id)}>Accept</button>
                                                                        {/* <button className="rejectButton" onClick={() => getInput('reject', item.id)}>Reject</button> */}
                                                                        <button className="rejectButton" onClick={() => onRejectingItem(item.id)}>Reject</button>
                                                                    </div>
                                                                </a>
                                                            )
                                                        })}

                                                    </div>
                                                </div>
                                                <div className="panel" id="two-panel">
                                                    <div className="list-group">
                                                        {currentItems.map((item, keyId) => {
                                                            // let totalPrice = 0;
                                                            // item.products.forEach(product => {
                                                            //     totalPrice += product.total_amount;
                                                            // });
                                                            return (

                                                                <a key={keyId} className="list-group-item list-group-item-action">
                                                                    <div className="rewardList">

                                                                        <div className=" w-100">
                                                                            <h5 className="mb-1">{item.fullname}</h5>
                                                                        </div>
                                                                    </div>

                                                                    <div className='metaDatasDivOuter'>

                                                                        <div className="metaDatasDiv">

                                                                            <div>
                                                                                <p className="metaData"> Payment Method: {item.payment_method === 2 ? 'Online' : 'Cash'}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="metaData"> Total Price: Pkr {item.total_amount}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="metaData"> Address: {item.address}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="metaDatasDiv">
                                                                            {item.products.map((items, keyIds) => (
                                                                                <React.Fragment key={keyIds}>
                                                                                    <div>
                                                                                        <p className="metaData"> Product Name: {items.product_names}</p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <p className="metaData"> Product Quantity: {items.quantity}</p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <p className="metaData"> Product Code: {items.products_id}</p>
                                                                                    </div>
                                                                                    <br />
                                                                                    {/* <div>
                                                                                        <p className="metaData"> Price: {items.total_amount}</p>
                                                                                    </div> */}
                                                                                </React.Fragment>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                    <div className="metaButtons">
                                                                        <button className="acceptButton" onClick={() => getInput('dispatch', item.id)}>Dispatch</button>

                                                                    </div>


                                                                </a>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                                <div className="panel" id="three-panel">
                                                    <div className="list-group">
                                                        {/* <a className="list-group-item list-group-item-action">
                                                    <div className="rewardList">

                                                        <div className=" w-100">
                                                            <h5 className="mb-1">Customer Name</h5>
                                                        </div>
                                                    </div>
                                                    <small>date</small>
                                                    <div className='metaDatasDivOuter'>

                                                        <div className="metaDatasDiv">
                                                            <div>
                                                                <p className="metaData"> Person Name: name</p>
                                                            </div>
                                                            <div>
                                                                <p className="metaData"> Payment Method: Cash</p>
                                                            </div>
                                                            <div>
                                                                <p className="metaData"> Total Price: Rs500</p>
                                                            </div>
                                                            <div>
                                                                <p className="metaData"> Address: Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti.</p>
                                                            </div>
                                                        </div>
                                                        <div className="metaDatasDiv">
                                                            <div>
                                                                <p className="metaData"> Product Name: name x 2</p>
                                                            </div>
                                                            <div>
                                                                <p className="metaData"> Product Code: 1234</p>
                                                            </div>
                                                            <div>
                                                                <p className="metaData"> SKU no.: 1234</p>
                                                            </div>
                                                            <div>
                                                                <p className="metaData"> Price: 200 Rs</p>
                                                            </div>
                                                        </div>
                                                        <div className="metaDatasDiv">
                                                            <div>
                                                                <p className="metaData"> Product Name: name x 2</p>
                                                            </div>
                                                            <div>
                                                                <p className="metaData"> Product Code: 1234</p>
                                                            </div>
                                                            <div>
                                                                <p className="metaData"> SKU no.: 1234</p>
                                                            </div>
                                                            <div>
                                                                <p className="metaData"> Price: 200 Rs</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="metaButtons">
                                                        <button className="acceptButton">Dispatched</button>

                                                    </div>

                                                </a> */}
                                                        {currentItems.map((item, keyId) => {

                                                            // let totalPrice = 0;
                                                            // item.products.forEach(product => {
                                                            //     totalPrice += product.total_amount;
                                                            // });
                                                            return (
                                                                <a key={keyId} className="list-group-item list-group-item-action">
                                                                    <div className="rewardList">

                                                                        <div className=" w-100">
                                                                            <h5 className="mb-1">{item.fullname}</h5>
                                                                        </div>
                                                                    </div>

                                                                    <div className='metaDatasDivOuter'>

                                                                        <div className="metaDatasDiv">

                                                                            <div>
                                                                                <p className="metaData"> Payment Method: {item.payment_method === 2 ? 'Online' : 'Cash'}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="metaData"> Total Price: Pkr {item.total_amount}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="metaData"> Address: {item.address}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="metaDatasDiv">
                                                                            {item.products.map((items, keyIds) => (
                                                                                <React.Fragment key={keyIds}>
                                                                                    <div>
                                                                                        <p className="metaData"> Product Name: {items.product_names}</p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <p className="metaData"> Product Quantity: {items.quantity}</p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <p className="metaData"> Product Code: {items.products_id}</p>
                                                                                    </div>
                                                                                    <br />
                                                                                    {/* <div>
                                                                                        <p className="metaData"> Price: {items.total_amount}</p>
                                                                                    </div> */}
                                                                                </React.Fragment>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                    <div className="metaButtons">
                                                                        <button className="acceptButton" onClick={() => getInput('dispatched', item.id)}>Dispatched</button>

                                                                    </div>

                                                                </a>

                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                                <div className="panel" id="four-panel">
                                                    <div className="list-group">
                                                        {currentItems.map((item, keyId) => {
                                                            console.log(item, 'panel2');
                                                            // let totalPrice = 0;
                                                            // item.products.forEach(product => {
                                                            //     totalPrice += product.total_amount;
                                                            // });
                                                            return (
                                                                <a key={keyId} className="list-group-item list-group-item-action">
                                                                    <div className="rewardList">

                                                                        <div className=" w-100">
                                                                            <h5 className="mb-1">{item.fullname}</h5>
                                                                        </div>
                                                                    </div>

                                                                    <div className='metaDatasDivOuter'>

                                                                        <div className="metaDatasDiv">

                                                                            <div>
                                                                                <p className="metaData"> Payment Method: {item.payment_method === 2 ? 'Online' : 'Cash'}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="metaData"> Total Price: Pkr {item.total_amount}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="metaData"> Address: {item.address}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="metaDatasDiv">
                                                                            {item.products.map((items, keyIds) => (
                                                                                <React.Fragment key={keyIds}>
                                                                                    <div>
                                                                                        <p className="metaData"> Product Name: {items.product_names}</p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <p className="metaData"> Product Quantity: {items.quantity}</p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <p className="metaData"> Product Code: {items.products_id}</p>
                                                                                    </div>
                                                                                    <br />
                                                                                    {/* <div>
                                                                                        <p className="metaData"> Price: {items.total_amount}</p>
                                                                                    </div> */}
                                                                                </React.Fragment>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                    <div className="metaButtons">
                                                                        <button className="acceptButton" onClick={() => getInput('delivered', item.id)}>Send</button>

                                                                    </div>

                                                                </a>
                                                            )
                                                        }
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="panel" id="five-panel">
                                                    <div className="list-group">
                                                        {currentItems.map((item, keyId) => {
                                                            // let totalPrice = 0;
                                                            // item.products.forEach(product => {
                                                            //     totalPrice += product.total_amount;
                                                            // });
                                                            return (
                                                                <a key={keyId} className="list-group-item list-group-item-action">
                                                                    <div className="rewardList">

                                                                        <div className=" w-100">
                                                                            <h5 className="mb-1">{item.fullname}</h5>
                                                                        </div>
                                                                    </div>

                                                                    <div className='metaDatasDivOuter'>

                                                                        <div className="metaDatasDiv">

                                                                            <div>
                                                                                <p className="metaData"> Payment Method: {item.payment_method === 2 ? 'Online' : 'Cash'}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="metaData"> Total Price: Pkr {item.total_amount}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="metaData"> Address: {item.address}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="metaDatasDiv">
                                                                            {item.products.map((items, keyIds) => (
                                                                                <React.Fragment key={keyIds}>
                                                                                    <div>
                                                                                        <p className="metaData"> Product Name: {items.product_names}</p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <p className="metaData"> Product Quantity: {items.quantity}</p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <p className="metaData"> Product Code: {items.products_id}</p>
                                                                                    </div>
                                                                                    <br />
                                                                                    {/* <div>
                                                                                        <p className="metaData"> Price: {items.total_amount}</p>
                                                                                    </div> */}
                                                                                </React.Fragment>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                    {/* <div className="metaButtons">
                                                            <button className="acceptButton">Delivered</button>

                                                        </div> */}

                                                                </a>
                                                            )
                                                        }
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                    }

                                </div>

                                <ReactPaginate
                                    pageCount={pageCount}
                                    onPageChange={handlePageClick}
                                    containerClassName={'pagination'}
                                    activeClassName={'active'}
                                />
                            </div>

                        </div>
                        <dialog id='physicalDoctorPatientId' className='CustomModal2'>
                            <div className="modalInner">

                                <button className='modalCloseButton' onClick={closePhysicalDoctorModal}>X</button>
                                <div className="modalContent">
                                    <div className="modalHeading">
                                        Reject
                                    </div>
                                    <hr />
                                    <div className="modalInnerContent">
                                        <div className="modalData">
                                            <p> Are You Sure?</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="modalInnerButton">
                                        <button className="yesButton" onClick={openReasonRejectionModal}>Yes</button>
                                        <button className="NoButton" onClick={closePhysicalDoctorModal}>No</button>
                                    </div>
                                </div>
                            </div>
                        </dialog>

                        <dialog id='reasonRejectionId' className='CustomModal2'>
                            <div className="modalInner">

                                <button className='modalCloseButton' onClick={closeReasonRejectionModal}>X</button>
                                <div className="modalContent">
                                    <div className="modalHeading">
                                        Reason?
                                    </div>
                                    <hr />
                                    <div className="modalInnerContent">
                                        <div className="modalData">
                                            <textarea name="reason" id="" placeholder="Enter Reason..." onChange={(e) => { setRejectingReason(e.target.value) }} />
                                        </div>
                                    </div>

                                    <div className="modalInnerButton">

                                        <button className="NoButton" onClick={postRejectOrder}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </section>

        </React.Fragment>
    )
}
