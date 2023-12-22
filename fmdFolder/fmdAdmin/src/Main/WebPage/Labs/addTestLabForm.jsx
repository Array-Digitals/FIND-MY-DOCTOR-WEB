import React, { useEffect, useState } from 'react'
import AdminService from '../../../services/adminApi';
import { toast, ToastContainer } from 'react-toastify';

export const AddTestLabForm = () => {

    const { getAllTest, getLab, testRegister, bulkUploadTest, testToLabRegister } = AdminService();
    const [labName, setLabName] = useState([]);
    const [allTest, setAllTest] = useState([]);
    const [isBulk, setIsBulk] = useState(false);

    const [TestToLab, setTestToLab] = useState({
        test: 0,
        time: "00:00",
        lab: 0,
        amount: "",
        csvFile: ""
    })

    const [csvFile, setCsvFile] = useState()
    const getLoginInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setTestToLab({ ...TestToLab, [name]: value })
    }
    const getUploadingFunc = (e) => {
        // const name = e.target.name;
        const value = e.target.value;
        if (value === 'singleUpload') {
            setIsBulk(false);
        }
        else {
            setIsBulk(true)
        }
    }
    const formSubmit = (e) => {
        e.preventDefault()
        if(!isBulk){
            const testToLabSubmit = {...TestToLab }
            console.log(testToLabSubmit)
            testToLabRegister(testToLabSubmit).then((res) => {
                console.log(res)
                toast.success('Test Added');
            }).catch((err) => {
                console.log(err.message)
            })
        }
        else{
            const formData = new FormData()
            formData.set('csvFile', csvFile);
            formData.set('labId', TestToLab.lab);
            console.log(formData, 'foommmm');
            bulkUploadTest(formData).then((res) => {
                console.log(res, 'response');
            }).catch((res) => {
                console.log(res.response, 'error');
            })
        }
    }

    useEffect(() => {
        getAllTest().then((res) => {
            console.log(res)
            setAllTest(res?.data?.data);
        }).catch((error) => {
            console.log(error);
        });

        getLab().then((res) => {
            console.log(res)
            setLabName(res?.data?.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);




    return (
        <React.Fragment>
            <section className='mainSection'>
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <p>
                                Add Test to Lab
                            </p>
                        </div>

                        <ToastContainer
                            position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />

                        <div className="card cardForm">
                            <div className="card-body">
                                <form className="additionForm" onSubmit={formSubmit}>
                                    <div className="row g-4">
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="nameId">Lab Name</label>
                                                <select onChange={getLoginInput} name="lab" id='nameId' required>
                                                    <option value="">Select an option</option>
                                                    {labName.map((option, keyid) => (
                                                        <option key={keyid} value={option.lab_id} >
                                                            {option.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="nameId">Uploads</label>
                                                <select onChange={getUploadingFunc} name="lab" id='nameId' required>
                                                    <option defaultChecked value="singleUpload">single Upload</option>
                                                    <option value="multiUpload">Bulk Upload</option>
                                                </select>
                                            </div>
                                        </div>
                                        {!isBulk ?
                                            <>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="testId">Test Name</label>
                                                        <select onChange={getLoginInput} name="test" id='testId' required>
                                                            <option value="">Select an option</option>
                                                            {allTest.map((option, keyid) => (
                                                                <option key={keyid} value={option.id} >
                                                                    {option.name}
                                                                </option>
                                                            ))}
                                                        </select>

                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="amountId">Amount</label>
                                                        <input type="number" id='amountId' name='amount' placeholder='Enter Amount...' required onChange={getLoginInput} />
                                                    </div>
                                                </div>
                                            </>

                                            :
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <input className='form-control' type="file" name='csvFile' onChange={(e)=>setCsvFile(e.target.files[0])} />
                                                </div>
                                            </div>
                                        }

                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                            <div className="fields">
                                                <button type='Submit' >Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
