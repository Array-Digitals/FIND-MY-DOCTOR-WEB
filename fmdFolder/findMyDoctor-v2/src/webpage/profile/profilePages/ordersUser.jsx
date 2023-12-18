import React, { useEffect, useRef, useState } from 'react'
import UserData from '../../../services/userData'
import noDataImage from '../../../assets/images/noData.png'
import { Link } from 'react-router-dom';
import { ROUTING } from '../../BookLab/labImports';
import PharmacyBuy from '../../../services/pharmacy';
import InsuranceService from '../../../services/insurance'
import TokenService from '../../../services/token.service';

export const OrderUser = () => {
    const { LabBookingsActive, LabBookingsHistory, DoctorBookingsHistory, DoctorBookingActive } = UserData();
    const { getStorageData } = TokenService();
    const { getActivePharmBooking, getHistoryPharmBooking } = PharmacyBuy();
    const { getUserInsuranceBooking } = InsuranceService();
    const [labActive, setLabActive] = useState([]);
    const [labHistory, setLabHistory] = useState([]);
    const [docActive, setDocActive] = useState([]);
    const [docHistory, setDocHistory] = useState([]);
    const [pharmActive, setPharmActive] = useState([]);
    const [pharmHistory, setPharmHistory] = useState([]);
    const [insuranceUser, setInsuranceUser] = useState([])
    const [storageDate, setStorageData] = useState(getStorageData());
    // const radioOneRef = useRef();
    // const radioTwoRef = useRef();
    // const radioThreeRef = useRef();
    // const radioFourRef = useRef();
    // useEffect(() => {
    //     setStorageData(getStorageData())
    // }, [])

//   console.log(getStorageData(),'asddddd');

    const [currentRadio, setCurrentRadio] = useState('1');

    // useEffect(() => {
    //     console.log(currentRadio, 'currentttt');
    // }, [currentRadio])

    useEffect(() => {
        // if (currentRadio == "1") {
        DoctorBookingActive().then((res) => {
            // console.log(res, "active");
            setDocActive(res?.data?.data)
        }).catch((res) => {
            console.log(res);
        })

        DoctorBookingsHistory().then((res) => {
            // console.log(res?.data?.data, "history");
            setDocHistory(res?.data?.data)
        }).catch((res) => {
            console.log(res);
        })
        // }
    }, [])

    useEffect(() => {
        // if (currentRadio == "2") {
        LabBookingsActive().then((res) => {
            console.log(res?.data?.data, "active");
            // console.log(radioTwoRef.current.checked, "rdasdasdsdssssff");
            setLabActive(res?.data?.data)
        }).catch((res) => {
            console.log(res);
        })

        LabBookingsHistory().then((res) => {
            // console.log(res?.data?.data, "history");
            setLabHistory(res?.data?.data)
        }).catch((res) => {
            console.log(res);
        })
        // }
    }, [])
    // console.log(radioOneRef, 'redddddddfffff');


    useEffect(() => {
        // if (currentRadio == "3") {
        // console.log(radioOneRef.current.checked, "redff");
        getActivePharmBooking().then((res) => {
            // console.log(res?.data?.data, "active");
            setPharmActive(res?.data?.data)
        }).catch((res) => {
            console.log(res);
        })


        getHistoryPharmBooking().then((res) => {
            // console.log(res?.data?.data, "history");
            setPharmHistory(res?.data?.data)
        }).catch((res) => {
            console.log(res);
        })
        // }
    }, [])

    useEffect(() => {
        console.log(storageDate, 'idd');

        getUserInsuranceBooking(storageDate.id).then((res) => {
            setInsuranceUser(res?.data?.data)
            console.log(res, 'response...');
        }).catch((res)=>{
            console.log(res, 'error');
        })
    }, [])

    const getInput = (e) => {
        const inputField = e.target.name
        const inputValue = e.target.value
        setCurrentRadio(inputValue)


    }



    // console.log(docActive, docHistory,'doccc');
    return (
        <>
            <div className="profileWrapper">
                <div className="header">
                    <div className="heading">
                        <p className='mainHeading'>Orders</p>
                        <p>Manage Orders, your order Information at your fingertips.</p>
                    </div>
                </div>
                <div className="body">

                    <div className="doctorAppointments">
                        <input className="radio" value='1' id="one" name="group" type="radio" defaultChecked onChange={getInput} />
                        <input className="radio" value='2' id="two" name="group" type="radio" onChange={getInput} />
                        <input className="radio" value='3' id="three" name="group" type="radio" onChange={getInput} />
                        <input className="radio" id="four" name="group" type="radio" />
                        <input className="radio" id="five" name="group" type="radio" />
                        <div className="tabs">
                            <label className="tab" id="one-tab" htmlFor="one">Doctor</label>
                            <label className="tab" id="two-tab" htmlFor="two">Lab</label>
                            <label className="tab" id="three-tab" htmlFor="three">Pharmacy</label>
                            <label className="tab" id="four-tab" htmlFor="four">Insurance</label>

                        </div>
                        <div className="panels">
                            <div className="panel" id="one-panel">

                                <div className="accordion" id="accordionExample2">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseOne">
                                                Active Orders
                                            </button>
                                        </h2>
                                        <div id="collapseThree" className="accordion-collapse collapse show" data-bs-parent="#accordionExample2">
                                            <div className="accordion-body">
                                                {
                                                    docActive?.length === 0 ?
                                                        <div className="noDataImgDiv">
                                                            <img loading="lazy" className='noDataImage' src={noDataImage} alt="reload page" />
                                                        </div>
                                                        :
                                                        <div className='table-responsive'>
                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Name</th>
                                                                        <th scope="col">Appointment Type</th>
                                                                        <th scope="col">Consultant Type</th>
                                                                        <th scope="col">Amount</th>
                                                                        <th scope="col">Details</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        docActive?.map((item, keyId) => (
                                                                            <tr key={keyId}>
                                                                                <td>
                                                                                    {item.appointment_user}
                                                                                </td>
                                                                                <td>
                                                                                    {item.appoint_type}
                                                                                </td>
                                                                                <td>
                                                                                    {item.doctor_consultation_type}
                                                                                </td>
                                                                                <td>
                                                                                    {item.amount}
                                                                                </td>
                                                                                <td>
                                                                                    <Link to={`${ROUTING.DOCTOR_BOOKING}/${item?.id}`}>View</Link>
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseTwo">
                                                History Orders
                                            </button>
                                        </h2>
                                        <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
                                            <div className="accordion-body">

                                                <div className="accordion-body">
                                                    {
                                                        docHistory?.length === 0 ?
                                                            <div className="noDataImgDiv">
                                                                <img loading="lazy" className='noDataImage' src={noDataImage} alt="reload page" />
                                                            </div>
                                                            :
                                                            <div className='table-responsive'>
                                                                <table className="table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">Name</th>
                                                                            <th scope="col">Appointment Type</th>
                                                                            <th scope="col">Consultant Type</th>
                                                                            <th scope="col">Amount</th>
                                                                            <th scope="col">Details</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            docHistory?.map((item, keyId) => (
                                                                                <tr key={keyId}>
                                                                                    <td>
                                                                                        {item.appointment_user}
                                                                                    </td>
                                                                                    <td>
                                                                                        {item.appoint_type}
                                                                                    </td>
                                                                                    <td>
                                                                                        {item.doctor_consultation_type}
                                                                                    </td>
                                                                                    <td>
                                                                                        {item.amount}
                                                                                    </td>
                                                                                    <td>
                                                                                        <Link to={`${ROUTING.DOCTOR_BOOKING}/${item?.id}`}>View</Link>
                                                                                    </td>
                                                                                </tr>
                                                                            ))
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel" id="two-panel">
                                <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Active Orders
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                {
                                                    labActive?.length === 0 ?
                                                        <div className="noDataImgDiv">
                                                            <img loading="lazy" className='noDataImage' src={noDataImage} alt="reload page" />
                                                        </div>
                                                        :
                                                        <div className='table-responsive'>
                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Name</th>
                                                                        <th scope="col">Beneficiary</th>
                                                                        <th scope="col">Status</th>
                                                                        <th scope="col">Amount</th>
                                                                        <th scope="col">Details</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        labActive?.map((item, keyId) => (
                                                                            <tr key={keyId}>
                                                                                <td>
                                                                                    {item.name}
                                                                                </td>
                                                                                <td>
                                                                                    {item.is_beneficiary}
                                                                                </td>
                                                                                <td>
                                                                                    {item.b_status}
                                                                                </td>
                                                                                <td>
                                                                                    {item.amount}
                                                                                </td>
                                                                                <td>
                                                                                    <Link to={`${ROUTING.LAB_BOOKING}/${item?.id}`}>View</Link>
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                History Orders
                                            </button>
                                        </h2>
                                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                {
                                                    labHistory?.length === 0 ?
                                                        <div className="noDataImgDiv">
                                                            <img loading="lazy" className='noDataImage' src={noDataImage} alt="reload page" />
                                                        </div>

                                                        :
                                                        <div className='table-responsive'>
                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Name</th>
                                                                        <th scope="col">Beneficiary</th>
                                                                        <th scope="col">Status</th>
                                                                        <th scope="col">Amount</th>
                                                                        <th scope="col">Details</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        labHistory?.map((item, keyId) => (
                                                                            <tr key={keyId}>
                                                                                <td>
                                                                                    {item.name}
                                                                                </td>
                                                                                <td>
                                                                                    {item.is_beneficiary}
                                                                                </td>
                                                                                <td>
                                                                                    {item.b_status}
                                                                                </td>
                                                                                <td>
                                                                                    {item.amount}
                                                                                </td>
                                                                                <td>
                                                                                    <Link to={`${ROUTING.LAB_BOOKING}/${item?.id}`}>View</Link>
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    }

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel" id="three-panel">
                                <div className="accordion" id="accordionExample3">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
                                                Active Orders
                                            </button>
                                        </h2>
                                        <div id="collapseFive" className="accordion-collapse collapse show" data-bs-parent="#accordionExample3">
                                            <div className="accordion-body">
                                                {
                                                    pharmActive?.length === 0 ?
                                                        <div className="noDataImgDiv">
                                                            <img loading="lazy" className='noDataImage' src={noDataImage} alt="reload page" />
                                                        </div>
                                                        :
                                                        <div className='table-responsive'>
                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Order Id</th>
                                                                        <th scope="col">Name</th>
                                                                        <th scope="col">Rider</th>
                                                                        <th scope="col">Amount</th>
                                                                        {/* <th scope="col">Details</th> */}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        pharmActive?.map((item, keyId) => (
                                                                            <tr key={keyId}>
                                                                                <td>
                                                                                    {item.id}
                                                                                </td>
                                                                                <td>
                                                                                    {item.resepient_name}
                                                                                </td>
                                                                                <td>
                                                                                    {item.rider}
                                                                                </td>
                                                                                <td>
                                                                                    {item.amount}
                                                                                </td>
                                                                                {/* <td>
                                                                                    <Link to={`${ROUTING.DOCTOR_BOOKING}/${item?.id}`}>View</Link>
                                                                                </td> */}
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                                History Orders
                                            </button>
                                        </h2>
                                        <div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#accordionExample3">
                                            <div className="accordion-body">
                                                {
                                                    pharmActive?.length === 0 ?
                                                        <div className="noDataImgDiv">
                                                            <img loading="lazy" className='noDataImage' src={noDataImage} alt="reload page" />
                                                        </div>
                                                        :
                                                        <div className='table-responsive'>
                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Order Id</th>
                                                                        <th scope="col">Name</th>
                                                                        <th scope="col">Rider</th>
                                                                        <th scope="col">Amount</th>
                                                                        {/* <th scope="col">Details</th> */}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        pharmHistory?.map((item, keyId) => (
                                                                            <tr key={keyId}>
                                                                                <td>
                                                                                    {item.id}
                                                                                </td>
                                                                                <td>
                                                                                    {item.resepient_name}
                                                                                </td>
                                                                                <td>
                                                                                    {item.rider}
                                                                                </td>
                                                                                <td>
                                                                                    {item.amount}
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel" id="four-panel">

                                <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Active Orders
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">

                                            {
                                                    insuranceUser?.length === 0 ?
                                                        <div className="noDataImgDiv">
                                                            <img loading="lazy" className='noDataImage' src={noDataImage} alt="reload page" />
                                                        </div>
                                                        :
                                                        <div className='table-responsive'>
                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Name</th>
                                                                        <th scope="col">Provider</th>
                                                                        <th scope="col">Plan</th>
                                                                        <th scope="col">Amount</th>
                                                                        {/* <th scope="col">Details</th> */}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        insuranceUser?.map((item, keyId) => (
                                                                            <tr key={keyId}>
                                                                                <td>
                                                                                    {item.fullname}
                                                                                </td>
                                                                                <td>
                                                                                    {item.provider_name}
                                                                                </td>
                                                                                <td>
                                                                                    {item.plan_name}
                                                                                </td>
                                                                                <td>
                                                                                    {item.amount}
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                History Orders
                                            </button>
                                        </h2>
                                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">

                                                <div className="noDataImgDiv">
                                                    <img loading="lazy" className='noDataImage' src={noDataImage} alt="reload page" />
                                                </div>

                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default OrderUser