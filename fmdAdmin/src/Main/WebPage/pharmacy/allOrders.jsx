import React, { useEffect, useState } from 'react'
import pharmacyPicLogo from '../../../assets/images/Pharmacy.svg'
import pharmacyService from '../../../services/pharmacy';
import ReactPaginate from 'react-paginate';

export const AllOrders = () => {

    const { getOrderCompletion } = pharmacyService();

    // Modal open and close 
    const openPhysicalDoctorModal = () => {
        const myDialog = document.getElementById('physicalDoctorPatientId');
        myDialog.showModal();
    };
    const closePhysicalDoctorModal = () => {
        const myDialog = document.getElementById('physicalDoctorPatientId');
        myDialog.close();
    };

    const [currentOrders, setCurrentOrders] = useState(2);

    // console.log(currentOrders, 'asdjk');
    const [data, setOrderData] = useState([])

    useEffect(() => {
        getOrderCompletion(currentOrders).then((res) => {
            console.log(res?.data?.data, 'dataa');
            setOrderData(res?.data?.data)
        }).catch((res) => {
            console.log(res, 'error');
        })
    }, [currentOrders])

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
                                    <input className="radio" id="one" name="group" onChange={() => setCurrentOrders(2)} type="radio" defaultChecked />
                                    <input className="radio" id="two" name="group" onChange={() => setCurrentOrders(3)} type="radio" />

                                    <div className="tabs">
                                        <label className="tab" id="one-tab" htmlFor="one">Accepted</label>
                                        <label className="tab" id="two-tab" htmlFor="two">Rejected</label>
                                    </div>
                                    <div className="panels">
                                        <div className="panel" id="one-panel">
                                            <div className="list-group">

                                                {currentItems.map((item, keyId) => {
                                                    let totalPrice = 0;
                                                    item.products.forEach(product => {
                                                        totalPrice += product.total_amount;
                                                    });

                                                    console.log(item.id, 'idddd');
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
                                                                        <p className="metaData"> Total Price: Pkr {totalPrice}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="metaData"> Address: {item.address}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="metaDatasDiv">
                                                                    {item.products.map((items, keyIds) => (
                                                                        <React.Fragment key={keyIds}>
                                                                            <div>
                                                                                <p className="metaData"> Product Name: {items.product_names} x {items.quantity}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="metaData"> Product Code: {items.products_id}</p>
                                                                            </div>
                                                                            {/* <div>
                                                                                <p className="metaData"> Price: {items.total_amount}</p>
                                                                            </div> */}
                                                                        </React.Fragment>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </a>
                                                    )
                                                })}



                                            </div>
                                        </div>
                                        <div className="panel" id="two-panel">

                                            <div className="list-group">
                                            {currentItems.map((item, keyId) => {
                                                    let totalPrice = 0;
                                                    item.products.forEach(product => {
                                                        totalPrice += product.total_amount;
                                                    });

                                                    console.log(item.id, 'idddd');
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
                                                                        <p className="metaData"> Total Price: Pkr {totalPrice}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="metaData"> Address: {item.address}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="metaData"> Reason: {item.reason}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="metaDatasDiv">
                                                                    {item.products.map((items, keyIds) => (
                                                                        <React.Fragment key={keyIds}>
                                                                            <div>
                                                                                <p className="metaData"> Product Name: {items.product_names} x {items.quantity}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="metaData"> Product Code: {items.products_id}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="metaData"> Price: {items.total_amount}</p>
                                                                            </div>
                                                                        </React.Fragment>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </a>
                                                    )
                                                })}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ReactPaginate
                                    pageCount={pageCount}
                                    onPageChange={handlePageClick}
                                    containerClassName={'pagination'}
                                    activeClassName={'active'}
                                />
                            </div>
                        </div>

                        <dialog id='physicalDoctorPatientId' className='CustomModal'>
                            <div className="modalInner">

                                <button className='modalCloseButton' onClick={closePhysicalDoctorModal}>X</button>
                                <div className="modalContent">
                                    <div className="modalHeading">
                                        Reason
                                    </div>
                                    <hr />
                                    <div className="modalInnerContent">
                                        <div className="modalData">
                                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus hic tenetur magni amet numquam! Non molestiae inventore exercitationem rem adipisci mollitia. Cum vitae quisquam assumenda, aliquam fugit dolorum esse eaque quos nesciunt sit reprehenderit ab, earum odio! Reiciendis, vel debitis?</p>

                                        </div>
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
