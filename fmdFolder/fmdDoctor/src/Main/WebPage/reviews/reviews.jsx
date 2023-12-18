import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import TokenService from '../../../services/tokenService';
import DoctorService from '../../../services/doctorService';
import dataNotFound from '../../../assets/images/noData.png'


const Reviews = () => {

    const { getDoctorData } = TokenService();
    const { getDoctorReviews } = DoctorService();
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([])
    useEffect(() => {
        fetchData()
    }, []);
    const fetchData = () => {
        console.log(getDoctorData, 'docc');
        getDoctorReviews(getDoctorData().id)
            .then((res) => {
                console.log(res.data.data, 'reviewwss')
                setData(res?.data?.data);
            })
            .catch((error) => {
                console.log(error);
            });
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

    return (
        <React.Fragment>
            <section className='mainSection'>
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <p>
                                Your Review
                            </p>
                        </div>
                        <div className="card cardForm">
                            <div className="card-body">
                                {
                                    currentItems.length > 0 ?
                                        <React.Fragment>
                                            <div className="tableSearch">
                                                <input type="text" placeholder="Search..." onChange={handleSearch} />
                                            </div>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Email</th>
                                                            <th scope="col">Phone Number</th>
                                                            <th scope="col">Review Message</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {currentItems.map((item, keyid) => {
                                                            return (
                                                                <tr key={keyid}>
                                                                    <td>{item?.rid}</td>
                                                                    <td>{item?.name}</td>
                                                                    <td>{item?.email}</td>
                                                                    <td>{item?.phone}</td>
                                                                    <td>{item?.review_comment}</td>
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
                                        </React.Fragment>
                                        :
                                        <div className="dataNotFoundDiv">
                                            <img className='dataNotFoundImg' src={dataNotFound} alt="" />
                                        </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </React.Fragment>
    )
}

export default Reviews