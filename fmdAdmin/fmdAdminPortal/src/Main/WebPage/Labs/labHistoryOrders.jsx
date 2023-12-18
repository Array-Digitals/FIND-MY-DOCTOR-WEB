import React from 'react'
import { useNavigate, useParams } from 'react-router';
import AdminService from '../../../services/adminApi';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import noData from '../../../assets/images/noData.png'
import { ROUTES } from '../../../utils/Routes';

export const LabHistoryOrders = () => {
    let { LabPersonalId } = useParams();
    const { getAppointmentHistoryOrders } = AdminService();
    const [testDetail, setTestDetail] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAppointmentHistoryOrders(LabPersonalId).then((res) => {
            setTestDetail(res?.data?.data);
            console.log(res?.data?.data);
        }).catch((err) => {
            console.log(err);
        })
    })
    return (
        <React.Fragment>
            <div>
                <section className='mainSection'>
                    <div className="container">
                        <div className="mainSectionWrapper">
                            <div className="heading">
                                <p>
                                    <button className='navigateBackButton' onClick={() => { navigate(-1) }}><i class="ri-arrow-left-line"></i></button>    Completed Orders
                                </p>
                            </div>
                            <div className="card cardForm">
                                <div className="card-body">
                                {
                                        testDetail.length === 0 ?
                                            <div className="dataNotFoundDiv">
                                                <img className='dataNotFoundImg' src={noData} alt="" />
                                            </div>
                                            :
                                    <div className="appointmentDetails ">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Order ID</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Beneficiary</th>
                                                        <th scope="col">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {testDetail.map((item, keyId) => {
                                                        return (
                                                            <tr key={keyId}>

                                                                <td>{keyId}</td>
                                                                <td> {item?.name}</td>
                                                                <td>{item?.amount}</td>
                                                                <td>{item?.is_beneficiary}</td>
                                                                <td>{item?.b_status}</td>
                                                            </tr>
                                                        )
                                                    })}


                                                </tbody>

                                            </table>
                                        </div>
{/* 
                                        {testDetail.map((item, keyId) => (
                                            <div className="mainBody">
                                                <div className="mainBodySection">
                                                    <div className="subHeading">
                                                        Order ID: <span> {item?.id} </span>
                                                    </div>
                                                    <div className="subHeading">
                                                        Name: <span> {item?.name} </span>
                                                    </div>
                                                    <div className="subHeading">
                                                        Amount: <span> {item?.amount} </span>
                                                    </div>
                                                    <div className="subHeading">
                                                        For Beneficiary: <span> {item?.is_beneficiary} </span>
                                                    </div>
                                                    <div className="subHeading">
                                                        Status: <span> {item?.b_status} </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))} */}


                                    </div>
}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}
