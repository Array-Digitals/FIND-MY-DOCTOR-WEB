import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import reportImageLogo from '../../../assets/images/Repot.svg'
import reportServices from '../../../services/reportingService';


export const DoctorReport = () => {

    const { doctorPhysicalReportGet, doctorOnlineReportGet, doctorPatientsGet } = reportServices()
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])

    useEffect(() => {
        doctorPhysicalReportGet().then((res) => {
            setData(res?.data?.data)
            console.log(res, 'response');
        }).catch((res) => {
            console.log(res, 'error');
        })
        doctorOnlineReportGet().then((res) => {
            setData2(res?.data?.data)
            // console.log(res, 'response');
        }).catch((res) => {
            console.log(res, 'error');
        })
    }, [])

    // Physical Doctor ALL data 
    // const data = [
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "2", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "3", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "4", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "5", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "6", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "7", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    // ]

    // Physical Doctor ALL data 
    // const data2 = [
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "1", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "2", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "3", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "4", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "5", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "6", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    //     { name: "doctor", id: "7", date: "doctor Registered Date", Qualification: "qualification", city: "city", patients_treated: 14, total_Rejection: "rejected Patient", pending_Order: "orderPending", totalCommissionEarned: "424" },
    // ]

    // related to pagination and search of physcial doctor
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
            item.fullname.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return item;
        }
    }).slice(startIndex, endIndex);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPageNumber(0);
    };

    // related to pagination and search of physcial doctor
    const [searchTerm2, setSearchTerm2] = useState('');
    const [pageNumber2, setPageNumber2] = useState(0);
    const handlePageClick2 = (data2) => {
        const selectedPage2 = data2.selected;
        setPageNumber2(selectedPage2);
    };
    const itemsPerPage2 = 8;
    const startIndex2 = pageNumber2 * itemsPerPage2;
    const endIndex2 = startIndex2 + itemsPerPage2;
    const pageCount2 = Math.ceil(data2.length / itemsPerPage2);
    const currentItems2 = data2.filter((item) => {
        if (searchTerm2 === '') {
            return item;
        } else if (
            item.fullname.toLowerCase().includes(searchTerm2.toLowerCase())
        ) {
            return item;
        }
    }).slice(startIndex2, endIndex2);
    const handleSearch2 = (event) => {
        setSearchTerm2(event.target.value);
        setPageNumber2(0);
    };




    const [allPatient, setAllPatient] = useState([])

    console.log(allPatient, 'asdddd');

    const fetchData = async (bookId, docId) => {
        return doctorPatientsGet(bookId, docId).then((res) => {
            return res.data.data;
        }).catch((res) => {
            console.log(res, 'error');
        })
    };



    const openPhysicalDoctorModal = (bookingIds, docId) => {
        const myDialog = document.getElementById('physicalDoctorPatientId');
        myDialog.showModal();

        const bookingIdsArray = bookingIds.split(',');

        const fetchAllData = async () => {
            const patientsData = [];

            for (const bookId of bookingIdsArray) {
                try {
                    const data = await fetchData(bookId, docId);
                    patientsData.push(data);
                } catch (error) {
                    console.log(`Error fetching data for booking ID ${bookId}:`, error);
                }
            }

            setAllPatient(patientsData.flat());
            console.log('All patients data:', patientsData.flat());
        };

        fetchAllData();
    };

    const closePhysicalDoctorModal = () => {
        const myDialog = document.getElementById('physicalDoctorPatientId');
        myDialog.close();
    };



    function DateFormater(inputDate) {
        const originalDate = new Date(inputDate);
        const day = String(originalDate.getDate()).padStart(2, '0');
        const month = String(originalDate.getMonth() + 1).padStart(2, '0'); // Note: Months are zero-based, so we add 1
        const year = originalDate.getFullYear();
        return `${day}/${month}/${year}`;
    }



    return (
        <React.Fragment>
            <section className='mainSection'>
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <img src={reportImageLogo} alt="" />
                            <p>
                                Doctor Report
                            </p>
                        </div>
                        <div className="card cardForm">
                            <div className="card-body">
                                <div className="tableSearch2">
                                    <div className="tableInnerHeading">
                                        Physical Doctor
                                    </div>
                                    <input type="text" placeholder="Search..." onChange={handleSearch} />
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Registered ID</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Qualification</th>
                                                {/* <th scope="col">City</th> */}
                                                <th scope="col">Patients Treated</th>
                                                {/* <th scope="col">Total Rejection</th> */}
                                                <th scope="col">Pending Order</th>
                                                <th scope="col">Total Earning</th>
                                                <th scope="col">Patients</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.map((item, keyid) => {
                                                // console.log(item, 'itemm');
                                                const formattedDate = DateFormater(item.reg_date)
                                                return (
                                                    <tr key={keyid}>
                                                        <td>{item?.doc_id}</td>
                                                        <td>{item?.fullname}</td>
                                                        <td>{formattedDate}</td>
                                                        <td>{item?.qualification}</td>
                                                        {/* <td>{item?.city}</td> */}
                                                        <td>{item?.patients_treated}</td>
                                                        {/* <td>{item?.total_Rejection}</td> */}
                                                        <td>{item?.pending_order}</td>
                                                        <td>{item?.total_earned}</td>
                                                        <td><button onClick={() => openPhysicalDoctorModal(item.booking_ids, item.doc_id)}>View Patients</button></td>
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
                        <dialog id='physicalDoctorPatientId' className='CustomModal'>
                            <div className="modalInner">

                                <button className='modalCloseButton' onClick={closePhysicalDoctorModal}>X</button>
                                <div className="modalContent">
                                    <div className="modalHeading">
                                        Patients
                                    </div>
                                    <hr />
                                    <div className="modalInnerContent">
                                        {
                                            allPatient.map((item, keyId) => (
                                                <React.Fragment>
                                                    <div className="modalData" key={keyId}>
                                                        <p>Patient Id: {item.id}</p>
                                                        <p>Patient Name: {item.fullname}</p>
                                                        <p>Patient Status: {item.b_status}</p>
                                                    </div>

                                                    <hr />
                                                </React.Fragment>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </dialog>

                        <div className="card cardForm lowerCardTable">
                            <div className="card-body">
                                <div className="tableSearch2">
                                    <div className="tableInnerHeading">
                                        Online Doctor
                                    </div>
                                    <input type="text" placeholder="Search..." onChange={handleSearch2} />
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Registered ID</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Qualification</th>
                                                {/* <th scope="col">City</th> */}
                                                <th scope="col">Patients Treated</th>
                                                {/* <th scope="col">Total Rejection</th> */}
                                                <th scope="col">Pending Order</th>
                                                <th scope="col">Total Commission Earned</th>
                                                <th scope="col">Patients</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems2.map((item, keyid) => {
                                                // console.log(item, 'itemm');
                                                const formattedDate = DateFormater(item.reg_date)
                                                return (
                                                    <tr key={keyid}>
                                                        <td>{item?.doc_id}</td>
                                                        <td>{item?.fullname}</td>
                                                        <td>{formattedDate}</td>
                                                        <td>{item?.qualification}</td>
                                                        {/* <td>{item?.city}</td> */}
                                                        <td>{item?.patients_treated}</td>
                                                        {/* <td>{item?.total_Rejection}</td> */}
                                                        <td>{item?.pending_order}</td>
                                                        <td>{item?.total_earned}</td>
                                                        <td><button onClick={() => openPhysicalDoctorModal(item.booking_ids, item.doc_id)}>View Patients</button></td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <ReactPaginate
                                    pageCount={pageCount2}
                                    onPageChange={handlePageClick2}
                                    containerClassName={'pagination'}
                                    activeClassName={'active'}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
