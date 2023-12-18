import React, { useEffect, useState, useRef } from 'react'
import UserData from '../../../services/userData'
import { Link, useNavigate } from 'react-router-dom';
import noDataImage from '../../../assets/images/noData.png'
import { ROUTING } from '../../BookDoctor/doctorImport';
 const Beneficiary = () => {
    const formRef1 = useRef(null);
    const formRef = useRef(null);
    const navigate = useNavigate();

    const [getSingleBeneficiary, setGetSingleBeneficiary] = useState();
    const { postBeneficiary, getBeneficiary, deleteBeneficiaryAPI, getSingleBeneficiaryApi } = UserData();
    const [beneficiaryTableData, setbeneficiaryTableData] = useState([])
    const [cnicError, setCnicError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [beneficiarySingleData, setBeneficiarySingleData] = useState([]);
    const [beneficiary, setBeneficiary] = useState({
        fullname: "",
        relation: "",
        nick: "",
        gender: "1",
        dob: "",
        phone: "",
        city: "",
        address: "",
        policyno: "",
        cnic: "",
    })

    const beneficiaryInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'cnic') {
            const cnicValue = value.trim();
            // Check if the value is empty or exactly 13 characters long
            if (cnicValue === '' || cnicValue.length === 13) {
                setCnicError(false);
                setSubmitButtonDisabled(false);
            } else {
                setCnicError(true);
                setSubmitButtonDisabled(true);
            }
        }
        if (name === 'phone') {
            const phoneValue = value.trim();
            // Check if the value is empty or exactly 13 characters long
            if (phoneValue.length === 11 || phoneValue.length === 12) {
                setPhoneError(false);
                setSubmitButtonDisabled(false);
            } else {
                setPhoneError(true);
                setSubmitButtonDisabled(true);
            }
        }

        setBeneficiary({ ...beneficiary, [name]: value })
    }

    const closeButtonModalFunc = () => {
        let closeButton = document.getElementById('model22CloseButton');
        if (closeButton) {
            closeButton.click();
        }
        console.log('buttonClick Workinggggggg');
    }
    const submitForm = (e) => {
        e.preventDefault();
        const beneficiaryData = { ...beneficiary }
        // console.log(beneficiaryData)
        console.log('submitting Working');
        postBeneficiary(beneficiaryData).then((res) => {

            formRef.current.reset();
            formRef1.current.reset();
            console.log('response Working');
            closeButtonModalFunc();
        }).catch((err) => {
            console.log(err.message)
        })

    }

    const setDeleteBeneficiary = (id) => {
        setGetSingleBeneficiary(id)
    }

    const deleteBeneficiary = () => {

        console.log(getSingleBeneficiary, "heyeyee")
        deleteBeneficiaryAPI({ "id": getSingleBeneficiary }).then((res) => {
            console.log(res)
        }).catch((res) => {
            console.log(res)
        })
    }

    useEffect(() => {
        getBeneficiary().then((res) => {
            setbeneficiaryTableData(res?.data?.data)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [beneficiaryTableData])

    useEffect(() => {
        getSingleBeneficiaryApi(getSingleBeneficiary).then((res) => {
            setBeneficiarySingleData(res?.data?.data[0])
            console.log(res?.data?.data[0], 'resss');
        }).catch((err) => {
            console.log(err, 'err');
        })
    }, [getSingleBeneficiary])
    return (
        <>
            <div className="profileWrapper">
                <div className="header">
                    <div className="heading">
                        <p className='mainHeading'>Beneficiaries</p>
                        <p>Beneficiaries, your well-being is our top priority.</p>
                    </div>
                    <div className="headerButton">
                        <button data-bs-toggle="modal" data-bs-target="#exampleModal">Add Beneficiary</button>
                    </div>

                </div>
                <div className="body">
                    {
                        beneficiaryTableData.length === 0 ?
                            <div className="noDataImgDiv">
                                <img loading="lazy" className='noDataImage' src={noDataImage} alt="reload page" />
                            </div>

                            :
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Relationship</th>
                                            {/* <th>Gender</th> */}
                                            <th>Phone</th>
                                            {/* <th>Policy</th> */}
                                            {/* <th>DOB</th> */}
                                            {/* <th>City</th> */}
                                            {/* <th>Address</th> */}
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {beneficiaryTableData?.map((item, keyid) => {
                                            return (
                                                <tr key={keyid}>
                                                    <td>{item?.fullname}</td>
                                                    <td>{item?.relation}</td>
                                                    {/* <td>{item?.gender === '1' ? 'male' : (item?.gender === '0' ? 'female' : '')}</td> */}
                                                    <td>{item?.phone}</td>
                                                    {/* <td>{item?.policyno}</td> */}
                                                    {/* <td>{item?.dob}</td> */}
                                                    {/* <td>{item?.city}</td> */}
                                                    {/* <td>{item?.address}</td> */}
                                                    <td>
                                                        {/* <Link data-bs-toggle="modal" data-bs-target="#beneUpdateModalId" onClick={() => { setDeleteBeneficiary(item?.id) }}><i className="bi bi-pen edit" /></Link>                                                        <Link onClick={() => {console.log('clicked')}}><i className="bi bi-pen edit" /></Link> */}
                                                        <Link data-bs-toggle="modal" data-bs-target="#warningModal" onClick={() => { setDeleteBeneficiary(item?.id) }}><i className="bi bi-trash3 delete" /></Link>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                    }
                </div>

                {/* Add BeneficiaryModal  */}
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable beneficiaryPopupMain">
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add Beneficiary</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form ref={formRef1} className="formBody" onSubmit={submitForm}>
                                        <div className="formRow">
                                            <label className="label">Name</label>
                                            <div className="formInput">
                                                <input type="text" placeholder='Enter Name' name='fullname' onChange={beneficiaryInput} required />
                                            </div>
                                        </div>
                                        <div className={`formRow ${phoneError ? 'error' : ''}`}>
                                            <label className="label">Phone Number</label>
                                            <div className="formInput formInputRelative">
                                                <input type="number" placeholder='Enter Phone Number' name='phone' onChange={beneficiaryInput} required />
                                                {phoneError && <p className="errorMessage">Enter Valid Phone Number</p>}

                                            </div>
                                        </div>
                                        <div className="formRow">
                                            <label className="label">Relationship</label>
                                            <div className="formInput">
                                                <input type="text" placeholder='Enter RelationShip' name='relation' onChange={beneficiaryInput} required />
                                            </div>
                                        </div>
                                        <div className={`formRow ${cnicError ? 'error' : ''}`}>
                                            <label className="label">CNIC</label>
                                            <div className="formInput formInputRelative">
                                                <input type="number" placeholder='Enter CNIC Number' name='cnic' onChange={beneficiaryInput} />
                                                {cnicError && <p className="errorMessage">CNIC should be 13 numbers</p>}
                                            </div>
                                        </div>
                                        <div className="formRow">
                                            <label className="label">Policy Number</label>
                                            <div className="formInput">
                                                <input type="text" placeholder='Enter Policy Number' name='policyno' onChange={beneficiaryInput} />
                                            </div>
                                        </div>
                                        <div className="formRow">
                                            <label className="label">Nick</label>
                                            <div className="formInput" >
                                                <input type="text" placeholder='Enter nick name' name='nick' onChange={beneficiaryInput} />
                                            </div>
                                        </div>
                                        <div className="formRow">
                                            <label className="label">Gender</label>
                                            <div className="formInput">
                                                <select name="gender" onChange={beneficiaryInput}>
                                                    <option value="1">male</option>
                                                    <option value="0">female</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="formRow">
                                            <label className="label">Date of Birth</label>
                                            <div className="formInput">
                                                <input type="date" placeholder='Enter Date of Birth' name='dob' onChange={beneficiaryInput} />
                                            </div>
                                        </div>
                                        <div className="formRow">
                                            <label className="label">City</label>
                                            <div className="formInput">
                                                <input type="text" placeholder='Enter City' name='city' onChange={beneficiaryInput} />
                                            </div>
                                        </div>
                                        <div className="formRow">
                                            <label className="label">Address</label>
                                            <div className="formInput">
                                                <input type="text" placeholder='Enter Address' name='address' onChange={beneficiaryInput} />
                                            </div>
                                        </div>
                                        <div className={`formButtonRow ${submitButtonDisabled ? 'beneErrorButton' : ''} `}>
                                            <button type='submit' disabled={submitButtonDisabled}>Submit</button>

                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <button id='model22CloseButton' data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ display: "none" }}></button>

                {/* Update Beneficiary Modal  */}
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable beneficiaryPopupMain">
                    <div className="modal fade" id="beneUpdateModalId" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add Beneficiary</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form ref={formRef} className="formBody" onSubmit={submitForm}>
                                        <div className="formRow">
                                            <label className="label">Name</label>
                                            <div className="formInput">
                                                <input type="text" placeholder={beneficiarySingleData?.fullname} name='fullname' onChange={beneficiaryInput} required />
                                            </div>
                                        </div>
                                        <div className={`formRow ${phoneError ? 'error' : ''}`}>
                                            <label className="label">Phone Number</label>
                                            <div className="formInput formInputRelative">
                                                <input type="number" placeholder={beneficiarySingleData?.phone} name='phone' onChange={beneficiaryInput} required />
                                                {phoneError && <p className="errorMessage">Enter Valid Phone Number</p>}

                                            </div>
                                        </div>
                                        <div className="formRow">
                                            <label className="label">RelationShip</label>
                                            <div className="formInput">
                                                <input type="text" placeholder={beneficiarySingleData?.relation} name='relation' onChange={beneficiaryInput} required />
                                            </div>
                                        </div>
                                        <div className={`formRow ${cnicError ? 'error' : ''}`}>
                                            <label className="label">CNIC</label>
                                            <div className="formInput formInputRelative">
                                                <input type="number" placeholder={beneficiarySingleData?.cnic} name='cnic' onChange={beneficiaryInput} />
                                                {cnicError && <p className="errorMessage">CNIC should be 13 numbers</p>}
                                            </div>
                                        </div>
                                        <div className="formRow">
                                            <label className="label">Policy Number</label>
                                            <div className="formInput">
                                                <input type="text" placeholder={beneficiarySingleData?.policyno} name='policyno' onChange={beneficiaryInput} />
                                            </div>
                                        </div>
                                        <div className="formRow">
                                            <label className="label">Nick</label>
                                            <div className="formInput" >
                                                <input type="text" placeholder={beneficiarySingleData?.nick} name='nick' onChange={beneficiaryInput} />
                                            </div>
                                        </div>
                                        {/* <div className="formRow">
                                            <label className="label">Gender</label>
                                            <div className="formInput">
                                                <select name="gender" onChange={beneficiaryInput} value={beneficiarySingleData?.gender}>
                                                    <option value="1">male</option>
                                                    <option value="0">female</option>
                                                </select>
                                            </div>
                                        </div> */}
                                        {/* <div className="formRow">
                                            <label className="label">Date of Birth</label>
                                            <div className="formInput">
                                                <input type="date" value={beneficiarySingleData?.dob} name='dob' onChange={beneficiaryInput} />
                                            </div>
                                        </div> */}
                                        <div className="formRow">
                                            <label className="label">City</label>
                                            <div className="formInput">
                                                <input type="text" placeholder={beneficiarySingleData?.city} name='city' onChange={beneficiaryInput} />
                                            </div>
                                        </div>
                                        <div className="formRow">
                                            <label className="label">Address</label>
                                            <div className="formInput">
                                                <input type="text" placeholder={beneficiarySingleData?.address} name='address' onChange={beneficiaryInput} />
                                            </div>
                                        </div>
                                        <div className={`formButtonRow ${submitButtonDisabled ? 'beneErrorButton' : ''} `}>
                                            <button type='submit' disabled={submitButtonDisabled}>Submit</button>

                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <button id='model22CloseButton' data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ display: "none" }}></button>

                {/* Warning Modal  */}
                <div className="modal fade" id="warningModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Delete</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to Delete?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={deleteBeneficiary}>Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Beneficiary
