import React, { useEffect, useState } from 'react'
import AdminService from '../../../services/adminApi';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { ROUTES } from '../../../utils/Routes';

const AllLabTests = () => {
    const { getLab, getSingleCity } = AdminService();
    const [allLabs, setAllLabs] = useState([]);
    const [LabData, setLabData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getLab()
            .then((res) => {
                console.log(res);
                setAllLabs(res?.data?.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const fetchCityData = async () => {
            const promises = allLabs.map(async (item) => {
                const city = item?.city;

                try {
                    const res = await getSingleCity(city);
                    const cityData = res?.data?.data;
           
                    if (cityData && cityData.length > 0) {
                        const updatedLab = { ...item, cityName: cityData[0].name };
                        return updatedLab;
                    }
                    return item;
                } catch (error) {
                    console.log(error);
                    return item;
                }
            });

            try {
                const results = await Promise.all(promises);
                setLabData(results);
            } catch (error) {
                console.log(error);
            }
        };

        if (allLabs.length > 0) {
            fetchCityData();
        }
    }, [allLabs]);

    // Logging the updated LabData
    // useEffect(() => {
    //     console.log(LabData);
    // }, [LabData]);



    const [pageNumber, setPageNumber] = useState(0);
    const handlePageClick = (LabData) => {
        const selectedPage = LabData.selected;
        setPageNumber(selectedPage);
    };

    const itemsPerPage = 5;
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageCount = Math.ceil(LabData.length / itemsPerPage);
    const currentItems = LabData.filter((item) => {
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

    return (
        <React.Fragment>
            <div>
                <section className='mainSection'>
                    <div className="container">
                        <div className="mainSectionWrapper">
                            <div className="heading">
                                <p>
                                    Lab Orders
                                </p>
                            </div>
                            <div className="card cardForm">
                                <div className="card-body">
                                    <div className="doctorAppointments">
                                        <div className="searchBar">
                                            <input type="text" placeholder='Search' onChange={handleSearch}/>
                                        </div>
                                        <div className="panels">
                                            <div className="labTestPanel">

                                                <div className="list-group">

                                                    {
                                                        currentItems.map((item, keyId) => (
                                                            <div key={keyId} className="list-group-item list-group-item-action">
                                                                <div className="rewardList">

                                                                    <div className=" w-100">
                                                                        <h5 className="mb-1">{item?.name}</h5>
                                                                        {/* <p className="mb-1">Booking Details comes here</p> */}
                                                                    </div>
                                                                </div>
                                                                <small>Id: {item?.id}</small>
                                                                <div className="metaDatasDiv">
                                                                    <div>
                                                                        <p className="metaData"> Phone: {item?.phone}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="metaData"> email: {item?.email}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="metaData"> city: {item?.cityName}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="metaData"> Lab Address: {item?.lab_address}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="metaButtons">
                                                                    <Link to={`/${ROUTES?.CURRENT_ORDERS_LAB}/${item?.lab_id}`} className='viewButton'> View Orders</Link>
                                                                    <Link to={`/${ROUTES?.HISTORY_ORDERS_LAB}/${item?.lab_id}`} className="acceptButton" >Completed Orders</Link>
                                                                </div>
                                                            </div>
                                                        ))
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}

export default AllLabTests