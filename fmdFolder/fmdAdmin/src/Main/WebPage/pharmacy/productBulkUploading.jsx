import React, { useState } from 'react'
import { Loader } from '../../Component/loader'
import pharmacyPicLogo from '../../../assets/images/Pharmacy.svg'
import { toast, ToastContainer } from "react-toastify";


const ProductUploadBulk = () => {
    const [isLoading, setIsLoading] = useState(false)
    const getLoginInput = () => {

    }
    const submitForm = () => {
        setIsLoading(true);
    }
    return (
        <React.Fragment>
            <section className='mainSection'>
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
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <img src={pharmacyPicLogo} alt="" />
                            <p>
                                Upload Product
                            </p>
                        </div>
                        <div className="card cardForm">
                            {
                                isLoading ?
                                    <Loader />
                                    :
                                    <div className="card-body">

                                        <form className="additionForm" onSubmit={submitForm}>
                                            <div className="row g-4">
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label >Upload Product CSV</label>
                                                        <input type="file" accept=".csv" className='form-control' name='' onChange={getLoginInput} required />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                    <div className="fields">
                                                        <button type='Submit'>Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default ProductUploadBulk